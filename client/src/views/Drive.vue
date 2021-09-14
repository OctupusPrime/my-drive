<template>
  <v-container>
    <v-row>
      <TheDriveLeftCol 
        :isLoaded="isLoaded"
        @openCreateFolder="openCreateFolder"
        @openUploadFiles="openUploadFiles"
      ></TheDriveLeftCol>
      <v-col>
        <v-card 
          rounded="2" 
          color="white" 
          class="pa-0 d-flex flex-column align-stretch"
          style="height: 70vh; overflow: auto;" 
          :loading="!isLoaded">

        <template slot="progress">
          <v-progress-linear
            color="primary"
            height="10"
            indeterminate>
          </v-progress-linear>
        </template>
              
          <FolderPath :pathArr="getFolderPath" v-if="isLoaded"></FolderPath>

          <router-view 
            :isShiftPressed="isShift"
            :isLoaded="isLoaded">
          </router-view>

        <FolderNameInpt :title="NameInptConfig.title" 
                        :callback="NameInptConfig.callback" 
                        @addFolder="addFolder"
                        ref="FolderNameInpt" /> 
        </v-card>
      </v-col>
    </v-row>
    <input  type="file" 
            ref="fileInpt"
            accept="text/*, image/png, image/gif, image/jpeg"
            style="display: none;"
            @change="convertToBase64($event)">
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TheDriveLeftCol from '../components/TheDriveLeftCol.vue'
import FolderPath from '../components/FolderPath.vue'
import FolderNameInpt from '../components/FolderNameInpt.vue'

  export default {
    name: 'Drive',
    components: {
      TheDriveLeftCol,
      FolderPath,
      FolderNameInpt
    },
    data: () => ({
      NameInptConfig: {
        title: 'New folder',
        callback: 'addFolder'
      },
      isShift: false
    }),
    computed: {
      ...mapState(['currentBranch', 'isLoaded']),
      getFolderPath() {
        if (this.currentBranch.path)
          return this.currentBranch.path.slice(1)
        return []
      }
    },
    methods: {
      ...mapActions([
        'storeGetDrive',
        'storeAddFolder', 
        'storeAddFile', 
        'storeDeleteSelectFile',
        'storeSetClipBoard', 
        'storeInsertClipBoard'
      ]),
      openCreateFolder() {
        this.$refs.FolderNameInpt.open()
      },
      openUploadFiles() {
        this.$refs.fileInpt.click()
      },
      addFolder(name) {
        this.storeAddFolder(name)
      },
      convertToBase64() {
        const reader = new FileReader(),
            [file] = event.target.files

        reader.readAsDataURL(file)

        reader.addEventListener('load', () => {
            this.storeAddFile({ 
                name: file.name, 
                type: file.type, 
                data: reader.result.split(',')[1] 
            })
        })
      }
    },
    created() {
      this.storeGetDrive()
    },
    mounted() {
      let isCtrl = false
      window.addEventListener('keydown', (e) => {
        this.isShift = e.shiftKey
        isCtrl = e.ctrlKey
        if (e.key === 'Delete') {
          this.storeDeleteSelectFile()
        }
        if (isCtrl) {
          switch(e.key) {
            case 'c':
              this.storeSetClipBoard()
              break;
            case 'v': 
                this.storeInsertClipBoard()
              break;
            case 'x':
              this.storeSetClipBoard(true)
              break
          }
        }
      })

      window.addEventListener('keyup', (e) => {
        this.isShift = e.shiftKey
        isCtrl = e.ctrlKey
      })
    }
  }
</script>

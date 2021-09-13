<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
          <v-card rounded="2">
            <v-list
              dense
              rounded>
              <v-list-item
                link
                @click="openCreateFolder">
                <v-list-item-content>
                  <v-list-item-title class="text-body-1">
                    Create folder
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                link
                @click="openUploadFiles">
                <v-list-item-content>
                  <v-list-item-title class="text-body-1">
                    Upload file
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card rounded="2" class="mt-2" v-if="clipBoardFiles.children  || clipBoardFiles.data">
            <v-card-title class="pb-0 justify-center">Clip board</v-card-title>
            <v-divider class="mt-2"></v-divider>
            <v-list
              dense>
              <div v-if="clipBoardFiles.children">
                <v-card-title class="py-0 text-h6">Folders</v-card-title>
                  <v-list-item  v-for="item in clipBoardFiles.children" :key="item.id">
                    <v-list-item-content> 
                      <v-list-item-title class="text-body-1">
                          {{item.name}}
                      </v-list-item-title>          
                    </v-list-item-content>
                  </v-list-item>
              </div>
              <div v-if="clipBoardFiles.data">
                <v-card-title class="py-0 text-h6">Files</v-card-title>
                  <v-list-item  v-for="item in clipBoardFiles.data" :key="item.id">
                    <v-list-item-content> 
                      <v-list-item-title class="text-body-1">
                          {{item.name}}
                      </v-list-item-title>          
                    </v-list-item-content>
                  </v-list-item>
              </div>
            </v-list>
            <v-card-actions class="pt-0">
              <v-btn
                text
                color="red"
                block
                @click="storeClearClipBoard">
                Clear
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-col>
      <v-col>
        <v-card rounded="2" color="white" class="px-3 py-1">
          <FolderPath :pathArr="getFolderPath"></FolderPath>

          <router-view :isShiftPressed="isShift"></router-view>

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
import FolderPath from '../components/FolderPath.vue'
import FolderNameInpt from '../components/FolderNameInpt.vue'

  export default {
    name: 'Drive',
    components: {
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
      ...mapState(['currentBranch', 'clipBoardFiles']),
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
        'storeInsertClipBoard',
        'storeClearClipBoard'
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
      let isCntr = false
      window.addEventListener('keydown', (e) => {
        this.isShift = e.shiftKey
        if (e.keyCode == 17 || e.keyCode == 91) {
          isCntr = true
        } 
        if (e.keyCode === 46) {
          this.storeDeleteSelectFile()
        }
        if (isCntr) {
          switch(e.keyCode) {
            case 67:
              this.storeSetClipBoard()
              break;
            case 86: 
                this.storeInsertClipBoard()
              break;
            case 88:
              this.storeSetClipBoard(true)
              break
          }
        }
      })

      window.addEventListener('keyup', (e) => {
        this.isShift = e.shiftKey
        if (e.keyCode == 17 || e.keyCode == 91) {
          isCntr = false;
        } 
      })
    }
  }
</script>

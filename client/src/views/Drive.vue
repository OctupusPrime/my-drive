<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
          <v-card rounded="2">
            <v-list
              dense
              rounded
            >
              <v-list-item
                link
                @click="openCreateFolder">
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize text-body-1" >
                    Create folder
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                link
                @click="openUploadFiles">
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize text-body-1">
                    Upload file
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <!-- <v-card rounded="2" class="mt-2">
            <v-card-title>Clip board</v-card-title>
            <v-card-text v-if="clipBoardFiles.childen">
              {{ clipBoardFiles.childen.length }}
            </v-card-text>
          </v-card> -->
      </v-col>
      <v-col>
        <v-card rounded="2" color="white" class="px-3 py-1">
          <FolderPath :pathArr="getFolderPath"></FolderPath>

          <router-view></router-view>

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
import { mapState, mapActions    } from 'vuex'
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
      }
    }),
    computed: {
      ...mapState(['currentBranch', 'selectedFiles', 'clipBoardFiles']),
      getFolderPath() {
        if (this.currentBranch.path)
          return this.currentBranch.path.slice(1)
        return []
      }
    },
    methods: {
      ...mapActions([
        'storeAddFolder', 
        'storeSetCurrentBranch', 
        'storeAddFile', 
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
      },
    },
    mounted() {
      let isCntr = false

      window.addEventListener('keydown', (e) => {
        if (e.keyCode == 17 || e.keyCode == 91) {
          isCntr = true
        } 

        if (isCntr) {
          switch(e.keyCode) {
            case 67:
              if (this.selectedFiles) {
                this.storeSetClipBoard()
              }
              break;
            case 86: 
              if (this.clipBoardFiles) {
                this.storeInsertClipBoard()
              }
              break;
            case 88:
              this.storeSetClipBoard(true)
              break
          }
        }
      })

      window.addEventListener('keyup', (e) => {
        if (e.keyCode == 17 || e.keyCode == 91) {
          isCntr = false;
        } 
      })
    }
      // ...mapMutations({
      //   storeAddFolder: 'addFolder', 
      //   storeRemoveFolder: 'removeFolder',
      //   storeAddFile: 'addFile'}),

      // addFolder(name) {
      //   this.storeAddFolder({name, branch: this.drive})
      // },
      // reNameFolder(name) {
      //   console.log(name)
      // },
      // openNameInpt() {
      //   this.NameInptConfig.title = 'New folder'
      //   this.NameInptConfig.callback = 'addFolder'
      //   this.$refs.FolderNameInpt.open()
      // },
      // reNameInpt() {
      //   this.NameInptConfig.title = 'Rename folder'
      //   this.NameInptConfig.callback = 'reNameFolder'
      //   this.$refs.FolderNameInpt.open()
      // },
      // show(e) {

      // }
  }
</script>

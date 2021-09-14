<template>
    <v-container class="flex-grow-1 flex-shrink-0 pa-0"
        @click="undoSelect($event)">
        <div v-if="isLoaded && folder">
            <FolderItemsList 
                :itemsArr="folder.children" 
                @clickCallback="selectFolder"
                @dbClickCallback="openFolder"
                v-if="folder.children.length">
                Folders
            </FolderItemsList>

            <FolderItemsList 
                :itemsArr="folder.data"
                icon="mdi-file"
                @clickCallback="selectFile"
                @dbClickCallback="openFile"
                v-if="folder.data.length">
                Files
            </FolderItemsList>
        </div>
        <FileOpened :file="currentFile" ref="openedFile"></FileOpened>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FolderItemsList from '../components/FolderItemsList.vue'
import FileOpened from '../components/FileOpened.vue'


export default {
    name: 'DriveFolder',
    components: {
        FolderItemsList,
        FileOpened
    },
    props: {
        isShiftPressed: Boolean,
        isLoaded: Boolean
    },
    data: () => ({
        currentFile: {}
    }),
    watch: {
        isLoaded() {
            if(this.isLoaded) {
                this.$nextTick(() => {
                    if(!this.folder) {
                        this.$router.push({name: 'Drive'})
                    }
                })
            }
        }
    },
    computed: {
        ...mapGetters(['getFolder']),
        folder() {
            let obj = this.getFolder(this.$route.params.id)
            this.storeSetCurrentBranch(obj)
            return obj
        }
    },
    methods: {
        ...mapActions([
            'storeSetCurrentBranch', 
            'storeSelectFile', 
            'storeClearSelectFile'
        ]),
        selectFolder(index) {
            if (this.isShiftPressed) {
                this.storeSelectFile({type: 'folderIndex', index, multiple: true})
            }
            else {
                this.storeClearSelectFile()
                this.storeSelectFile({type: 'folderIndex', index})  
            }
        },
        openFolder(item) {
            this.storeClearSelectFile()
            const { id } = item
            this.$router.push({ name: 'Folder', params: { id } })
        },
        selectFile(index) {
            if (this.isShiftPressed) {
                this.storeSelectFile({type: 'fileIndex', index, multiple: true})
            }
            else {
                this.storeClearSelectFile()
                this.storeSelectFile({type: 'fileIndex', index})  
            }            
        },
        openFile(item) {
            this.currentFile = item
            this.$refs.openedFile.open()
        },
        undoSelect(e) {
            const btn = e.target.closest('button')
            if (!btn) {
                this.storeClearSelectFile()
            }
        }
    }
}
</script>
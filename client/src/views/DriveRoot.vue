<template>
    <v-container class="flex-grow-1 flex-shrink-0 pa-0"
        @click="undoSelect($event)">
        <FolderItemsList 
            :itemsArr="drive.children" 
            @clickCallback="selectFolder"
            @dbClickCallback="openFolder"
            v-if="drive.children.length">
            Folders
        </FolderItemsList>

        <FolderItemsList 
            :itemsArr="drive.data"
            icon="mdi-file"
            @clickCallback="selectFile"
            @dbClickCallback="openFile"
            v-if="drive.data.length">
            Files
        </FolderItemsList>

        <FileOpened :file="currentFile" ref="openedFile"></FileOpened>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FolderItemsList from '../components/FolderItemsList.vue'
import FileOpened from '../components/FileOpened.vue'

export default {
    name: 'DriveRoot',
    components: {
        FolderItemsList,
        FileOpened
    },
    props: {
        isShiftPressed: Boolean
    },
    data: () => ({
        currentFile: {}
    }),
    computed: {
        ...mapState({storeDrive: 'drive'}),
        drive() {
            this.storeSetCurrentBranch(this.storeDrive._root)
            return this.storeDrive._root
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
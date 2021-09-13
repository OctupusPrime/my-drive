<template>
    <div style="min-height: 70vh"
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

        <FileOpened ref="openedFile"></FileOpened>
    </div>
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
    data: () => ({
        isShiftPressed: false,
        quickMenuItems: []
    }),
    computed: {
        ...mapState({storeDrive: 'drive', selectedFiles: 'selectedFiles'}),
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
            this.$refs.openedFile.open(item)
        },
        undoSelect(e) {
            const btn = e.target.closest('button')
            if (!btn) {
                this.storeClearSelectFile()
            }
        }
    },
    mounted() {
        window.addEventListener('keyup', (e) => {
            this.isShiftPressed = e.shiftKey
        })
        window.addEventListener('keydown', (e) => {
            this.isShiftPressed = e.shiftKey
        })
    }
}
</script>
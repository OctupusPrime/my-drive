<template>
    <div style="min-height: 70vh"
        @click="undoSelect($event)">
        <FolderItemsList 
            :itemsArr="folder.children" 
            @clickCallback="selectFolder"
            @dbClickCallback="openFolder"
            v-if="folder.children">
            Folders
        </FolderItemsList>

        <FolderItemsList 
            :itemsArr="folder.data"
            icon="mdi-file"
            @clickCallback="selectFile"
            @dbClickCallback="openFile"
            v-if="folder.data">
            Files
        </FolderItemsList>

        <FileOpened ref="openedFile"></FileOpened>
    </div>
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
    data: () => ({
        isShiftPressed: false,
        quickMenuItems: []
    }),
    computed: {
        ...mapGetters(['getFolder', 'selectedFiles']),
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
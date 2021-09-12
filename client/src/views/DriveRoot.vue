<template>
    <div @click="undoSelect($event)" style="min-height: 70vh">
        <FolderItemsList 
            :itemsArr="drive.children" 
            :isShift="isShiftPressed"
            @dbClickCallback="redirectToFile"
            v-if="drive.children.length">
            Folders
        </FolderItemsList>

        <FolderItemsList 
            :itemsArr="drive.data"
            :isShift="isShiftPressed"
            @dbClickCallback="openFile"
            v-if="drive.data.length">
            Files
        </FolderItemsList>
<!-- 
        <FileOpened ref="openedFile"></FileOpened> -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FolderItemsList from '../components/FolderItemsList.vue'
// import FileOpened from '../components/FileOpened.vue'

export default {
    name: 'DriveRoot',
    components: {
        FolderItemsList
        // FileOpened
    },
    data: () => ({
        isShiftPressed: false
    }),
    computed: {
        ...mapState({storeDrive: 'drive'}),
        drive() {
            this.storeSetCurrentBranch(this.storeDrive._root)
            return this.storeDrive._root
        }
    },
    methods: {
        ...mapActions(['storeSetCurrentBranch', 'storeClearSelectFile']),
        redirectToFile(item) {
            const { id } = item
            this.$router.push({ name: 'Folder', params: { id } })
        },
        openFile(item) {
            console.log(item)
            // this.$refs.openedFile.open(item)
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
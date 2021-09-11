<template>
    <div>
        <FolderItemsList 
            :itemsArr="drive.children" 
            @dbClickCallback="redirectToFile">
            Folders
        </FolderItemsList>

        <FolderItemsList 
            :itemsArr="drive.data"
            @dbClickCallback="openFile">
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
    computed: {
        ...mapState({storeDrive: 'drive'}),
        drive() {
            this.storeSetCurrentBranch(this.storeDrive._root)
            return this.storeDrive._root
        }
    },
    methods: {
        ...mapActions(['storeSetCurrentBranch']),
        redirectToFile(item) {
            const { id } = item
            this.$router.push({ name: 'Folder', params: { id } })
        },
        openFile(item) {
            console.log(item)
            // this.$refs.openedFile.open(item)
        }
    }
}
</script>
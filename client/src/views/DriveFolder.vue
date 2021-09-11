<template>
    <div>
        <FolderItemsList 
            :itemsArr="folder.children" 
            @dbClickCallback="redirectToFile">
            Folders
        </FolderItemsList>

        <FolderItemsList 
            :itemsArr="folder.data">
            Files
        </FolderItemsList>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FolderItemsList from '../components/FolderItemsList.vue'

export default {
    name: 'DriveFolder',
    components: {
        FolderItemsList
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
        ...mapActions(['storeSetCurrentBranch']),
        redirectToFile(item) {
            const { id } = item
            this.$router.push({ name: 'Folder', params: { id } })
        }
    }
}
</script>
<template>
    <v-col cols="auto">
        <v-card rounded="2">
        <v-list
            dense
            rounded>
            <v-list-item
            link
            :disabled="!isLoaded"
            @click="openCreateFolder">
            <v-list-item-content>
                <v-list-item-title class="text-body-1">
                Create folder
                </v-list-item-title>
            </v-list-item-content>
            </v-list-item>
            <v-list-item
            link
            :disabled="!isLoaded"
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
        <v-card-title class="pb-2 justify-center">Clip board</v-card-title>
        <v-divider class="pt-2"></v-divider>
        <v-list
            class="pa-0"
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
        </v-card>
    </v-col>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'TheDriveLeftCol',
    props: {
        isLoaded: Boolean
    },
    computed: {
      ...mapState(['clipBoardFiles']),
    },
    methods: {
        openCreateFolder() {
            this.$emit('openCreateFolder')
        },
        openUploadFiles() {
            this.$emit('openUploadFiles')
        }
    }
}
</script>
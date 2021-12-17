<template>
    <v-container class="flex-grow-1 flex-shrink-0 pa-0"
        @click="undoSelect($event)">

        <v-dialog
            v-model="getShowTips"
            max-width="70vh">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                App tips
                </v-card-title>
                <v-card-text class="pa-3 text--primary text-body-1">
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Delete - <kbd>del</kbd></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Copy - <kbd>ctrl</kbd> + <kbd>C</kbd></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Paste - <kbd>ctrl</kbd> + <kbd>S</kbd></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Cut - <kbd>ctrl</kbd> + <kbd>X</kbd></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-text class="text-body-1">
                        You can copy multiple object just hold <kbd>shift</kbd> when <b>(copy paste cut)</b> files.
                    </v-card-text>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        color="primary"
                        text
                        @click="storeHideTips()">
                        Got it
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="storeDontShowTips()">
                        Dont show
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
import { mapState, mapActions, mapGetters } from 'vuex'
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
        ...mapState({storeDrive: 'drive', showTips: 'isShowTips'}),
        ...mapGetters(['getShowTips']),
        drive() {
            this.storeSetCurrentBranch(this.storeDrive._root)
            return this.storeDrive._root
        }
    },
    methods: {
        ...mapActions([
            'storeSetCurrentBranch', 
            'storeSelectFile', 
            'storeClearSelectFile',
            'storeDontShowTips',
            'storeHideTips'
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
    },
    mounted() {
        console.log(this.getShowTips)
    }
}
</script>
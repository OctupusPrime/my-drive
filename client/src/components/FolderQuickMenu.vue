<template>
    <v-menu
        v-model="isOpen"
        :position-x="x"
        :position-y="y"
        absolute
        offset-y
        origin="top center"
        transition="scale-transition">
        <v-list>
            <v-list-item>
                <v-list-item-title>
                    <v-btn  plain
                            depressed
                            class="pa-1">
                        <v-icon left>mdi-folder</v-icon>
                        Create folder
                    </v-btn>
                </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
                <v-list-item-title>
                    <v-btn  plain
                            depressed
                            class="pa-1"
                            @click="openUploadFiles">
                        <v-icon left>mdi-folder</v-icon>
                        Upload files
                    </v-btn>
                </v-list-item-title>
            </v-list-item>
        </v-list>
        <input  type="file" 
                class="quick-menu-input--file" 
                ref="fileInpt"
                accept="text/*, image/png, image/gif, image/jpeg"
                @change="saveFiles($event)">
    </v-menu>
</template>

<script>
export default {
    name: 'FolderQuickMenu',
    data: () => ({
        isOpen: false,
        x: 0,
        y: 0
    }),
    methods: {
        open(x, y) {
            this.x = x
            this.y = y

            this.isOpen = true
        },

        openUploadFiles() {
            this.$refs.fileInpt.click()
        },

        saveFiles(event) {
            const reader = new FileReader(),
                [file] = event.target.files

            reader.readAsDataURL(file)

            reader.addEventListener('load', () => {
                this.$emit('addFile', { 
                    name: file.name, 
                    type: file.type, 
                    data: reader.result.split(',')[1] 
                })
            })
        }
    }
}
</script>

<style scoped>
    .quick-menu-input--file {
        display: none;
    }
</style>
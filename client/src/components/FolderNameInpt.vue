<template>
    <v-dialog
        v-model="isOpen"
        persistent
        max-width="450">
        <v-card>
            <v-card-title class="text-h5">
                {{title}}
                <v-spacer></v-spacer>
                <v-btn  text
                        icon
                        @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="py-3">
                <v-text-field
                    label="Name"
                    solo
                    dense
                    hide-details="auto"
                    v-model="inpVal">
                </v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="close">
                    Cancel
                </v-btn>
                <v-btn
                    color="primary"
                    @click="submit">
                    Create
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'FolderNameInpt',
    props: {
        title: {
            type: String,
            required: true
        },
        callback: {
            type: String,
            required: true
        }
    },
    data: () => ({
        isOpen: false,
        inpVal: ''
    }),
    methods: {
        open() {
            this.isOpen = true
        },
        close() {
            this.isOpen = false
            this.inpVal = ''
        },
        submit() {
            this.$emit(this.callback, this.inpVal)
            this.close()
        }
    }
}
</script>
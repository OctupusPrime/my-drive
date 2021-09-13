<template>
    <v-dialog
        v-model="isOpen"
        max-width="70vh">
        <v-card>
            <v-card-text v-if="convertFromBase64" class="pa-3 text--primary text-body-1">
                {{convertFromBase64}}
            </v-card-text>
            <v-img v-else
                :src="`data:${file.type};base64,${file.data}`">
            </v-img>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'FileOpened',
    data: () => ({
        isOpen: false
    }),
    props: {
        file: Object
    },
    computed: {
        convertFromBase64() {
            if (this.file.type) {
                if (this.file.type.includes('text')) {
                    const percentEncodedStr = atob(this.file.data).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join('');


                    return decodeURIComponent(percentEncodedStr)
                }
            }
            return ''
        }
    },
    methods: {
        open() {
            this.isOpen = true
        },
        close() {
            this.isOpen = false
        }
    }
}
</script>
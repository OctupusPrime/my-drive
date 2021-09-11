<template>
    <v-dialog
        v-model="isOpen"
        max-width="450">
        <v-card>
        <p v-if="convertFromBase64">
            {{convertFromBase64}}
        </p>
        <v-img v-else
            height="250"
            :src="`data:${file.type};base64,${file.data}`">
        </v-img>

        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'FileOpened',
    data: () => ({
        isOpen: false,
        file: {}
    }),
    computed: {
        convertFromBase64() {
            if (this.file.type.includes('text')) {
                const percentEncodedStr = atob(this.file.data).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join('');


                return decodeURIComponent(percentEncodedStr)
            }
            return ''
        }
    },
    methods: {
        open(obj) {
            this.file = obj 
            this.isOpen = true
        },
        close() {
            this.isOpen = false
        }
    }
}
</script>
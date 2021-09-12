<template>
    <v-container class="px-0">
        <h3 class="ml-2">
            <slot></slot>
        </h3>
        <v-row  class="my-2">
            <v-btn  v-for="(item, index) in itemsArr" 
                :key="item.id"
                depressed
                outlined
                large
                class="text-capitalize ma-2 text-h6"
                :color="item.isSelected ? 'primary' : ''"
                :disabled="item.isCut ? true : false"
                @click="selectItem(index)"
                @dblclick="openItem(item)">
                <v-icon left>mdi-folder</v-icon>
                {{item.name}}
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'FolderItemsList',
    props: {
        itemsArr: {
            type: Array,
            required: true
        },
        isShift: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ...mapActions(['storeSelectFile', 'storeClearSelectFile']),
        selectItem(index) {

            if (this.isShift) {
                this.storeSelectFile({type: 'folderIndex', index, multiple: true})
            }
            else {
                this.storeSelectFile({type: 'folderIndex', index})  
            }
        },
        openItem(item) {
            this.storeClearSelectFile()
            this.$emit('dbClickCallback', item)
        }
    }
}
</script>
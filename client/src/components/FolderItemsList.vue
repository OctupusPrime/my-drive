<template>
    <v-container class="px-0">
        <h3 class="ml-2">
            <slot></slot>
        </h3>
        <v-row  class="my-2">
            <v-btn  v-for="item in itemsArr" 
                    :key="item.id"
                    depressed
                    outlined
                    large
                    class="text-capitalize ma-2 text-h6"
                    :color="item.isSelected ? 'primary' : ''"
                    :disabled="item.isCut ? true : false"
                    @click="selectItem(item)"
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
        }
    },
    methods: {
        ...mapActions(['storeSelectFile']),
        selectItem(item) {
            this.storeSelectFile(item)
        },
        openItem(item) {
            this.$emit('dbClickCallback', item)
        }
    }
}
</script>
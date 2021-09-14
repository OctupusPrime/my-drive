<template>
    <v-container class="px-0">
        <h3 class="ml-5">
            <slot></slot>
        </h3>
        <v-row  class="ma-1">
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
                <v-icon left>{{icon}}</v-icon>
                {{item.name}}
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'FolderItemsList',
    props: {
        itemsArr: {
            type: Array,
            required: true
        },
        icon: {
            type: String,
            default: 'mdi-folder'
        }
    },
    methods: {
        selectItem(index) {
            this.$emit('clickCallback', index)
        },
        openItem(item) {
            this.$emit('dbClickCallback', item)
        }
    }
}
</script>
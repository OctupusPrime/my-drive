<template>
    <v-container class="px-0">
        <v-btn
            plain
            :to="{ name: 'Drive' }">
            My drive
        </v-btn>
        <v-btn v-for="btn in pathArr" :key="btn.id"
            plain
            :to="{ 
                name: 'Folder', 
                params: {id: btn.id}
            }">
            {{btn.name}}
        </v-btn>
        <v-divider class="mt-1"></v-divider>
    </v-container>
</template>

<script>
export default {
    name: 'FolderPath',
    props: {
        pathArr: {
            required: true
        }
    }
}
</script>
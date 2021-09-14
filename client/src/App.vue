<template>
<v-app>
  <v-app-bar 
    app 
    flat
    color="white">
    <v-container>
      <v-toolbar-title class="font-weight-bold text-h5">
        My Drive
      </v-toolbar-title>  
    </v-container>
  </v-app-bar>

  <v-main class="grey">
    <router-view></router-view>
  </v-main>
</v-app>
</template>

<script>

export default {
  name: 'App'
};
</script>
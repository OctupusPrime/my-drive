<template>
<v-app>
  <v-app-bar 
    app 
    flat>
    <!-- -->
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
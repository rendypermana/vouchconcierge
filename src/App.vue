<template>
  <v-app id="app">
    <Header />
    <div class="Content">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/common.scss';
</style>

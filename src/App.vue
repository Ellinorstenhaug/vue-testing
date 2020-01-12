<template>
  <div id="app" class="container">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
  import NavBar from './components/layout/NavBar';

  import {
    mapMutations
  } from 'vuex';

  export default {
    components: {
      NavBar,
    },
    beforeMount() {
      this.MERGE_BLOGPOSTS()
    },
    methods: {
      ...mapMutations(['MERGE_BLOGPOSTS'])
    }
  };
</script>
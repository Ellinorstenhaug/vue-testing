<template>
  <div id="app" class="container">
    <NavBar />
    <!-- <User/> -->
    <router-view />
  </div>
</template>

<script>
  import NavBar from './components/layout/NavBar';
  // import User from './components/layout/User';

  import {
    mapMutations
  } from 'vuex';

  export default {
    components: {
      NavBar,
      // User
    },
    beforeMount() {
      this.MERGE_BLOGPOSTS()
    },
    methods: {
      ...mapMutations(['MERGE_BLOGPOSTS'])
    }
  };
</script>
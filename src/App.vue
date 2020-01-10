<template>
  <div id="app" class="container">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
  import NavBar from './components/partials/NavBar';

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
      ...mapMutations('BlogPostHandler', ['MERGE_BLOGPOSTS'])
    }
  };
</script>
<template>
  <div class="home">
    <h1>Hi there</h1>
    <BlogPosts/>
  </div>
</template>

<script>
import BlogPosts from '../components/partials/BlogPosts'
export default {
  name: 'home',
  components:{
    BlogPosts,
  }
}
</script>

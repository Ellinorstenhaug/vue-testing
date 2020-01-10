<template>
    <div>
        <div class="blogpost--wrapper">
            <BlogPostPreview :post="blogPost" v-for="(blogPost,i) in blogPosts" :key="i" />
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';

    import BlogPostPreview from './BlogPostPreview';

    export default {
        components: {
            BlogPostPreview
        },
       
        computed: {
            ...mapState('BlogPostHandler', ['blogPosts']),
        },
     
    }
</script>
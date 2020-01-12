<template>
    <div class="blogpost--wrapper">
        <BlogPostCard :post="blogPost" v-for="(blogPost,i) in blogPosts" :key="i" />
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';

    import BlogPostCard from '../layout/Card';

    export default {
        components: {
            BlogPostCard
        },

        computed: {
            ...mapState(['blogPosts']),
        },
    }
</script>
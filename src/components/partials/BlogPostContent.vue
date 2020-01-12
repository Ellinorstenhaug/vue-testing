<template>
    <div class="blogpost--content" v-if="currentPost.title">
        <h1>{{currentPost.title}}</h1>
        <p>{{currentPost.excerpt}}</p>
        <img class="blogpost--img" :src="currentPost.img ? currentPost.img : ''" alt="">
        <p v-html="currentPost.content"></p>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    export default {
        computed: {
            ...mapState(['currentPost'])
        }
    }
</script>
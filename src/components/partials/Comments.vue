<template>
    <div class="my-6" v-if="currentPost.comments">
        <h4 class="headline my-2">Comments ({{currentPost.comments.length}})</h4>
        <div class="comment" v-for="(comment, i) in currentPost.comments" :key="i">
            <h5 class="my-1 title thin">{{comment.name}} comments:
            </h5>
            <p class="caption my-0">{{comment.date}}</p>
            <p class="my-1">{{comment.content}}</p>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';
    
    export default {
        computed: {
            ...mapState('BlogPostHandler', ['currentPost'])
        }
    }
</script>
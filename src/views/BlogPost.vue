<template>
    <div class="blogpost">
        <BlogPostContent />
        <Comments />
        <CreateComment />
    </div>
</template>

<script>
    import Comments from '../components/partials/Comments'
    import CreateComment from '../components/partials/CreateComment';
    import BlogPostContent from '../components/partials/BlogPostContent';
import { mapMutations, mapState } from 'vuex';

    export default {
        components: {
            CreateComment,
            BlogPostContent,
            Comments
        },
        beforeMount() {
            this.SET_CURRENT_POST(this.$route.params.title);
        },
        computed: {
            ...mapState('BlogPostHandler', ['currentPost'])
        },
        data: () => ({
            post: ''
        }),
        methods: {
            ...mapMutations('BlogPostHandler', ['SET_CURRENT_POST'])
        }
    }
</script>
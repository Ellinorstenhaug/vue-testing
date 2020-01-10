<template>
    <div>
        <CreateBlogPostForm />
        <ShowLatestBlogPost />
    </div>
</template>

<script>
    import CreateBlogPostForm from '../components/partials/CreateBlogPostForm';
    import ShowLatestBlogPost from '../components/partials/ShowLatestBlogPost';

    export default {
        components: {
            CreateBlogPostForm,
            ShowLatestBlogPost
        }
    }
</script>
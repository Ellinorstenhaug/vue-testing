<template>
    <div class="card" v-if="post">
        <router-link :to="'blog/' + post.url">
            <img class="card--img" v-if="post.img" :src="post.img" alt="">
            <div class="card--content">
                <h3 class="thin mb-1 mt-0">
                    {{post.title}}
                </h3>
                <p class="caption my-0">{{post.excerpt}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        props: {
            post: {
                type: Object,
                required: true,
            }
        }
    }
</script>
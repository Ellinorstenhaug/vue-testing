<template>
    <router-link :to="'blog/' + post.url">
        <div class="card">
            <img class="card--img" :src="post.img ? post.img : ''" alt="">
            <div class="card--content">
                <h3 class="thin mb-1 mt-0">
                    {{post.title}}
                </h3>
                <p class="caption my-0">{{post.excerpt}}</p>
            </div>

        </div>
    </router-link>
</template>

<script>
    export default {
        props:{
            post:{
                type:Object,
                required:true,
            }
        }
    }
</script>
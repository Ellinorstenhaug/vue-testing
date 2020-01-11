<template>
  <div class="create">
    <h2>Let's create something new!</h2>

    <form @submit.prevent="validate">
      <div class="py-2">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="post.title">
        <span class="title-warning" v-if="titleIsInvalid">You have to enter a title!</span>
      </div>

      <div class="py-2">
        <label for="excerpt">Excerpt</label>
        <input type="text" id="excerpt" v-model="post.excerpt">
      </div>

      <div class="py-2">
        <label for="image">Image (just full path)</label>
        <input type="text" id="image" v-model="post.img">
        <span class="image-warning" v-if="imgIsInvalid">Not a valid image</span>

      </div>

      <div class="py-2">
        <label for="content">Content</label>
        <textarea id="content" v-model="post.content"></textarea>
        <span class="content-warning" v-if="contentIsInvalid">You have to write some content!</span>
        <br><span>You can use raw html! :) </span>
      </div>
      <button class="my-2" type="submit">Save blogpost</button>
    </form>
    <p class="submitted" v-if="submitted">Your post has been submitted!</p>

  </div>
</template>

<script>
  import {
    mapMutations,
    mapActions,
    mapState
  } from 'vuex';
  export default {
    data: () => ({
      post: {
        id: null,
        title: "",
        content: "",
        excerpt: "",
        comments: [],
        img: "",
        url: ""
      },
      titleIsInvalid: false,
      contentIsInvalid: false,
      imgIsInvalid: false,
      submitted: false,
      showError: false
    }),
    computed: {
      ...mapState('BlogPostHandler', ['blogPosts'])
    },
    methods: {
      ...mapActions('BlogPostHandler', ['AddPostToLocalStorage']),
      ...mapMutations('BlogPostHandler', ['ADD_POST']),
      validate() {
        //Make regex for image (contains http...)        
        if (this.post.title.length == 0) {
          this.titleIsInvalid = true;
        } else {
          this.titleIsInvalid = false;
        }

        if (this.post.content.length === 0) {
          this.contentIsInvalid = true;
        } else {
          this.contentIsInvalid = false;
        }

        if (this.post.img.length === 0) {
          this.imgIsInvalid = true;
        } else {
          this.imgIsInvalid = false;
        }

        if (this.post.content.length > 0 && this.post.content.length > 0 && this.post.img.length > 0) {
          this.showError = false;
          this.submitted = true;

          this.saveBlogPost()
        } else {
          this.showError = true;
        }
      },

      saveBlogPost() {
        this.post.url = this.generateUrl(this.post.title);
        this.setPostId()
        this.AddPostToLocalStorage(this.post);
        this.resetFields()
      },
      setPostId() {
        this.post.id = this.blogPosts[this.blogPosts.length - 1].id + 1;
      },

      generateUrl(text) {
        return text
          .toLowerCase()
          .replace(/[^\w ]+/g, '')
          .replace(/ +/g, '-');
      },
      resetFields() {
        this.post = {
          id: null,
          title: "",
          content: "",
          comments: [],
          excerpt: "",
          img: "",
          url: ""

        }
      }
    }
  }
</script>
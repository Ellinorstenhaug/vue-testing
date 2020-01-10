<template>
  <div class="create--comment">
    <h2>Write a comment!</h2>

    <form @submit.prevent="validate">
      <div class="py-2">
        <label for="name">Your name</label>
        <input type="text" id="name" v-model="comment.name">
        <span class="warning" v-if="nameIsInvalid">You have to enter a name!</span>
      </div>

      <div class="py-2">
        <label for="content">Content</label>
        <textarea id="content" v-model="comment.content"></textarea>
        <span class="warning" v-if="contentIsInvalid">You have to write something in your comment!</span>
      </div>
      <button class="my-2" type="submit">Send comment!</button>
    </form>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';

  export default {
    data: () => ({
      comment: {
        name: "",
        content: "",
        postId: '',
        date: new Date().toUTCString()
      },
      nameIsInvalid: false,
      contentIsInvalid: false,
    }),
    computed: {
      ...mapState('BlogPostHandler', ['currentPost', 'blogPosts'])
    },
    methods: {
      ...mapMutations('BlogPostHandler', ['SET_COMMENT']),
      validate() {
        if (this.comment.name.length == 0) {
          this.nameIsInvalid = true;
        } else {
          this.nameIsInvalid = false;
        }

        if (this.comment.content.length === 0) {
          this.contentIsInvalid = true;
        } else {
          this.contentIsInvalid = false;
        }

        if (this.comment.content.length > 0 && this.comment.content.length > 0) {
          this.saveComment()
        }
      },

      saveComment() {

        this.comment.postId = this.currentPost.id;
        this.SET_COMMENT(this.comment)
        this.resetFields();
      },


      resetFields() {
        this.comment = {
          name: "",
          content: "",
        }
      }
    }
  }
</script>
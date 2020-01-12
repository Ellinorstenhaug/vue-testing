<template>
  <div class="create--comment">
    <h2>Write a comment!</h2>

    <form @submit.prevent="validate">
      <div class="py-2">
        <label for="name">Your name</label>
        <input type="text" id="name" v-model="comment.name">
        <span class="warning name-is-invalid" v-if="nameIsInvalid">You have to enter a name!</span>
      </div>

      <div class="py-2">
        <label for="content">Content</label>
        <textarea id="content" v-model="comment.content"></textarea>
        <span class="warning content-is-invalid" v-if="contentIsInvalid">You have to write something in your
          comment!</span>
      </div>
      <button class="my-2" type="submit">Send comment!</button>
    </form>
    <p class="valid" v-if="submitted">Your comment has been posted</p>
    <p class="notvalid" v-if="notValid">Please fill in all fields</p>
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
      submitted: false,
      notValid: false, 
    }),
    computed: {
      ...mapState(['currentPost', 'blogPosts'])
    },
    methods: {
      ...mapMutations(['SET_COMMENT']),
      validate() {

        //refaktorisera 
        let nameInputIsValid = this.validateInput(this.comment.name);

        let contentInputIsValid = this.validateInput(this.comment.content);
      
        if (nameInputIsValid && contentInputIsValid) {
          this.notValid = false;
          this.saveComment()
        } 
        else {
          this.notValid = true;
        }
      },
     
      validateInput(field) {
        if (field.length == 0) {
          return false
        } else {
          return true
        }
      },

      saveComment() {
        this.comment.postId = this.currentPost.id;
        this.submitted = true;
        this.SET_COMMENT(this.comment);
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
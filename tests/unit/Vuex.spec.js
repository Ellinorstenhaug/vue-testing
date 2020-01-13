// todo testa LS
// todo testa pusha till state blogPosts från mutation ADD_BLOG_POST
// todo kolla om statet ändras  med MERGE_BLOGPOSTS
// todo testa SET_CURRENT_POST, hittar den en från arrayen och pushar till den? 
// todo: VUEX - läggs det till i LS?
// todo: VUEX - läggs det till i LS?

import {
  mutations
} from '@/store/index.js';

//testa LS
test('"SET_COMMENT" mutates "state.blogposts"', () => {
  const state = {
    blogPosts: [{
      id: 1,
      comments: []
    }]
  }

  const key = 'posts';
  const comment = {
    postId: 1
  }

  mutations.SET_COMMENT(state, comment)
  expect(state.blogPosts[0].comments).toEqual([{
    postId: 1
  }])
})


test('"ADD_BLOGPOST" adds "post" to first position of blogPosts array', () => {
  const state = {
    blogPosts: [{
      id: 1,
    }]
  }
  const post = {
    id: 2
  }

  mutations.ADD_BLOGPOST(state, post)
  expect(state.blogPosts[0].id).toBe(2)
  expect(state.blogPosts[1].id).toBe(1)
})



test('"SET_CURRENT_POST" finds current post and mutates "state.currentPost"', () => {
  const state = {
    blogPosts: [
      {
      url: "test",
      id: 1
    },
      {
      url: "testing",
      id: 2
    }
  ],
    currentPost: {}
  }

  const url = "test"
  mutations.SET_CURRENT_POST(state, url)
  expect(state.currentPost.id).toBe(1)
})
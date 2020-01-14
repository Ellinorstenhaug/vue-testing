import {
  mutations,
  actions
} from '@/store/index.js';


test('"SET_COMMENT" mutates "state.blogposts"', () => {
  const state = {
    blogPosts: [{
      id: 1,
      comments: []
    }]
  }

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

test('"SET_USER" adds user to state', () => {
  const state = {
    user: null
  }
  const user = {
    name: "Test"
  }
  mutations.SET_USER(state, user)
  expect(state.user.name).toBe("Test")
})

test('"SET_CURRENT_POST" finds current post and mutates "state.currentPost"', () => {
  const state = {
    blogPosts: [{
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


test('Merge', () => {
  const state = {
    blogPosts: [{
        id: 1
      },
      {
        id: 2
      }
    ]
  }

  localStorage.clear()
  const Post = [{id:3}]
  mutations.MERGE_BLOGPOSTS(state, Post)
  expect(state.blogPosts[0].id).toBe(3)
  expect(state.blogPosts[1].id).toBe(1)
  expect(state.blogPosts[2].id).toBe(2)
  expect(state.blogPosts.length).toBe(3)
})
import Vuex from 'vuex';
import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';

import BlogPostContent from '@/components/partials/BlogPostContent.vue';

const localVue = createLocalVue()
localVue.use(Vuex);

const state = {
  currentPost: {
    id: 1,
    title: "title",
    url: "title",
    excerpt: "excerpt",
    comments: [],
    content: "content",
    img: "image"
  }
};

const store = new Vuex.Store({
  state
})

describe('BlogPostContent', () => {
  test('is a vue instance', () => {
    const wrapper = shallowMount(BlogPostContent, {
     store,localVue
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders if it has correct state from vuex', () => {
    const wrapper = shallowMount(BlogPostContent, {
      store,
      localVue
    })

    expect(state.currentPost.title).toBe('title');
    expect(wrapper.find('.blogpost--content').exists()).toBe(true)
  })


  it('does not render if it has incorrect state', () => {
    const wrapper = shallowMount(BlogPostContent, {
      computed: {
        currentPost() {
          return {}
        }
      }
    })

    expect(wrapper.find('.blogpost--content').exists()).toBe(false)
  })

  it('renders image if current post has an image', () => {
    const wrapper = shallowMount(BlogPostContent, {
      store,
      localVue
    })

    expect(state.currentPost.img).toBe('image');
    expect(wrapper.find('img.blogpost--img').exists()).toBe(true)
  })

})
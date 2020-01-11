import {
  mount,
  shallowMount
} from '@vue/test-utils'

import BlogPostContent from '@/components/partials/BlogPostContent.vue';

// todo renderas om currentPost finns


describe('BlogPostContent', () => {
  test('is a vue instance', () => {
    const wrapper = shallowMount(BlogPostContent, {
      computed: {
        currentPost() {
          return {
            comments: [{
              name: ""
            }]
          }
        }
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
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
  it('renders if it has correct state', () => {
    const wrapper = shallowMount(BlogPostContent, {
      computed: {
        currentPost() {
          return {
            title: "title"
          }
        }
      }
    })

    expect(wrapper.find('.blogpost--content').exists()).toBe(true)
  })
})


describe('BlogPostContent.vue', () => {
  // test('does not render when it does not have a post', () => {
  //   const wrapper = mount(BlogPostContent);
  //   expect(wrapper.isEmpty()).toBe(true)
  // })
})
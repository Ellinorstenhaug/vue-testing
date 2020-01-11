//* rendera alla blogposts
// todo om har state blogPosts 
// todo Om en till läggs till => öka?

import {
    mount,
    shallowMount
} from '@vue/test-utils'
import BlogPosts from '@/components/partials/BlogPosts'

describe('BlogPosts', () => {
    const mocks = {
        blogPosts: [{
                name: "first",
                id: 1
            },
            {
                name: "first",
                id: 1
            }
        ]
    }

    test('is a vue instance', () => {
        const wrapper = shallowMount(BlogPosts, {
            computed: {
                blogPosts() {
                    return mocks.blogPosts
                }
            }
        })
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('renders all blogposts', () => {
        const wrapper = mount(BlogPosts, {
            computed: {
                blogPosts() {
                    return mocks.blogPosts;
                }
            },
            stubs: ['router-link']
        })
        expect(wrapper.findAll('.card').length).toBe(2)
    })
})
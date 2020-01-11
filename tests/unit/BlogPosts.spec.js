// todo om har state blogPosts 
// todo Om en till läggs till => öka?

import {
    mount, shallowMount
} from '@vue/test-utils'
import BlogPosts from '@/components/partials/BlogPosts'

describe('BlogPosts', () => {
    test('is a vue instance', () => {
        const wrapper = shallowMount(BlogPosts, {
            computed: {
                blogPosts(){
                    return []
                }
            }
        })
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
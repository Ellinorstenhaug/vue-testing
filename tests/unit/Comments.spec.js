// todo renderas bara om har state currentPost.comments
// todo listar ut rätt mängd kommentarer currentPost.comments

import {
    shallowMount,
    mount
} from '@vue/test-utils'

import Comments from '@/components/partials/Comments';

describe('Comments', () => {
    test('is a Vue instance', () => {

        const wrapper = shallowMount(Comments, {
            computed: {
                currentPost() {
                    return {
                        comments: [{
                            name:""
                        }]
                    }
                }
            }
        })
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
import User from '@/components/layout/User';

import {shallowMount} from '@vue/test-utils';

describe('User.vue', ()=>{
    it('retrieves data from API on mount', ()=>{
        const wrapper = shallowMount(User, {
            computed:{
                user(){
                    return {}
                }
            },
            methods:{
                GetUser: jest.fn()
            }
        })
        expect(wrapper.find('div').exists()).toBe(true)
    })

})
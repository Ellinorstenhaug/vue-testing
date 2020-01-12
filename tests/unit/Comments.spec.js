import Vuex from 'vuex';
import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils'

import Comments from '@/components/partials/Comments';

const localVue = createLocalVue()
localVue.use(Vuex);

const state = {
    currentPost: {
            comments: [{
                name: "test"
            }]
        },
        
};

const store = new Vuex.Store({
    state
})


describe('Comments', () => {
    test('is a Vue instance', () => {

        const wrapper = shallowMount(Comments, {
            store,
            localVue
        })
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('renders if Comments.vue has correct state', ()=>{
        const wrapper = shallowMount(Comments, {
            store,localVue
        })

        expect(wrapper.find('.comments').exists()).toBe(true);
    })

    it('does not render if Comments.vue has incorrect state', ()=>{
        const wrapper = shallowMount(Comments, {
            computed:{
                currentPost(){
                    return {}
                }
            }
        })
        expect(wrapper.find('.comments').exists()).toBe(false);
    })
    it('renders correct amount of comments', ()=>{
        const wrapper = shallowMount(Comments, {
           store, localVue
        })
        expect(wrapper.findAll('.comment').length).toBe(1);
    })
})
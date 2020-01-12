import Vuex from 'vuex';
import {
    mount,
    shallowMount,
    createLocalVue
} from '@vue/test-utils'
import BlogPosts from '@/components/partials/BlogPosts';


const localVue = createLocalVue()
localVue.use(Vuex);

const state = {
    blogPosts: [{
            name: "first",
            id: 1
        },
        {
            name: "first",
            id: 1
        }
    ]
};

const store = new Vuex.Store({
    state
})


describe('BlogPosts', () => {
    test('is a vue instance', () => {
        const wrapper = shallowMount(BlogPosts, {
            store,
            localVue
        })
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('has correct state from vuex', () => {
        const wrapper = shallowMount(BlogPosts, {
            store,
            localVue
        })

        expect(wrapper.vm.blogPosts).toBe(state.blogPosts)
    })

    it('renders all blogposts', () => {
        const wrapper = mount(BlogPosts, {
            store,
            localVue,
            stubs: ['router-link']
        })
        expect(wrapper.findAll('.card').length).toBe(2)
    })
})
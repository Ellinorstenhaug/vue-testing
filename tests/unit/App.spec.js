import Vuex from 'vuex';
import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import App from '@/app.vue';


const localVue = createLocalVue()
localVue.use(Vuex)

const mutations = {
    MERGE_BLOGPOSTS: jest.fn()
}

const store = new Vuex.Store({

    mutations
})

describe('App.vue', () => {
    it('commits to MERGE_BLOGPOSTS mutation before mount', async () => {

        const wrapper = shallowMount(App, {
            store,
            localVue,
            stubs: ['router-view']
        })

        await wrapper.vm.$nextTick()

        expect(mutations.MERGE_BLOGPOSTS).toHaveBeenCalled()
    })
})
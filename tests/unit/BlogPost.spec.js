import Vuex from 'vuex';
import VueRouter from 'vue-router';

import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import BlogPost from '@/views/BlogPost.vue';

const localVue = createLocalVue()

localVue.use(Vuex)

const mutations = {
    SET_CURRENT_POST: jest.fn()
}

const store = new Vuex.Store({
    mutations
})

describe('App.vue', () => {
    it('commits to SET_CURRENT_POST mutation before mount', async () => {
        const wrapper = shallowMount(BlogPost, {
            store,
            localVue,
        })

        await wrapper.vm.$nextTick()
        expect(mutations.SET_CURRENT_POST).toHaveBeenCalled()
    })
})
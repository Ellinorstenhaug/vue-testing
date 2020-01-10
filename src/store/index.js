import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import BlogPostHandler from './modules/BlogPostHandler'

export default new Vuex.Store({
  modules: {
    BlogPostHandler
  }
})

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import BlogPost from '../views/BlogPost.vue';
import CreateBlogPost from '../views/CreateBlogPost.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  }, 
  {
    path: '/blog/:title',
    component: BlogPost
  },
  {
    path: '/create',
    name: 'create new',
    component:CreateBlogPost
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
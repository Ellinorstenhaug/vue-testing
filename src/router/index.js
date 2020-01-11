import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import BlogPost from '../views/BlogPost.vue';
import CreateBlogPostForm from '../views/CreateBlogPostForm.vue';

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
    component:CreateBlogPostForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
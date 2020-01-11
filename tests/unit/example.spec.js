
import {
  mount
} from '@vue/test-utils'

import CreateBlogPostForm from '@/components/partials/CreateBlogPostForm.vue';


describe('CreateBlogPostForm', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(CreateBlogPostForm)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // test('titleIsInvalid is initially false', () => {
  //   //funkar ens denna? 
  //   const wrapper = mount(CreateBlogPostForm, {
  //     data(){
  //       return {

  //         titleIsInvalid: false
  //       }
  //     }
  //   })
  //   wrapper.setData({
  //     titleIsInvalid: false
  //   })
  //   expect(wrapper.vm.titleIsInvalid).toBe(false)
  // })
});


// describe('BlogPosts', () => {
//   it('renders a div',  () => {
//     //funkar om jag tar bort vuex

//     //ta bort detta test
//     const wrapper = shallowMount(BlogPosts, {
//       attachToDocument: true,
//       computed:{
//         blogPosts:[{
//           title:'test'
//         }]
//       }
//     })
//     expect(wrapper.contains('.card')).toBe(false)
//   })


// })



// describe('BlogPosts', () => {
//   it('renders li for each item in props.items', () => {
//     const wrapper = mount(BlogPosts);
//     wrapper.findAll('.card')
//     expect(wrapper.findAll('.card').exists()).toBe(true)
//   })
// })

// import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
//Test att köra: 
//* har en submitknapp
//* kör validator on submit
//* alla inputfält binder till värde
//* sparar inte om form är invalid (ett inputfält, alla inputfält)
//* ger errormeddelande om något går fel
//* should set correct default data

//todo Om båda fälten är ok => kör saveComment.
//todo om saveComment körs => kolla att mutation sker via VUEX
//todo Om saveComment körs - kör resetFields och töm fälten
// todo: submit - läggs det till meddelande "tack för din kommentar"

// todo: VUEX - läggs det till i LS?
// todo: VUEX - läggs det till i LS?

import {
    mount,
    shallowMount,
} from '@vue/test-utils'

import CreateBlogPostForm from '@/views/CreateBlogPostForm';

describe('CreateBlogPostForm', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(CreateBlogPostForm)
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('has a submit button', () => {
        const wrapper = shallowMount(CreateBlogPostForm);
        expect(wrapper.find('button[type="submit"').exists()).toBe(true)
    })

    it('runs validator function on submit', () => {
        const validate = jest.fn();
        const wrapper = shallowMount(CreateBlogPostForm, {
            methods: {
                validate
            }
        })

        wrapper.find('form').trigger('submit');
        expect(validate).toHaveBeenCalled()
    })


    it('Title input binds value', () => {
        const wrapper = shallowMount(CreateBlogPostForm);
        let textInput = wrapper.find('input#title');
        textInput.setValue('this is a title');

        expect(wrapper.vm.post.title).toBe('this is a title');
    })

    it('Excerpt input binds value', () => {
        const wrapper = shallowMount(CreateBlogPostForm);
        let textInput = wrapper.find('input#excerpt');
        textInput.setValue('this is a fragment from the post');

        expect(wrapper.vm.post.excerpt).toBe('this is a fragment from the post');
    })

    it('image input binds value', () => {
        const wrapper = shallowMount(CreateBlogPostForm);
        let textInput = wrapper.find('input#image');
        textInput.setValue('picture.png');

        expect(wrapper.vm.post.img).toBe('picture.png');
    })
    it('content input binds value', () => {
        const wrapper = shallowMount(CreateBlogPostForm);
        let textInput = wrapper.find('textarea#content');
        textInput.setValue('this is some content');

        expect(wrapper.vm.post.content).toBe('this is some content');
    })

    it('does not save blog post if title is invalid', async () => {
        const wrapper = shallowMount(CreateBlogPostForm, {
            data() {
                return {
                    post: {
                        title: "",
                        content: "content",
                    },
                }
            }
        })

        wrapper.vm.validate();
        await wrapper.vm.$nextTick()

        expect(wrapper.find('.title-warning').exists()).toBe(true)
        expect(wrapper.vm.showError).toBe(true)

    })

    it('does not save blog post if Content is invalid', async () => {
        const wrapper = shallowMount(CreateBlogPostForm, {
            data() {
                return {
                    post: {
                        title: "title",
                        content: "",
                    },
                }
            }
        })

        wrapper.vm.validate();
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.content-warning').exists()).toBe(true)
        expect(wrapper.vm.showError).toBe(true)
    })

    it('should set correct default data', () => {
        const wrapper = shallowMount(CreateBlogPostForm)
        expect(wrapper.vm.post).toEqual({
            id: null,
            title: "",
            content: "",
            excerpt: "",
            comments: [],
            img: "",
            url: ""
        }, )

        expect(wrapper.vm.titleIsInvalid).toBe(false)
        expect(wrapper.vm.contentIsInvalid).toBe(false)
        expect(wrapper.vm.imgIsInvalid).toBe(false)
        expect(wrapper.vm.submitted).toBe(false)
        expect(wrapper.vm.showError).toBe(false)
    })

    // it('shows success message after submitting valid blog post', async () => {
    //     const wrapper = shallowMount(CreateBlogPostForm, {
    //         data() {
    //             return {
    //                 post: {
    //                     title: "title",
    //                     content: "content",
    //                     img: "picture.png",
    //                 },
    //             }
    //         },
    //         computed: {
    //             blogPosts() {
    //                 return [
    //                     '', ''
    //                 ]
    //             }
    //         }, 
    //         // methods:{
    //         //     AddPostToLocalStorage: jest.fn("post")
    //         // }
    //     });

    //     // wrapper.find('form').trigger('submit.prevent');
    //     wrapper.vm.validate()
    //     expect(wrapper.vm.submitted).toBe(true)

    // })
})
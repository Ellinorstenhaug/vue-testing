import Vuex from 'vuex';
import {
    mount,
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import CreateBlogPostForm from '@/views/CreateBlogPostForm';


const localVue = createLocalVue()
localVue.use(Vuex);

const state = {
    blogPosts: [{
        id: 1
    }]
}
const mutations = {

};

const actions = {
    AddPostToLocalStorage: jest.fn()
};

const store = new Vuex.Store({
    state,
    mutations,
    actions
})


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

    it('has correct state from vuex', () => {
        const wrapper = shallowMount(CreateBlogPostForm, {
            store,
            localVue
        })

        expect(wrapper.vm.blogPosts).toBe(state.blogPosts)
    })


    it('generateUrl creates a valid URL with easy input', () => {
        const wrapper = shallowMount(CreateBlogPostForm, {
            store,
            localVue,
        })
        const test = wrapper.vm.generateUrl("testing testing");
        expect(test).toBe("testing-testing")
    })

    it('generateUrl creates a valid URL with unallowed characters', () => {
        const wrapper = shallowMount(CreateBlogPostForm, {
            store,
            localVue,
        })
        const test = wrapper.vm.generateUrl("@£$testing !testing$");
        expect(test).toBe("testing-testing")
    })


    it('resets post-model after successful submit', async () => {
        const wrapper = shallowMount(CreateBlogPostForm, {
            store,
            localVue,
            data: () => ({
                post: {
                    id: 100,
                    title: "title",
                    content: "content",
                    excerpt: "excerpt",
                    comments: [],
                    img: "",
                    url: "title"
                }
            })
        });

        wrapper.vm.resetFields();
        expect(wrapper.vm.post).toEqual({
            id: null,
            title: "",
            content: "",
            excerpt: "",
            comments: [],
            img: "",
            url: ""
        })
    })



    //exempel på integrationstest 
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
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.title-warning').exists()).toBe(true);
        expect(wrapper.vm.showError).toBe(true);
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

    it('shows success message after submitting valid blog post', async () => {
        const wrapper = shallowMount(CreateBlogPostForm, {
            store,
            localVue,
            data() {
                return {
                    post: {
                        title: "title",
                        content: "content",
                        img: "picture.png",
                    },
                }
            },
            computed: {
                blogPosts() {
                    return [
                        '', ''
                    ]
                }
            },

        });

        wrapper.vm.validate()
        expect(wrapper.vm.submitted).toBe(true)
        expect(wrapper.find('.submitted').text()).toBe('Your post has been submitted!')
    })

    it('runs AddPostToLocalStorage action if model is valid', async () => {
        const wrapper = shallowMount(CreateBlogPostForm, {
            store,
            localVue,
        })

        wrapper.vm.saveBlogPost()
        await wrapper.vm.$nextTick()
        expect(actions.AddPostToLocalStorage).toHaveBeenCalled()
    })

})
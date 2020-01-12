import {
    mount,
    shallowMount,
    createLocalVue
} from '@vue/test-utils'

import Vuex from 'vuex';
import CreateComment from '@/components/partials/CreateComment.vue';

const localVue = createLocalVue()
localVue.use(Vuex)

const state = {
    blogPosts: [{
        id: 1
    }],
    currentPost: {
        id: 100
    }
}
const mutations = {
    SET_COMMENT: jest.fn()
};

const store = new Vuex.Store({
    state,
    mutations,
})


describe('CreateComment', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(CreateComment)
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should set correct default data', () => {
        const wrapper = shallowMount(CreateComment);

        expect(wrapper.vm.comment).toEqual({
            name: "",
            content: "",
            postId: '',
            date: new Date().toUTCString()
        })

        expect(wrapper.vm.nameIsInvalid).toBe(false)
        expect(wrapper.vm.contentIsInvalid).toBe(false)
        expect(wrapper.vm.submitted).toBe(false)
        expect(wrapper.vm.notValid).toBe(false)
    })

    it('has correct initial state from vuex', () => {
        const wrapper = shallowMount(CreateComment, {
            store,
            localVue
        })

        expect(wrapper.vm.blogPosts).toBe(state.blogPosts)
        expect(wrapper.vm.currentPost).toBe(state.currentPost)
    })


    it('has a submit button', () => {
        const wrapper = shallowMount(CreateComment)
        expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    });

    it('runs validator function on submit', () => {
        const validate = jest.fn()
        const wrapper = shallowMount(CreateComment, {
            methods: {
                validate
            }
        })

        wrapper.find('form').trigger('submit');
        expect(validate).toHaveBeenCalled();
    });

    it('name input binds value', () => {
        const wrapper = shallowMount(CreateComment)
        let textInput = wrapper.find('input#name');
        textInput.setValue('a value');

        expect(wrapper.vm.comment.name).toBe('a value')
    })

    it('content input binds value', () => {
        const wrapper = shallowMount(CreateComment)
        let textInput = wrapper.find('textarea#content');
        textInput.setValue('a value');

        expect(wrapper.vm.comment.content).toBe('a value')
    })

    it('does not save comment if nameInput is invalid', () => {
        const wrapper = shallowMount(CreateComment, {
            data() {
                return {
                    comment: {
                        name: '',
                        content: "test",
                    }
                }
            }
        });

        wrapper.vm.validate()
        expect(wrapper.vm.notValid).toBe(true)
    });

    it('does not save comment if contentInput is invalid', () => {
        const wrapper = shallowMount(CreateComment, {
            data() {
                return {
                    comment: {
                        name: 'Test',
                        content: "",
                    }
                }
            }
        });

        wrapper.vm.validate()
        expect(wrapper.vm.notValid).toBe(true)
    });

    it('does not save comment if is not filled in', () => {
        const wrapper = shallowMount(CreateComment, {
            data() {
                return {
                    comment: {
                        name: '',
                        content: "",
                    }
                }
            }
        });

        wrapper.vm.validate()
        expect(wrapper.vm.notValid).toBe(true)
    });

    it('runs SET_COMMENT mutation if model is valid', async () => {
        const wrapper = shallowMount(CreateComment, {
            store,
            localVue,
        })

        wrapper.vm.saveComment()
        await wrapper.vm.$nextTick()
        expect(mutations.SET_COMMENT).toHaveBeenCalled()
    })


    it('gives error message if comment is invalid', () => {
        const wrapper = shallowMount(CreateComment, {
            data() {
                return {
                    comment: {
                        name: 'test',
                        content: "",
                    }
                }
            }
        });

        wrapper.vm.validate()

        expect(wrapper.find('.notvalid').exists()).toBe(true)
    });


    it('validateInput method returns false when input should be invalid', () => {
        const wrapper = shallowMount(CreateComment)
        const returnedBoolean = wrapper.vm.validateInput('');
        expect(returnedBoolean).toBe(false)
    })

    it('validateInput method returns true when input should be valid', () => {
        const wrapper = shallowMount(CreateComment)
        const returnedBoolean = wrapper.vm.validateInput('valid input');
        expect(returnedBoolean).toBe(true)
    })


    it('resets comment-model after successful submit', async () => {
        const wrapper = shallowMount(CreateComment, {
            store,
            localVue,
            data: () => ({
                comment: {
                    name: "Name",
                    content: "Content",
                }
            })
        });

        wrapper.vm.resetFields();

        expect(wrapper.vm.comment).toEqual({
            name: "",
            content: "",
        })
    })

    it('shows success message after submitting valid comment', async () => {
        const wrapper = shallowMount(CreateComment, {
            store,
            localVue,
            data() {
                return {
                    comment: {
                        name: "Name",
                        content: "Content",
                    }
                }
            },
        });

        wrapper.vm.validate()
        expect(wrapper.vm.submitted).toBe(true)
        expect(wrapper.find('.submitted').text()).toBe('Your comment has been submitted!')
    })
});
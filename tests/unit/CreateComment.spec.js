import {
    mount,
    shallowMount,
    createLocalVue
} from '@vue/test-utils'

import Vuex from 'vuex';
import CreateComment from '@/components/partials/CreateComment.vue';

const localVue = createLocalVue()
localVue.use(Vuex)

//Test att köra: 
//* har en submitknapp
//* kör validator on submit
//* alla inputfält binder till värde
//* sparar inte om form är invalid (ett inputfält, alla inputfält)
//* ger errormeddelande om något går fel

//todo Om båda fälten är ok => kör saveComment.
//todo om saveComment körs => kolla att mutation sker via VUEX
//todo Om saveComment körs - kör resetFields och töm fälten
// todo: submit - läggs det till meddelande "tack för din kommentar"

// todo: VUEX - läggs det till i LS?
// todo: VUEX - läggs det till i LS?

describe('CreateComment', () => {
    let actions, mutations, store;

    beforeEach(() => {
        actions = {
                actionClick: jest.fn(),
                actionInput: jest.fn()
            },
            mutations = {
                SET_COMMENT: jest.fn()
            }

        store = new Vuex.Store({
            actions,
            mutations
        })
    })

    test('is a Vue instance', () => {
        const wrapper = shallowMount(CreateComment)
        expect(wrapper.isVueInstance()).toBeTruthy()
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
        const wrapper = mount(CreateComment, {
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
        const wrapper = mount(CreateComment, {
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
        const wrapper = mount(CreateComment, {
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

    it('gives error message if comment is invalid', () => {
        const wrapper = mount(CreateComment, {
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

    //! HÄR

    // it("dispatch a namespaced action when form is submitted", async () => {

    //     const wrapper = shallowMount(CreateComment, {
    //         data(){
    //             return {
    //                 comment: {
    //                     name: 'test',
    //                     content: "hejs",
    //                 }
    //             }
    //         },
    //         computed: {
    //             currentPost(){
    //                 return {id: 20}
    //             }
    //         },
    //         store,
    //         localVue
    //     })


    //     // wrapper.find("form").trigger("submit");
    //     wrapper.vm.validate()
    //     await wrapper.vm.$nextTick()
    //     expect(wrapper.vm.submitted).toBe(true)

    //     expect(mutations.SET_COMMENT).toHaveBeenCalled()
    // })

    // it('confirms the valid comment has been sent with message', () => {
    //     const wrapper = mount(CreateComment, {
    //         data() {
    //             return {
    //                 comment: {
    //                     name: 'test',
    //                     content: "test",

    //                 },

    //             }
    //         },
    //         computed: {
    //             currentPost() {
    //                 return {
    //                     id: 20
    //                 }
    //             }
    //         }
    //     });
    //     console.log(wrapper.vm.currentPost.id);
    //     wrapper.vm.validate();
    //     expect(wrapper.vm.$data.submitted).toBe(true)

    // })


});
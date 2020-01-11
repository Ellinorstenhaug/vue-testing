import {
    mount,
    shallowMount,
    createLocalVue
} from '@vue/test-utils'
import Card from '@/components/layout/Card.vue';

// * renderar bild endast om image finns som prop
// * har .card
// todo visas om prop finns
// todo kolla router ? 


describe('Card.vue', () => {
    it('renders image if image is in prop', () => {
        const wrapper = mount(Card, {
            propsData: {
                post: {
                    img: 'https://image.com',
                }
            },
            stubs: ['router-link']
        })

        expect(wrapper.find('img').exists()).toBe(true)
    })
    it('has card class', () => {
        const wrapper = mount(Card, {
            propsData: {
                post: {}
            },
            stubs: ['router-link']
        })
        expect(wrapper.find('.card').exists()).toBe(true)
    })
})
import { VividTyping } from 'vivid-typing'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from '../src/App.vue'
import { RegularForm, RegularFormField } from './../../src/index'

describe('Counter.vue', () => {
  it('should render', () => {
    const wrapper = mount(App, {
      components: {
        VividTyping,
        RegularFormField,
        RegularForm,
      },
    })
    wrapper.find('button').trigger('click')
    console.log(RegularForm)
    // expect(wrapper.text()).toContain('10')
    // expect(wrapper.html()).toMatchSnapshot()
  })

  // it('should be interactive', async () => {
  //   const wrapper = mount(Counter, { props: { initial: 0 } })
  //   expect(wrapper.text()).toContain('0')

  //   expect(wrapper.find('.inc').exists()).toBe(true)

  //   await wrapper.get('button').trigger('click')

  //   expect(wrapper.text()).toContain('1')
  // })
})

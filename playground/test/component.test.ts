import { VividTyping } from 'vivid-typing'
import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
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
    // expect(wrapper.text()).toContain('10')
    // expect(wrapper.html()).toMatchSnapshot()
  })
})

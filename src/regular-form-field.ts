import { defineComponent, h } from 'vue'
import type { DefineComponent, Ref } from 'vue'

export const RegularFormField = defineComponent({
  name: 'RegularFormField',
  props: {
    label: {
      type: String,
    },
    width: {
      type: String,
      default: '120px',
    },
    errorMsg: {
      type: Object,
      default: () => ({}),
    },
    required: {
      type: Boolean,
    }
  },
  setup(props, { slots }) {
    return () => h('div', { class: 'regular-form-field' }, [h('label', { class: `regular-form-field__label${props.required ? ' is-required' : ''}`, style: `width:${props.width?.replace('px', '')}px` }, props.label), h('div', {
      class: 'regular-form-field__content',
    }, [slots.default?.(), h('div', { class: 'regular-form-field__error', style: `visibility:${props?.errorMsg.value ? 'visible' : 'hidden'}` }, props?.errorMsg.value)])])
  },
}) as DefineComponent<{ label: string, width: string, errorMsg: Ref<string>, required: boolean }>

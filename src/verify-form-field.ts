import { defineComponent, h } from 'vue'
import type { DefineComponent, Ref } from 'vue'

export const VerifyFormField = defineComponent({
  name: 'VerifyFormField',
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
    },
  },
  setup(props, { slots }) {
    return () => h('div', { class: 'verify-form-field' }, [h('label', { class: `verify-form-field__label${props.required ? ' is-required' : ''}`, style: `width:${props.width?.replace('px', '')}px` }, props.label), h('div', {
      class: 'verify-form-field__content',
    }, [slots.default?.(), h('div', { class: 'verify-form-field__error', style: `visibility:${props?.errorMsg.value ? 'visible' : 'hidden'}` }, props?.errorMsg.value)])])
  },
}) as DefineComponent<{ label: string; width: string; errorMsg: Ref<string>; required: boolean }>

import { defineComponent, h, watch, ref } from 'vue'
import type { VNode } from 'vue'
export const Form = defineComponent({
  name: "RegularForm",
  props: {
    formData: {
      type: Object,
    }
  },
  setup(props, { slots, expose }) {
    const children: VNode[] = slots.default?.()!
    const RegularFormField = children.filter(child => {
      const type = child.type as string | { name: string }
      if (typeof type === 'string' || type?.name !== 'RegularFormField') return false
      const errorMsg = ref('')
      let props = child.props!
      props = Object.assign(props, { errorMsg })
      return child
    })

    watch(props, () => {
      emitProps(RegularFormField, props)
    })

    emitProps(RegularFormField, props)
    function reset() {
      clearStatus(RegularFormField)
    }
    function clear() {
      for (const key in props.formData) {
        const value = props.formData[key]
        if (typeof value === 'string') {
          props.formData[key] = ''
        }
      }
    }
    function getStatus() {
      return !RegularFormField.some(child => child.props?.errorMsg?.value)
    }
    expose({ $reset: reset, $clear: clear, getStatus })

    return () => h('form', { class: "regular-form" }, children)
  }
})

export const FormField = defineComponent({
  name: "RegularFormField",
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
    }
  },
  setup(props, { slots }) {
    return () => h('div', { class: 'regular-form-field' }, [h('label', { class: "regular-form-field__label", style: `width:${props.width?.replace('px', '')}px` }, props.label), h('div', {
      class: 'regular-form-field__content',
    }, [slots.default?.(), h('div', { class: 'regular-form-field__error', style: `display:${props.errorMsg?.value}?block:none` }, props.errorMsg?.value)])])
  }
})


function getRules(rules: any[] = [], newVal: any) {
  for (const rule of rules) {
    const result = rule(newVal)
    if (result !== true) {
      return result
    }
  }
  return false
}

function clearStatus(children: VNode[]) {
  children.forEach(child => {
    const errorMsg = child.props?.errorMsg
    errorMsg.value = ''
  })
}

function emitProps(children: VNode[], props: any) {
  clearStatus(children)
  for (const key in props.formData) {
    const msg = getRules(props.formData.rule[key], props.formData[key])
    if (msg) {
      children.some((child) => {
        const prop = child.props?.prop
        const errorMsg = child.props?.errorMsg
        if (prop === key) {
          errorMsg.value = msg
        }
      })
    }

  }
}

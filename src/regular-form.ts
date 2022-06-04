import { defineComponent, h, ref, watch } from 'vue'
import type { VNode } from 'vue'
import { addStyle } from './add-style'

addStyle()

export const RegularForm = defineComponent({
  name: 'RegularForm',
  props: {
    formData: {
      type: Object,
      default: () => ({}),
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, expose }) {
    const children: VNode[] = slots.default?.() || []
    const formData = props.formData
    const RegularFormField = children.filter((child) => {
      const type = child.type as string | { name: string }
      if (typeof type === 'string' || type?.name !== 'RegularFormField')
        return false
      const errorMsg = ref('')
      return Object.assign(child.props || {}, { errorMsg })
    })
    emitProps(RegularFormField, formData)

    watch(formData, () => {
      emitProps(RegularFormField, formData)
    })

    function reset() {
      clearStatus(RegularFormField)
    }
    function clear() {
      for (const key in formData) {
        const value = formData[key]
        if (typeof value === 'string')
          formData[key] = ''
      }
    }
    function getStatus() {
      return !RegularFormField.some(child => child.props?.errorMsg.value)
    }

    expose({ $reset: reset, $clear: clear, getStatus })
    return () => h('form', { class: `regular-form${props.inline ? ' regular-form__inline' : ''}` }, children)
  },
})

function getRules(formData: Record<string, any>, key: any) {
  const rules = formData?.rule[key]
  if (!rules)
    return false
  const val = formData[key]
  for (const rule of rules) {
    const result = rule(val)
    if (result !== true)
      return result
  }
  return false
}

function clearStatus(RegularFormField: VNode[]) {
  RegularFormField.forEach((child) => {
    const errorMsg = child.props?.errorMsg
    errorMsg.value = ''
  })
}

function emitProps(RegularFormField: VNode[], formData: any) {
  clearStatus(RegularFormField)
  for (const key in formData) {
    const msg = getRules(formData, key)
    if (!msg)
      continue
    RegularFormField.some((child) => {
      const props = child.props!
      if (props.prop === key)
        props.errorMsg.value = msg
      return true
    })
  }
}

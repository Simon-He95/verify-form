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
    initialRegular: {
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
    if (props.initialRegular)
      emitProps(RegularFormField, formData)

    let oldFormData = { ...formData }
    watch(formData, () => {
      emitSingleProp(RegularFormField, formData, diffKey(oldFormData, formData))
      oldFormData = { ...formData }
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
      emitProps(RegularFormField, formData)
      return !RegularFormField.some(child => child.props?.errorMsg.value)
    }

    expose({ $reset: reset, $clear: clear, getStatus })
    return () => h('form', { class: `regular-form${props.inline ? ' regular-form__inline' : ''}` }, children)
  },
})

function getRules(formData: Record<string, any>, key: any) {
  const rules = formData?.rule[key]
  if (!rules)
    return undefined
  const val = formData[key]
  for (const rule of rules) {
    const result = rule(val)
    if (typeof result === 'string')
      return result
  }
  return ''
}

function clearStatus(RegularFormField: VNode[]) {
  RegularFormField.forEach((child) => {
    const errorMsg = child.props?.errorMsg
    errorMsg.value = ''
  })
}

function emitProps(RegularFormField: VNode[], formData: any) {
  clearStatus(RegularFormField)
  for (const key in formData)
    emitSingleProp(RegularFormField, formData, key)
}

function emitSingleProp(RegularFormField: VNode[], formData: any, key: string) {
  if (!key)
    return
  const msg = getRules(formData, key)
  if (msg === undefined)
    return

  return RegularFormField.some((child) => {
    const { prop, errorMsg } = child.props!
    if (prop === key) {
      errorMsg.value = msg
      return true
    }
    return false
  })
}

function diffKey(v1: Record<string, any>, v2: Record<string, any>): string {
  for (const key in v1) {
    if (v1[key] !== v2[key])
      return key
  }
  return ''
}

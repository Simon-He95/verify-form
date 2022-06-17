import { computed, defineComponent, h, ref, watch } from 'vue'
import type { DefineComponent, UnwrapNestedRefs, VNode } from 'vue'
import { addStyle } from './add-style'

addStyle()

export const VerifyForm = defineComponent({
  name: 'VerifyForm',
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
    const VerifyFormField: VNode[] = children.filter((child) => {
      const type = child.type as string | { name: string }
      if (typeof type === 'string' || type?.name !== 'VerifyFormField')
        return false
      const errorMsg = ref('')
      return Object.assign(child.props || {}, { errorMsg })
    })
    const errorList = computed(() => {
      return VerifyFormField.filter(item => item?.props?.errorMsg.value).map((item) => {
        return { errorMsg: item?.props?.errorMsg.value, prop: item?.props?.prop, el: item?.el?.querySelector('input') }
      })
    })
    if (props.initialRegular)
      emitProps(VerifyFormField, formData)

    let oldFormData = { ...formData }
    watch(formData, () => {
      emitSingleProp(VerifyFormField, formData, diffKey(oldFormData, formData))
      oldFormData = { ...formData }
    })

    function reset() {
      clearStatus(VerifyFormField)
    }
    function clear() {
      for (const key in formData) {
        if (key === 'rules')
          continue
        formData[key] = ''
      }
      emitProps(VerifyFormField, formData)
    }
    function getStatus() {
      emitProps(VerifyFormField, formData)
      autoFocus()
      return !VerifyFormField.some(child => child.props?.errorMsg.value)
    }

    function getErrorMsg() {
      return errorList.value
    }
    function autoFocus() {
      errorList.value[0]?.el?.focus()
    }

    expose({ $reset: reset, $clear: clear, getStatus, getErrorMsg, autoFocus })
    return () => h('form', { class: `verify-form${props.inline ? ' verify-form__inline' : ''}` }, children)
  },
}) as DefineComponent<{ formData: UnwrapNestedRefs<Record<string, any>>; inline: boolean; initialRegular: boolean }>

function getRules(formData: Record<string, any>, key: any) {
  const rules = formData?.rules?.[key]
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

function clearStatus(VerifyFormField: VNode[]) {
  VerifyFormField.forEach((child) => {
    const errorMsg = child.props?.errorMsg
    errorMsg.value = ''
  })
}

function emitProps(VerifyFormField: VNode[], formData: any) {
  clearStatus(VerifyFormField)
  for (const key in formData)
    emitSingleProp(VerifyFormField, formData, key)
}

function emitSingleProp(VerifyFormField: VNode[], formData: any, key: string) {
  if (!key)
    return
  const msg = getRules(formData, key)
  if (msg === undefined)
    return

  return VerifyFormField.some((child) => {
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

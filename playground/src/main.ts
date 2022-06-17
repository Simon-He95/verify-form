import { createApp } from 'vue'
import { VividTyping } from 'vivid-typing'
import { VerifyForm, VerifyFormField } from '../../src'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
app.component('VerifyForm', VerifyForm)
app.component('VerifyFormField', VerifyFormField)
app.component('VividTyping', VividTyping)

app.mount('#app')

import { createApp } from 'vue'
import { VividTyping } from 'vivid-typing'
import { RegularForm, RegularFormField } from '../../src/index'
// import { RegularForm, RegularFormField } from 'verify-form'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
app.component('RegularForm', RegularForm)
app.component('RegularFormField', RegularFormField)
app.component('VividTyping', VividTyping)

app.mount('#app')

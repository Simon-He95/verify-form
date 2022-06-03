import { createApp } from 'vue'
import App from './App.vue'
import { Form, FormField } from '../../src/index'
import '../../src/index.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
app.component('Form', Form)
app.component('FormField', FormField)

app.mount('#app')

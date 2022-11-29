import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

loadStyle('https://unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css')

import App from './app.vue'
import { isDev } from './config'
import { loadStyle } from './utils'
import './styles/global.less'

const id = `app_vue_${Date.now()}`
const root = document.createElement('div')
root.id = id
document.body.appendChild(root)

if (isDev) {
  console.log(123)
  const ElementUI = require('element-ui')
  Vue.use(ElementUI)
  Vue.use(VueClipboard)
  Vue.use(VueRouter);
} else {
  Vue.use(VueClipboard)
}

new Vue({
  el: `#${id}`,
  render: h => h(App)
})

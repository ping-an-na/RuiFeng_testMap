import Vue from 'vue'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入Element UI样式
Vue.use(ElementUI)

import router from './router' // 引入

import App from './App.vue'

Vue.config.productionTip = false


import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'
Vue.use(VueHighlightJS)

import less from 'less'
Vue.use(less)

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')

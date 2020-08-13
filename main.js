import Vue from 'vue'
import App from './App'

import uniIcons from "~@/../components/uni-icons/uni-icons.vue"; 
// import setter from "pages/config.js" 

// Vue.prototype.$setter = setter;//特性挂载
Vue.component("uniIcons",uniIcons);//字体图标挂载


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})

app.$mount()

import Vue from 'vue'
import App from './App'
import uniIcons from "~@/../components/uni-icons/uni-icons.vue"; 

//  字体图标挂载
Vue.component("uniIcons",uniIcons);


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})

app.$mount()

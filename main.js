
// 全局组件挂载
import Vue from 'vue'
import App from './App'
import uniIcons from "~@/../components/uni-icons/uni-icons.vue"; //字体图标挂载
import uniCalendar from "~@/../components/uni-calendar/uni-calendar.vue"; //日历挂载


// 特性挂载
import serter from "pages/config.js";
Vue.prototype.$serter = serter

Vue.config.productionTip = false

App.mpType = 'app'

Vue.component("uniIcons",uniIcons);
Vue.component(uniCalendar);
const app = new Vue({
	...App
})

app.$mount()

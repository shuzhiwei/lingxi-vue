import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/base.css'
import $ from 'jquery'
import echarts from 'echarts'
import layer from 'vue-layer'

Vue.prototype.$layer = layer(Vue);
Vue.prototype.$echarts = echarts
Vue.use(Element)

Vue.config.productionTip = false


new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App/>',
})
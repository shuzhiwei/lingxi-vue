import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '../static/css/base.css'
import echarts from 'echarts'
import layer from 'vue-layer'
import RouterTab from 'vue-router-tab'
import 'vue-router-tab/dist/lib/vue-router-tab.css'

Vue.prototype.$layer = layer(Vue);
Vue.prototype.$echarts = echarts
Vue.use(Element)
Vue.use(RouterTab)

Vue.config.productionTip = false


new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App/>',
    router
})
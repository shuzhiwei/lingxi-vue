import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '../static/css/base.css'
import echarts from 'echarts'
import RouterTab from 'vue-router-tab'
import 'vue-router-tab/dist/lib/vue-router-tab.css'
import Vuex from 'vuex'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        isshow: true,
        screenWidth: document.body.clientWidth,
        base_url: 'https://www.nnbkqnp.cn',
        // base_url_test: 'http://localhost:8080',
        base_url_test: 'https://www.nnbkqnp.cn/lingxi-system',
    },

    mutations: {
        controlShow: (state) => {
            if (state.screenWidth < 1236) {
                state.isshow = false
            }else{ 
                state.isshow = true
            }
        }
    }
})

Vue.prototype.$echarts = echarts
Vue.use(Element)
Vue.use(RouterTab)

new Vue({
    el: '#app',
    store,
    components: {
        App,

    },
    template: '<App/>',
    router
})
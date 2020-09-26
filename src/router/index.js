/*
路由器模块
*/

import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

import Home from '../views/Home.vue'
import Hello from '../views/Hello.vue'

import EditBlog from '../views/EditBlog.vue'
import AddBlog from '../views/AddBlog.vue'
import DetailBlog from '../views/DetailBlog.vue'
import DeleteBlog from '../views/DeleteBlog.vue'

import PowerFactor from '../views/PowerFactor.vue'

import AuthManage from '../views/AuthManage.vue'
import AddAuth from '../views/AddAuth.vue'

Vue.use(VueRouter)


export default new VueRouter({
    base: '/lingxi-system/',
    // n个路由
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/main',
            component: Main,
            children: [
                {
                    path: 'home',
                    component: Home
                },
                {
                    path: 'hello',
                    component: Hello
                },
                {
                    path: 'edit/:id',
                    component: EditBlog
                },
                {
                    path: 'delete',
                    component: DeleteBlog
                },
                {
                    path: 'detail/:id',
                    component: DetailBlog
                },
                {
                    path: 'add',
                    component: AddBlog
                },
                {
                    path: 'powerFactor',
                    component: PowerFactor
                },
                {
                    path: 'authManage',
                    component: AuthManage
                },
                {
                    path: 'addAuth',
                    component: AddAuth
                }
            ]
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
})

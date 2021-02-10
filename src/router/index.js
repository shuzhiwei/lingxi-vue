/*
路由器模块
*/

import Vue from 'vue'
import VueRouter from 'vue-router'

import { RouterTabRoutes } from 'vue-router-tab'

Vue.use(VueRouter)


export default new VueRouter({
    base: '/lingxi-system/',
    // n个路由
    routes: [
        {
            path: '/login',
            component: resolve => require(['../views/Login.vue'], resolve)
        },
        {
            path: '/share',
            component: resolve => require(['../components/Share.vue'], resolve)
        },
        {
            path: '/shareDetail/:id',
            component: resolve => require(['../components/ShareDetail.vue'], resolve)
        },
        {
            path: '/main',
            component: resolve => require(['../views/Main.vue'], resolve),
            children: [
                ...RouterTabRoutes,
                {
                    path: 'home',
                    component: resolve => require(['../views/Home.vue'], resolve),
                    meta: {
                        title: 'Home', // 页签标题
                        icon: 'el-icon-paperclip', // 页签图标，可选
                        // tips: '这是一个页面', // 页签提示，可选，如未设置则跟 title 一致
                        key: 'path', // 路由打开页签规则，可选
                        closable: true // 页签是否允许关闭，默认 `true`
                      }
                },
                {
                    path: 'todo',
                    component: resolve => require(['../views/TodoList1.vue'], resolve),
                    meta: {
                        title: 'Todo', // 页签标题
                        icon: 'el-icon-paperclip', // 页签图标，可选
                        // tips: '这是一个页面', // 页签提示，可选，如未设置则跟 title 一致
                        key: 'path', // 路由打开页签规则，可选
                        closable: true // 页签是否允许关闭，默认 `true`
                      }
                },
                {
                    path: 'chat',
                    component: resolve => require(['../views/Chat.vue'], resolve),
                    meta: {
                        title: 'Chat', // 页签标题
                        icon: 'el-icon-paperclip', // 页签图标，可选
                        key: 'path', // 路由打开页签规则，可选
                        closable: true // 页签是否允许关闭，默认 `true`
                      }
                },
                {
                    path: 'edit/:id',
                    component: resolve => require(['../views/EditBlog.vue'], resolve),
                    meta: {
                        title: 'EditBlog',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'add',
                    component: resolve => require(['../views/AddBlog.vue'], resolve),
                    meta: {
                        title: 'AddBlog',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'detail/:id',
                    component: resolve => require(['../views/DetailBlog.vue'], resolve),
                    meta: {
                        title: 'DetailBlog',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                    
                },
                {
                    path: 'powerFactor',
                    component: resolve => require(['../views/PowerFactor.vue'], resolve),
                    meta: {
                        title: 'PowerFactor',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'authManage',
                    component: resolve => require(['../views/AuthManage.vue'], resolve),
                    meta: {
                        title: 'AuthManage',
                        color: 'black',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'test',
                    component: resolve => require(['../views/test.vue'], resolve),
                    meta: {
                        title: 'test',
                        color: 'black',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'greatRetail',
                    component: resolve => require(['../views/StockGreatRetail.vue'], resolve),
                    meta: {
                        title: 'greatRetail',
                        color: 'black',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'private',
                    component: resolve => require(['../views/StockPrivate.vue'], resolve),
                    meta: {
                        title: 'private',
                        color: 'black',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'private1',
                    component: resolve => require(['../views/StockPrivate1.vue'], resolve),
                    meta: {
                        title: 'private1',
                        color: 'black',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'favorites',
                    component: resolve => require(['../views/Favorites.vue'], resolve),
                    meta: {
                        title: 'favorites',
                        color: 'black',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'kdj',
                    component: resolve => require(['../views/StockKdj.vue'], resolve),
                    meta: {
                        title: 'goldCross',
                        color: 'black',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'dytt',
                    component: resolve => require(['../views/Dytt.vue'], resolve),
                    meta: {
                        title: 'dytt',
                        color: 'black',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'vipParser',
                    component: resolve => require(['../views/VipParser.vue'], resolve),
                    meta: {
                        title: 'vipParser',
                        color: 'black',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
               
            ]
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
})

/*
路由器模块
*/

import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

import Home from '../views/Home.vue'
import Chat from '../views/Chat.vue'

import EditBlog from '../views/EditBlog.vue'
import DetailBlog from '../views/DetailBlog.vue'
import AddBlog from '../views/AddBlog.vue'

import PowerFactor from '../views/PowerFactor.vue'

import AuthManage from '../views/AuthManage.vue'

import { RouterTabRoutes } from 'vue-router-tab'

import test from '../views/test.vue'

import Share from '../components/Share.vue'
import ShareDetail from '../components/ShareDetail.vue'

import StockGreatRetail from '../views/StockGreatRetail.vue'
import StockPrivate from '../views/StockPrivate.vue'
import StockPrivate1 from '../views/StockPrivate1.vue'
import Favorites from '../views/Favorites.vue'
import StockKdj from '../views/StockKdj.vue'

import Dytt from '../views/Dytt.vue'
import VipParser from '../views/VipParser.vue'

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
            path: '/share',
            component: Share
        },
        {
            path: '/shareDetail/:id',
            component: ShareDetail
        },
        {
            path: '/main',
            component: Main,
            children: [
                ...RouterTabRoutes,
                {
                    path: 'home',
                    component: Home,
                    meta: {
                        title: 'Home', // 页签标题
                        icon: 'el-icon-paperclip', // 页签图标，可选
                        // tips: '这是一个页面', // 页签提示，可选，如未设置则跟 title 一致
                        key: 'path', // 路由打开页签规则，可选
                        closable: true // 页签是否允许关闭，默认 `true`
                      }
                },
                {
                    path: 'chat',
                    component: Chat,
                    meta: {
                        title: 'Chat', // 页签标题
                        icon: 'el-icon-paperclip', // 页签图标，可选
                        key: 'path', // 路由打开页签规则，可选
                        closable: true // 页签是否允许关闭，默认 `true`
                      }
                },
                {
                    path: 'edit/:id',
                    component: EditBlog,
                    meta: {
                        title: 'EditBlog',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'add',
                    component: AddBlog,
                    meta: {
                        title: 'AddBlog',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'detail/:id',
                    component: DetailBlog,
                    meta: {
                        title: 'DetailBlog',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                    
                },
                {
                    path: 'powerFactor',
                    component: PowerFactor,
                    meta: {
                        title: 'PowerFactor',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'authManage',
                    component: AuthManage,
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
                    component: test,
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
                    component: StockGreatRetail,
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
                    component: StockPrivate,
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
                    component: StockPrivate1,
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
                    component: Favorites,
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
                    component: StockKdj,
                    meta: {
                        title: 'kdj',
                        color: 'black',
                        icon: 'el-icon-paperclip',
                        key: 'path',
                        closable: true
                      }
                },
                {
                    path: 'dytt',
                    component: Dytt,
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
                    component: VipParser,
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

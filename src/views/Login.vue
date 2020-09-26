<template>
<div id="app">
        <div class="content">
            <div class="content_input">
                <div class="title">
                    <p>管理员登录</p>
                </div>
                <el-input v-model="UserName" clearable placeholder="用户名" @keyup.enter="submit"></el-input>
                <el-input v-model="PassWord" clearable show-password placeholder="密码"></el-input>
                <div class="content_button">
                    <el-button type="primary" @click="SignIn">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    export default {
        data () {
            return {
                UserName: '',
                PassWord: ''
            }
        },

        mounted () {
            const token = getCookie('lingxi-token')
            if(token !== 'None'){
                this.$router.push({path: '/main/home'})
            }
        },
        
        methods: {
            SignIn () {
                const url = `https://www.食.tech/acs/api/v1/auth/login`
                const params = {
                    "username": this.UserName,
                    "password": this.PassWord
                }
                axios.post(url, qs.stringify(params)).then(response => {
                    const token = response.data
                    this.$router.push({path: '/main/home'})
                    setCookie('lingxi-token',token, 3600*24)
                    setCookie('username',this.UserName, 3600*24)
                }).catch(error => {
                    alert('登陆失败')
                })
            }
        }

    }
</script>

<style>

</style>
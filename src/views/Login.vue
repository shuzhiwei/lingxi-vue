<template>
<div id="app">
        <div class="content">
            <div class="content_input">
                <div class="title">
                    <p>管理员登录</p>
                </div>
                <el-input class="userpassword" v-model="UserName" clearable placeholder="用户名" @keyup.enter="submit"></el-input>
                <el-input class="userpassword" v-model="PassWord" clearable show-password placeholder="密码"></el-input>
                <div class="content_button">
                    <el-button class="login" type="primary" @click="SignIn">登录</el-button>
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
@charset "utf-8";
* {
	padding: 0;
	margin: 0;
}

.content {
	width: 500px;
	height: 300px;
	box-sizing: border-box;
	padding: 0 50px;
	border-radius: 5px;
	box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
	background: rgba(255, 255, 255, 0.5);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: mymove 1s ease-in-out  alternate;
	overflow: hidden;
	transition: 1.5s;
}

@keyframes mymove {
	0% {
		width: 0px;
		height: 5px;
	}

	10% {
		width: 50px;
		height: 5px;
	}

	15% {
		width: 100px;
		height: 5px;
	}

	20% {
		width: 150px;
		height: 5px;
	}

	25% {
		width: 200px;
		height: 5px;
	}

	30% {
		width: 250px;
		height: 5px;
	}

	35% {
		width: 300px;
		height: 5px;
	}

	40% {
		width: 350px;
		height: 5px;
	}

	45% {
		width: 450px;
		height: 5px;
	}

	50% {
		width: 500px;
		height: 5px;
	}

	55% {
		height: 30px;
	}

	60% {
		height: 60px;
	}

	65% {
		height: 90px;
	}

	70% {
		height: 120px;
	}

	75% {
		height: 150px;
	}

	80% {
		height: 180px;
	}

	85% {
		height: 210px;
	}

	90% {
		height: 240px;
	}

	95% {
		height: 240px;
	}

	100% {
		height: 300px;
	}
}

.content_input {
	width: 300px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

}

.content_button {
	margin-top: 10px;
}

.userpassword {
	margin-bottom: 25px;
}

.title {
	text-align: center;
	font-size: 24px;
	margin-bottom: 30px;
	font-weight: bold;
	color: #606266;
}

.login {
	width: 100%;

}

</style>
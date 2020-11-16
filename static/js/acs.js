import PubSub from 'pubsub-js'
import axios from 'axios'
import qs from 'qs'
import {setCookie,getCookie} from '../../static/js/cookie.js'

export function refresh_token(username, token) {
    const url = `https://www.nnbkqnp.cn/acs/api/v1/auth/relogin`
    let data = {
        'username': username,
        'token': token
    }
    axios.post(url, qs.stringify(data)).then(response => {
        const refresh_token = response.data
        console.log(refresh_token)
        setCookie('lingxi-token',refresh_token, 3600*24)
        setCookie('username',username, 3600*24)
    }).catch(error => {
        console.log(error)
        alert('刷新token失败')
    })
}
  
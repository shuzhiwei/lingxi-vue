import axios from 'axios'

const qs = require('qs')
const api = {
    async get(url, data) {
        try {
            let res = await axios.get(url, { params: data })
            console.log(res)
            res = res.data
            return new Promise((resolve) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    resolve(res)
                }
            })
        } catch (err) {
            alert('服务器出错')
            console.log(err)
        }
    },

    async post(url, data) {
        try {
            let res = await axios.post(url, qs.stringify(data))
            res = res.data
            return new Promise((resolve, reject) => {
                if (res.code === 200) {
                    resolve(res)
                } else if (res.code === 402) {
                    resolve(res)
                } else if (res.code === 401) {
                    this.$message.error('无acs权限！')
                    reject(res)
                } else {
                    console.log('接口返回状态码：' + res.code)
                    reject(res)
                }
            })
        } catch (err) {
            // return (e.message)
            alert('服务器出错')
            console.log(err)
        }
    },
    async es_post(url, data) {
        try {
            let res = await axios.post(url, data)
            return new Promise((resolve, reject) => {
                if (res.status === 200) {
                    resolve(res)
                } else {
                    console.log('接口返回状态码：' + res.status)
                    reject(res)
                }
            })
        } catch (err) {
            // return (e.message)
            alert('服务器出错')
            console.log(err)
        }
    },
}
export { api }
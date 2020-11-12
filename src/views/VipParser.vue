<template>
    <div style="text-align:center">
        </br>
        <label for="transfomer">vip电影: </label>
        <el-input
            style="width:500px;"
            placeholder="请输入电影名称或链接"
            v-model="input"
            type="text"
            clearable>
        </el-input></br></br>
        <el-button type="primary" @click="search">观看</el-button><br/></br>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    import {refresh_token} from '../../static/js/acs.js'
    export default {
        inject: ['reload'],
        
        data () {
            return {
                token: getCookie('lingxi-token'),
                username: getCookie('username'),
                input: ''
            }
        },
        methods: {
            search () {
                const base_url = 'https://jx.618g.com/?url='
                if (this.input.indexOf("http") === 0) {
                    window.open(base_url + this.input, '_blank')
                }else{
                    const url = `https://www.食.tech/entertainment/searchVipMovieUrl`
                    const params = {
                            'token': this.token,
                            'mv_name': this.input
                        }
                    axios.post(url, qs.stringify(params)).then(response => {
                        const con = response.data
                        const code = con.code

                        if (code === 402) {
                            console.log('token过期')
                            refresh_token(this.username, this.token)
                            sleep(1000)
                            this.search()
                            // this.reload()
                        }else if (code === 401) {
                            alert(con.message)
                        }else if (code === 200) {
                            window.open(base_url + con.url, '_blank')
                        }else {
                            alert('未搜索到')
                        }
                    })
                }
                

            }
        }

    }
</script>

<style>

</style>
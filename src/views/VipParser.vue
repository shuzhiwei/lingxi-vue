<template>
    <div style="text-align:center">
        </br>
        Movie Search
        </br>
        </br>
        <label for="transfomer"></label>
        <el-input
            style="width:200px;"
            placeholder="请输入电影名或播放链接"
            v-model="input"
            type="text"
            clearable>
        </el-input></br></br>
        <el-button type="primary" size="mini" @click="search">View</el-button>
        <el-button type="primary" size="mini" @click="search1">View1</el-button>
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

        mounted () {
            if (!this.token) {
                this.$router.push({path: '/login'})
            }
        },

        methods: {
            sleep (time) {
                var timeStamp = new Date().getTime();
                var endTime = timeStamp + time;
                while(true){
                    if (new Date().getTime() > endTime){
                        return;
                    } 
                }
            },

            search () {
                const base_url = 'https://jx.618g.com/?url='
                if (this.input.indexOf("http") === 0) {
                    window.open(base_url + this.input, '_blank')
                }else{
                    const url = this.$store.state.base_url + `/entertainment/searchVipMovieUrl`
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
                            this.reload()
                            this.token = getCookie('lingxi-token')
                            this.sleep(3000)
                            this.search()
                        }else if (code === 401) {
                            alert(con.message)
                        }else if (code === 200) {
                            if (con.url === '') {
                                this.$message.error('请精确搜索关键字')
                            }else{
                                window.open(base_url + con.url, '_blank')
                            }
                        }else {
                            alert('未搜索到')
                        }
                    })
                }
            },

            search1 () {
                const base_url = 'http://jx.0313555.com/?url='
                if (this.input.indexOf("http") === 0) {
                    window.open(base_url + this.input, '_blank')
                }else{
                    const url = this.$store.state.base_url + `/entertainment/searchVipMovieUrl`
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
                            this.reload()
                            this.token = getCookie('lingxi-token')
                            this.sleep(3000)
                            this.search()
                        }else if (code === 401) {
                            alert(con.message)
                        }else if (code === 200) {
                            if (con.url === '') {
                                this.$message.error('请精确搜索关键字')
                            }else{
                                window.open(base_url + con.url, '_blank')
                            }
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
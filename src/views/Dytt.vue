<template>
    <div style="text-align:center">
        </br>
        <label for="transfomer">Movie Name: </label>
        <el-input
            style="width:250px;"
            placeholder="请输入电影名称"
            v-model="input"
            type="text"
            clearable>
        </el-input>
        </br></br>
        <el-button type="primary" size="small" @click="search">Search1</el-button>
        <el-button type="primary" size="small" @click="search2">Search2</el-button><br/></br>
        <!-- <label for="transfomer">磁力链接: </label> -->
        <el-input
            v-model="input1"
            style="width:370px;"
            type="textarea"
            :rows=5
            clearable>
        </el-input>
        
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    import {getDateDiff} from '../../static/js/parse_time.js'
    import {refresh_token} from '../../static/js/acs.js'

    export default {
        inject: ['reload'],
        data () {
            return {
                token: getCookie('lingxi-token'),
                input: '',
                input1: ''
            }
        },

        mounted () {
            if (!this.token) {
                this.$router.push({path: '/login'})
            }
        },

        methods: {
            search () {
                const params = {
                    'token': this.token,
                    'name': this.input,
                }
                const url = `https://www.食.tech/entertainment/search`

                axios.post(url, qs.stringify(params)).then(response => {
                    const dict_con = response.data
                    const code = dict_con['code']
                    console.log(code)
                    if (code === 401) {
                        alert(dict_con['message'])
                        return
                    }
                    if (code === 200) {
                        this.input1 = dict_con['url']
                    }else if (code === 500) {
                        this.$message.error('无此电影磁力链接')
                        this.input1 = ''
                    }else if (code === 402) {
                        const username = getCookie('username')
                        refresh_token(username, this.token)
                        var name_tmp = this.name
                        this.reload()
                        this.input = name_tmp
                        this.search()
                    }else{
                        this.$message.error('无此电影磁力链接')
                        this.input1 = ''
                    }
                })
            },

            search2 () {
                const params = {
                    'token': this.token,
                    'name': this.input,
                }
                const url = `https://www.食.tech/entertainment/searchOnSelf`

                axios.post(url, qs.stringify(params)).then(response => {
                    const dict_con = response.data
                    const code = dict_con['code']
                    console.log(code)
                    if (code === 401) {
                        alert(dict_con['message'])
                        return
                    }
                    if (code === 200) {
                        this.input1 = dict_con['url']
                    }else if (code === 500) {
                        this.$message.error('无此电影磁力链接')
                        this.input1 = ''
                    }else if (code === 402) {
                        const username = getCookie('username')
                        refresh_token(username, this.token)
                        var name_tmp = this.name
                        this.reload()
                        this.input = name_tmp
                        this.search()
                    }else{
                        this.$message.error('无此电影磁力链接')
                        this.input1 = ''
                    }
                })
            },
        }

    }
</script>

<style>

</style>
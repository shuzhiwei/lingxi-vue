<template>
    <div>
        <table width="100%" cellpadding="2" cellspacing="0" style="table-layout: fixed;margin:0.3rem auto">
            <tr>
                <td width="10%">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <!-- <td>&nbsp;&nbsp;&nbsp;&nbsp;</td> -->
                <td width="80%">
                    <h1 align="center">{{title}}</h1>
                </td>
                <td width="10%">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <!-- <td>&nbsp;&nbsp;&nbsp;&nbsp;</td> -->
            </tr>

            <tr>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td>
                    <div align="center">{{dateStr}}</div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>

            <tr>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td>
                    <div style="white-space:pre-wrap;" v-html="content"></div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>

            <tr>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td>
                    <div v-if="imageAddr" align="center">
                        <div>
                            <img style="height:15rem;" :src="imageAddr" alt="logo" :onerror="defaultImg">
                            <div>
                            <el-button
                            type="success"
                            size="mini"
                            @click="editBlog()"
                            icon="el-icon-edit"
                            >编辑</el-button>
                
                            <el-button 
                            type="danger" 
                            size="mini" 
                            icon="el-icon-delete" 
                            @click="deleteBlog()"
                            >删除</el-button>
                        </div>
                        </div>
                    </div>
                    <div v-else align="center">
                        <div v-for="(item, index) in imageAddrs" :key="index">
                            <img style="height:25rem;" :src="item">
                        </div>
                        <div>
                            <el-button
                            type="success"
                            size="mini"
                            @click="editBlog()"
                            icon="el-icon-edit"
                            >编辑</el-button>
                
                            <el-button 
                            type="danger" 
                            size="mini" 
                            icon="el-icon-delete" 
                            @click="deleteBlog()"
                            >删除</el-button>
                        </div>
                    </div>
                    
                </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>

            </tr>


        </table>


        <!-- <h1 align="center">{{title}}</h1>
        <div align="center">{{dateStr}}</div>
        <br/>
        <div style="white-space:pre-wrap;" v-html="content"></div>
        <br/>
        <div v-if="imageAddr" align="center">
            <img style="height:400px;weight:400px;" :src="imageAddr" alt="logo" :onerror="defaultImg">
        </div>
        <div v-else align="center">
        <span v-for="(item, index) in imageAddrs" :key="index">
            <img style="height:500px;weight:400px;" :src="item" alt=""  :onerror="defaultImg">
        </span>
        </div> -->
    </div>
</template>

<script>
    import {getDateDiff} from '../../static/js/parse_time.js'
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    import {refresh_token} from '../../static/js/acs.js'
    import axios from 'axios'
    import qs from 'qs'
    export default {
        inject: ['reload'],
        data () {
            return {
                token: getCookie('lingxi-token'),
                id: '',
                title: '',
                username: '',
                content: '',
                imageAddr: '',
                imageAddrs: [],
                dateStr: '',
                defaultImg: 'this.src="' + require('../../static/img/default.png') + '"',
            }
        },

        mounted () {
            const id = this.$route.params.id
            this.id = id
            const token = getCookie('lingxi-token')
            const url = this.$store.state.base_url + `/lingxis/view/${id}?token=${token}`
            axios.get(url).then(response =>{
                let res = response.data
                let code = res.code
                console.log(code)
                if (code === 402) {
                    const username = getCookie('username')
                    refresh_token(username, token)
                    this.reload()
                    return
                }
                if (code === 401) {
                    this.$message.error('无acs权限！')
                    return
                }
                if (code === 200) {
                    this.title = res.data.title
                    this.username = res.data.author
                    this.content = res.data.content
                    this.dateStr = getDateDiff(res.data.posted_on * 1000)
                    let tmp = res.data.imageAddr
                    if (! tmp) {
                        return
                    }
                    if (tmp.indexOf('helloworld') != -1) {
                        this.imageAddrs = res.data.imageAddr.split('helloworld')
                    }else{
                        this.imageAddr = res.data.imageAddr
                    }
                }
            })
        },

        methods: {
            editBlog () {
                if (!this.id) {
                    this.$message.error('id为空')
                }else if (this.username !== getCookie('username')) {
                    console.log('this.username: ' + this.username)
                    console.log('getCookie: ' + getCookie('username'))
                    this.$message.success('不是您的博客哦！')
                }else{
                    this.$router.push({path: "/main/edit/" + this.id})
                }
            },

            deleteBlog () {
                const token = getCookie('lingxi-token')
                console.log('id: ' + this.id)
                if (!this.id) {
                    this.$message.error('id为空')
                }else if (this.username !== getCookie('username')) {
                    this.$message.success('不是您的博客哦！')
                }else {
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        console.log('hello123')
                        const url = this.$store.state.base_url + '/lingxis/blog/delete'
                        const params = {
                            'token': token,
                            "ids": this.id + ','
                        }
                        console.log(url)
                        console.log(params)
                        axios.post(url, qs.stringify(params)).then(res => {
                            const code = res.data.code
                            console.log('res.data: ' + res.data)
                            if (code === 402) {
                                refresh_token(getCookie('username'), token)
                                //this.reload()
                            }else if (code === 200) {
                                this.$message.success('删除成功')
                                this.$router.push({path: '/main/home'})
                                this.reload()
                            }else{
                                this.$message.error(code)
                            }

                        }).catch(error => {
                            console.log(error)
                        })
                    }).catch(() =>{
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
                }
            },
        }

    }
</script>

<style>

</style>
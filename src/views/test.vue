<template>
<div style="background:white">
    <div style="text-align:center">
        <h2>灵犀博客</h2>
        <br>
        <table style="margin:auto">
            <tr>
                <td  colspan="5" style="text-align:left">
                    <span style="color:red; font-size=25;">
                        <button style="width:40px;height:25px;background-color:#2f435e;color:#f2f2f2;font-weight:bold;" @click="addBlog">添加</button>
                    </span>&nbsp&nbsp&nbsp&nbsp
                    <span style="color:red; font-size=60px;">
                        <button style="width:40px;height:25px;background-color:red;color:#f2f2f2;font-weight:bold;" @click="editBlog">修改</button>
                    </span>&nbsp&nbsp&nbsp&nbsp
                    <span style="color:red; font-size=20px;">
                        <button style="width:40px;height:25px;background-color:red;color:#f2f2f2;font-weight:bold;" @click="deleteBlog">删除</button>
                    </span>
                </td>
            </tr>
            <tr>
                <td colspan="5">&nbsp&nbsp&nbsp&nbsp</td>
            </tr>
            <tr name="" v-for="(item, index) in datas" :key="index" style="font-size: 20px;">
                <td><input ref="inputTitle" type="checkbox" :value="item.id"></input></td>
                <td style="text-align:left;"><router-link :to="`/main/detail/${item.id}`"><font color="green">{{item.title}}</font></router-link></td>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>{{item.date}}</td>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
            </tr>
        </table>
    </div>
    <div class="block"  style="text-align:center">
        <el-pagination
            v-if="paginationShow"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNo"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="totalCount">
        </el-pagination>
    </div>
</div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    import {getDateDiff} from '../../static/js/parse_time.js'
    import {refresh_token} from '../../static/js/acs.js'
    import PubSub from 'pubsub-js'
    export default {
        inject: ['reload'],

        data () {
            return {
                datas: [],
                token: getCookie('lingxi-token'),
                pageSize: 10,//默认的请求pageSize = 15
                pageNo: 1,//当前页码
                totalPage: 0,//总页数
                paginationShow: false,//是否显示分页
                totalCount: 0,//总条数
            }
        },

        mounted () {
            const token = this.token
            const url = `https://www.食.tech/lingxis/view/all`
            const params = {
                    'token': this.token,
                    'pageSize': this.pageSize,
                    'pageNo': this.pageNo
                }
            axios.post(url, qs.stringify(params)).then(response => {
                const con = response.data
                console.log(con)
                const code = con.code
                if (code === 402) {
                    const username = getCookie('username')
                    refresh_token(username, token)
                    this.reload()
                    return
                }
                if (code === 401) {
                    alert(con.message)
                    return
                }
                this.totalPage = con.totalPage
                this.totalCount = con.totalCount
                const res = con.data
                for (let i=0; i<res.length; i++) {
                    let title = res[i].title
                    let content = res[i].content
                    let posted_on = res[i].posted_on
                    let date_d = getDateDiff(posted_on * 1000)
                    let data = {
                        'id': res[i].id,
                        'title': title,
                        'content': content,
                        'date': date_d
                    }
                    this.datas.push(data)
                }
                if (this.totalPage > 1) {
                    this.paginationShow = true
                }
            }).catch(error => {
                console.log(error)
                alert(error)
            })

            
        },

        methods: {
            //改变每页显示数量时调用
            handleSizeChange(val) {
                this.$nextTick(() =>
                    this.getPageData(),
                )
            },
            //点击下一页和点击页码时执行
            handleCurrentChange(val) {
                this.getPageData();
            },
            //获取分页数据totalDataNumber
            getPageData: function () {
                const url = "https://www.食.tech/lingxis/view/all"
                const params = {
                    'token': this.token,
                    'pageSize': this.pageSize,
                    'pageNo': this.pageNo
                }
                axios.post(url, qs.stringify(params)).then(response =>{
                    const con = response.data
                    const code = con.code
                    if (code === 402) {
                        const username = getCookie('username')
                        refresh_token(username, token)
                        this.reload()
                        return
                    }
                    if (code === 401) {
                        alert(con.message)
                        return
                    }
                    const res = con.data
                    this.datas = []
                    for (let i=0; i<res.length; i++) {
                        let title = res[i].title
                        let content = res[i].content
                        let posted_on = res[i].posted_on
                        let date_d = getDateDiff(posted_on * 1000)
                        let data = {
                            'id': res[i].id,
                            'title': title,
                            'content': content,
                            'date': date_d
                        }
                        this.datas.push(data)
                    }
                }).catch(error => {
                    console.log(error)
                    alert(error)

                })
            },

            addBlog () {
                this.$router.push({path: '/main/add'})
            },

            editBlog () {
                var aa = this.$refs.inputTitle
                var checkboxValues = []
                for (let i=0; i<aa.length; i++) {
                    if (aa[i].checked) {
                        checkboxValues.push(aa[i].value)
                    }
                }
                if (checkboxValues.length === 1) {
                    PubSub.publish('blogId', checkboxValues[0])
                    this.$router.push({path: "/main/edit/" + checkboxValues[0]})
                }else if (checkboxValues.length >= 1) {
                    alert('不能修改多条！')
                }else{
                    alert('不能修改0条！')
                }
            },

            deleteBlog () {
                if (confirm('确定删除吗？') === true) {
                    var aa = this.$refs.inputTitle
                    var checkboxValues = ''
                    for (let i=0; i<aa.length; i++) {
                        if (aa[i].checked) {
                            checkboxValues = checkboxValues + aa[i].value + ','
                        }
                    }
                    if (!checkboxValues) {
                        alert('不能删除0条！')
                    }else{
                        const url = `https://www.食.tech/lingxis/blog/delete`
                        const params = {
                            "token": this.token,
                            "ids": checkboxValues
                        }
                        axios.post(url, qs.stringify(params)).then(response => {
                            let res = response.data
                            if (res.code === 200) {
                                this.reload()
                            }else{
                                alert(res.code)
                            }
                        })
                    }
                }
            }
        }
    }
</script>

<style>
    .ul {
        display: inline-block;
    }
    .li {
        text-align: left;
        font-size: 20px;
    }
    .a_title {
        color: green;
    }
    .edit {
        color: red
    }
</style>
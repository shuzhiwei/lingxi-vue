<template>
    <div style="text-align:center">
        <h2>AuthManage</h2>
        <br>
        <table style="margin:auto">
            <tr>
                <td  colspan="5" style="text-align:left">
                    <span style="color:red; font-size=25;">
                        <button style="width:40px;height:25px;background-color:#2f435e;color:#f2f2f2;font-weight:bold;" @click="addAuth">添加</button>
                    </span>&nbsp&nbsp&nbsp&nbsp
                    <span style="color:red; font-size=20px;">
                        <button style="width:40px;height:25px;background-color:red;color:#f2f2f2;font-weight:bold;" @click="deleteAuth">删除</button>
                    </span>
                </td>
            </tr>
            <tr>
                <td colspan="5">&nbsp&nbsp&nbsp&nbsp</td>
            </tr>
            <tr name="" v-for="(item, index) in datas" :key="item.id" style="font-size: 20px;">
                <td><input ref="inputTitle" type="checkbox" :value="item.id"></input></td>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>{{item.p_type}}</td>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>{{item.v0}}</td>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>{{item.v1}}</td>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>{{item.v2}}</td>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>{{item.v3}}</td>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    import {refresh_token} from '../../static/js/acs.js'
    import PubSub from 'pubsub-js'
    export default {
        inject: ['reload'],
        data () {
            return {
                datas: [],
                token: getCookie('lingxi-token')
            }
        },

        mounted () {
            const token = this.token
            const url = `https://www.食.tech/acs-manage/policy/show`
            const params = {
                'token': token
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
                const res = con.data
                for (let i=0; i<res.length; i++) {
                    let data = {
                        'id': res[i].id,
                        'p_type': res[i].p_type,
                        'v0': res[i].v0,
                        'v1': res[i].v1,
                        'v2': res[i].v2,
                        'v3': res[i].v3
                    }
                    this.datas.push(data)
                }
            }).catch(error => {
                console.log(error)
                alert(error)
            })

            
        },

        methods: {
            addAuth () {
                this.$router.push({path: '/main/addAuth'})
            },

            deleteAuth () {
                if (confirm('确定删除吗？') === true) {
                    var aa = this.$refs.inputTitle
                    var checkboxValues = ''
                    for (let i=0; i<aa.length; i++) {
                        if (aa[i].checked) {
                            checkboxValues = checkboxValues + aa[i].value + ','
                            // checkboxValues.push(aa[i].value)
                        }
                    }
                    if (!checkboxValues) {
                        alert('不能删除0条！')
                    }else{
                        const url = `https://www.食.tech/acs-manage/policy/delete`
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

</style>
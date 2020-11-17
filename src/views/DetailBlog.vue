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
                        </div>
                    </div>
                    <div v-else align="center">
                        <div v-for="(item, index) in imageAddrs" :key="index">
                            <img style="height:25rem;" :src="item" alt="logo"  :onerror="defaultImg">
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
    export default {
        inject: ['reload'],
        data () {
            return {
                title: '',
                content: '',
                imageAddr: '',
                imageAddrs: [],
                dateStr: '',
                defaultImg: 'this.src="' + require('../../static/img/default.png') + '"',
            }
        },

        mounted () {
            const id = this.$route.params.id
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
                    this.content = res.data.content
                    let tmp = res.data.imageAddr
                    if (! tmp) {
                        return
                    }
                    if (tmp.indexOf('helloworld') != -1) {
                        this.imageAddrs = res.data.imageAddr.split('helloworld')
                    }else{
                        this.imageAddr = res.data.imageAddr
                    }
                    
                    this.dateStr = getDateDiff(res.data.posted_on * 1000)
                }
                console.log(this.imageAddr)
            })
        }

    }
</script>

<style>

</style>
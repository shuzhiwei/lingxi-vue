<template>
    <div>
        <h1 align="center">{{title}}</h1>
        {{dateStr}}
        <br/>
        {{content}}
        <br/>
        <div v-if="imageAddr">
            <img  :src="imageAddr" alt="logo" :onerror="defaultImg">
        </div>
        <div v-else>
        <div v-for="(item, index) in imageAddrs" :key="index">
            <img :src="item" alt=""  :onerror="defaultImg">
        </div>
        </div>
    </div>
</template>

<script>
    import {getDateDiff} from '../../static/js/parse_time.js'
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    import axios from 'axios'
    export default {
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
            const url = `https://www.食.tech/lingxis/view/${id}?token=${token}`
            axios.get(url).then(response =>{
                let res = response.data
                let code = res.code
                console.log(code)
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
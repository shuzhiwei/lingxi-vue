<template>
    <div>
        <table>
        <tr><th><label for="p_type">p_type:</label></th><td><input id="p_type" name="p_type" size="30" type="text" v-model="p_type"/></td></tr>
        <tr><th><label for="v0">v0:</label></th><td><input id="v0" name="v0" size="30" type="text" v-model="v0"/></td></tr>
        <tr><th><label for="v1">v1:</label></th><td><input id="v1" name="v1" size="30" type="text" v-model="v1"/></td></tr>
        <tr><th><label for="v2">v2:</label></th><td><input id="v2" name="v2" size="30" type="text" v-model="v2"/></td></tr>
        <tr><th><label for="v3">v3:</label></th><td><input id="v3" name="v3" size="30" type="text" v-model="v3"/></td></tr>
        <tr><th><label for="Post entry"></label></th><td><button id="Post entry" name="Post entry" value="" @click="addAuth">commit</button></td></tr>
    </table>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    export default {
        data () {
            return {
                p_type: '',
                v0: '',
                v1: '',
                v2: '',
                v3: '',
            }
        },

        methods: {
            addAuth () {
                let token = getCookie('lingxi-token')
                let url = `https://www.食.tech/acs-manage/policy/add`
                const params = {
                    'token': token,
                    'p_type': this.p_type,
                    'v0': this.v0,
                    'v1': this.v1,
                    'v2': this.v2,
                    'v3': this.v3
                }
                axios.post(url, qs.stringify(params)).then(response =>{
                    let res = response.data
                    let code = res.code
                    console.log(code)
                    this.$router.push({path: '/main/authManage'})
                })
            }
        }
    }
</script>

<style>

</style>
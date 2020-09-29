<template>
    <div>
        <table>
        <tr><th><label for="title">Post title:</label></th><td><input id="title" name="title" size="30" type="text" v-model="title"/></td></tr>
        <tr><th><label for="content">Post content:</label></th><td><textarea cols="80" id="content" name="content" rows="10" v-model="content"></textarea></td></tr>
        <tr><th><label for="content">当前图片:</label></th><td>
            
        <div v-if="imageAddr">
            <img  :src="imageAddr" alt="logo" :onerror="defaultImg">
        </div>
        <div v-else>
        <div v-for="(item, index) in imageAddrs" :key="index">
            <img :src="item" alt=""  :onerror="defaultImg">
        </div>
        </div>

            </td></tr>
        <tr><th><label for="content">是否删除当前图片:</label></th><td>
            <div>
                <input style="display:none;" id="hidebrowser" type="radio" name="photo" value="">
                <input type="radio"  name="photo" value="1" v-model="radioFlag">是
                <input type="radio"  name="photo" value="0" v-model="radioFlag">否
            </div>
        </td></tr>
        <tr><th><label for="addOther">添加照片</label></th><td><input id="addOther" name="addOther" type="file" ref="addOther" value="" @change="selectImage"/></td></tr>
        <tr><th><label for="Post entry"></label></th><td><button id="Post entry" name="Post entry" value="" @click="postEntry">Post entry</button></td></tr>
    </table>
    </div>
</template>

<script>
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    import axios from 'axios'
    import qs from 'qs'
    export default {
        data () {
            return {
                title: '',
                content: '',
                imageAddr: '',
                radioFlag: '0',
                image: '',
                imageAddrs: [],
                defaultImg: 'this.src="' + require('../../static/img/default.png') + '"',
            }
        },

        mounted () {
            let id = this.$route.params.id
            console.log(id)
            let token = getCookie('lingxi-token')
            let url = `https://www.食.tech/lingxis/view/${id}?token=${token}`
            axios.get(url).then(response =>{
                let res = response.data
                let code = res.code
                console.log(code)
                if (code === 200) {
                    this.title = res.data.title
                    this.content = res.data.content

                    this.title = res.data.title
                    this.content = res.data.content
                    var tmp = res.data.imageAddr
                    console.log(tmp.indexOf('helloworld'))
                    var aa_url = res.data.imageAddr.split('helloworld')
                    console.log('aa_url: ' + aa_url)
                    if (tmp.indexOf('helloworld') !== -1) {
                        console.log('hello')
                        console.log(aa_url)
                        for (let i=0; i<aa_url.length; i++){
                            console.log(aa_url[i])
                            this.imageAddrs.push(aa_url[i])
                        }
                        this.imageAddrs.pop()
                    }else{
                        this.imageAddr = res.data.imageAddr
                        console.log('iamgesAddr: ' + this.imageAddr)
                    }
                    
                }
            })
        },

        methods: {
            selectImage () {
                var file = this.$refs.addOther.files[0]
                var reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onload = ()=>{
                    this.image = reader.result
                }
            },
            postEntry () {
                const token = getCookie('lingxi-token')
                const id = this.$route.params.id
                const url = `https://www.食.tech/lingxis/blog/edit/${id}`
                const params = {
                    'token': token,
                    'title': this.title,
                    'content': this.content,
                    'imageAddr': this.imageAddr,
                    'radioFlag': this.radioFlag,
                    'image': this.image
                }
                axios.post(url, qs.stringify(params)).then(response => {
                    const res = response.data
                    if (res.code === 200) {
                        this.$router.push({path: '/main/home'})
                        // 解决跳转页面后不刷新数据的问题
                        this.$router.go(0)
                    }else{
                        alert(res.code)
                    }
                }).catch(error =>{
                    alert(error)
                })
            }
        }
    }
</script>

<style>

</style>
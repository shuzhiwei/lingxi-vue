<template>
    <div>
        <table>
        <tr><th><label for="title">title:</label></th><td><input id="title" name="title" size="30" type="text" v-model="title"/></td></tr>
        <tr><th><label for="content">content:</label></th><td><textarea cols="80" id="content" name="content" rows="30" v-model="content"></textarea></td></tr>
        <tr><th><label for="addOther">添加照片</label></th><td><input id="addOther" name="addOther" type="file" ref="file" value="" @change="selectImage"/></td></tr>
        <tr><th><label for="Post entry"></label></th><td><button id="Post entry" name="Post entry" value="" @click="addBlog">commit</button></td></tr>
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
                title: '',
                content: '',
                image: '',
            }
        },

        methods: {
            selectImage () {
                var file = this.$refs.file.files[0]
                var reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onload = ()=>{
                    this.image = reader.result
                }
            },
            addBlog () {
                let token = getCookie('lingxi-token')
                let url = `https://www.食.tech/lingxis/blog/add`
                const params = {
                    'token': token,
                    'title': this.title,
                    'content': this.content,
                    'image': this.image
                }
                axios.post(url, qs.stringify(params)).then(response =>{
                    const res = response.data
                    console.log(res)
                    const code = res.code
                    if (code !== 200) {
                        alert(code)
                        return
                    }
                    this.$router.push({path: '/main/home'})
                })
            }
        }
    }
</script>

<style>

</style>
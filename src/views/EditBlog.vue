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
        <tr><th><label for="content">删除当前所有图片:</label></th><td>
            <div>
                <input style="display:none;" id="hidebrowser" type="radio" name="photo" value="">
                <input type="radio"  name="photo" value="1" v-model="radioFlag">是
                <input type="radio"  name="photo" value="0" v-model="radioFlag">否
            </div>
        </td></tr>
        <tr><th><label for="addOther">更换图片</label></th>
            <td>
                <!-- <input id="addOther" name="addOther" type="file" ref="addOther" value="" @change="selectImage"/> -->

                <el-upload
                action="#"
                list-type="picture-card"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="changeFileList"
                :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>

            </td>
        </tr>
        <tr><th><label for="Post entry"></label></th>
            <td>
                <br>
                <!-- <button id="Post entry" name="Post entry" value="" @click="postEntry">Post entry</button> -->
                <el-button type="info" @click="postCancel">取 消</el-button>
                <el-button type="primary" @click="postEntry">提 交</el-button>
            </td>
        </tr>
    </table>
    <br><br>
    </div>
</template>

<script>
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    import {refresh_token} from '../../static/js/acs.js'
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

                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [],
                form: {
                    images: ''
                }
            }
        },

        mounted () {
            let id = this.$route.params.id
            let token = getCookie('lingxi-token')
            let url = `https://www.食.tech/lingxis/view/${id}?token=${token}`
            axios.get(url).then(response =>{
                const res = response.data
                const code = res.code
                console.log(code)

                if (code === 402) {
                    const username = getCookie('username')
                    refresh_token(username, token)
                    this.reload()
                }else if (code === 200) {
                    this.title = res.data.title
                    this.content = res.data.content
                    var tmp = res.data.imageAddr
                    var aa_url = res.data.imageAddr.split('helloworld')
                    if (tmp.indexOf('helloworld') !== -1) {
                        for (let i=0; i<aa_url.length; i++){
                            this.imageAddrs.push(aa_url[i])
                        }
                        this.imageAddrs.pop()
                    }else{
                        this.imageAddr = res.data.imageAddr
                    }
                }else{
                    alert(code)
                }
            })
        },

        methods: {
            postCancel () {
                this.$router.push({path: '/main/home'})
            },

            changeFileList (file) {
                console.log(file.raw)
                var reader = new FileReader();
                reader.readAsDataURL(file.raw)
                reader.onload = ()=>{
                    var image = reader.result
                    this.form.images = this.form.images + image + 'helloworld'
                    // console.log('iamge: ' + image)
                }
            },

            // 处理图片预览效果
            handlePictureCardPreview(file) {
                console.log(file.url)
                console.log(file.name)
            this.dialogImageUrl = file.url
            this.dialogVisible = true
            },

            // 处理移除图片的操作
            handleRemove(file) {
                console.log(file.raw)
                var reader = new FileReader();
                var deleteImage = ''
                reader.readAsDataURL(file.raw)
                reader.onload = ()=>{
                    deleteImage = reader.result
                    console.log('deleteImage: ' + deleteImage)
                }
                const images = this.form.images.slice(0,this.form.images.length-10).split('helloworld')
                for (let i=0; i<images.length; i++) {
                    if (deleteImage == images[i]) {
                        
                        if (i === 0) {
                            images.shift()
                            break
                        }else if (i === images.length-1) {
                            images.pop()
                            break
                        }else{
                            images.splice(i, 1)
                            break
                        }
                    }
                }
                this.form.images = ''
                for (let i=0; i<images.length; i++) {
                    this.form.images = this.form.images + images[i] + 'helloworld'
                }
                console.log('has delete: ' + this.form.images)
            },

            // selectImage () {
            //     var file = this.$refs.addOther.files[0]
            //     var reader = new FileReader();
            //     reader.readAsDataURL(file)
            //     reader.onload = ()=>{
            //         this.image = reader.result
            //     }
            // },
            postEntry () {
                console.log('hello123')
                const token = getCookie('lingxi-token')
                const id = this.$route.params.id
                const url = `https://www.食.tech/lingxis/blog/edit/${id}`
                var cur_images = ''
                for (let i=0; i<this.imageAddrs.length; i++) {
                    cur_images = cur_images + this.imageAddrs[i] + 'helloworld'
                }
                const params = {
                    'token': token,
                    'title': this.title,
                    'content': this.content,
                    'imageAddr': cur_images,
                    'radioFlag': this.radioFlag,
                    'image': this.form.images
                }
                console.log(params)
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
<template>
    <div align="center">
        <table align="center">
        <tr><th><label for="title">标题：</label></th><td>
            <el-input
                placeholder="请输入内容"
                v-model="title"
                clearable>
            </el-input>
        </td></tr>
        <tr><th><label for="content">内容：</label></th><td>
            <el-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 20}"
                placeholder="请输入内容"
                v-model="content">
            </el-input>
        </td></tr>
        
        <tr><th><label for="content">图片：</label></th><td>
            
        <div v-if="imageAddr">
            <div class="img-box">
            <img class="myimage" :src="imageAddr" alt="logo" :onerror="defaultImg">
            <div class="del-icon" @click="deleteCurPhoto(index)"></div>
            </div>
        </div>
        <div v-else>
        <span v-for="(item, index) in imageAddrs" :key="index">
            <div class="img-box">
            <img class="myimage" :src="item" alt=""  :onerror="defaultImg">
            <div class="del-icon" @click="deleteCurPhoto(index)"></div>
            </div>
        </span>
        </div>
            </td></tr>

        <tr><th><label for="content">分享：</label></th>
        <td>
            <el-radio style="margin-left: 10px" v-model="form.radio" :label="1">公开</el-radio>
            <el-radio v-model="form.radio" :label="0">不公开</el-radio>
        </td></tr>

        <br>
        <tr><th><label for="addOther">添加：</label></th>
            <td>
                <span align="left">
                <el-button type="primary" v-on:click="openFile()" round>选择照片</el-button>
                <input type="file" id="filename" style="display:none" multiple="multiple" @change="showRealPath"/>
                </span>
                <br>

                <span v-for="(item, index) in form.images1" :key="index">
                    <!-- <img style="height:100px;weight:100px;" :src="item.image" alt=""> -->

                        <div class="img-box">
                        <img class="myimage" :src="item.image" alt="">
                        <div class="del-icon" @click="deletePrePhoto(index)"></div>
                    </div>

                </span>
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
    import {api} from '../../static/js/api.js'
    export default {
        inject: ['reload'],
        data () {
            return {
                title: '',
                content: '',
                imageAddr: '',
                // radioFlag: '0',
                image: '',
                imageAddrs: [],
                delImageAddrs: [],
                defaultImg: 'this.src="' + require('../../static/img/default.png') + '"',

                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [],
                form: {
                    images1: [],
                    radio: 0,
                }
            }
        },

        mounted () {
            let id = this.$route.params.id
            let token = getCookie('lingxi-token')
            let url = this.$store.state.base_url + `/lingxis/view/${id}?token=${token}`
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
                    this.form.radio = res.data.share_flag
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
                    console.log(code)
                    this.$message.error('无acs权限！')
                }
            })
        },

        methods: {

            deleteCurPhoto(index) {
                this.delImageAddrs.push(this.imageAddrs[index])
                this.imageAddrs.splice(index, 1)
            },

            deletePrePhoto (index) {
                this.form.images1.splice(index, 1)
            },

            openFile: function () {
                document.getElementById('filename').click()
            },
            showRealPath: function () {
                var files = document.getElementById('filename').files
                
                for (let i = 0; i < files.length; i++) {
                    let name = files[i].name
                    let reader = new FileReader();
                    reader.readAsDataURL(files[i])
                    reader.onload = ()=>{
                        var image = reader.result
                        this.form.images1.push({'name': name, 'image': image})
                    }
                }
            },

            postCancel () {
                this.$router.push({path: '/main/home'})
            },

            async postEntry () {
                // 点击即呈现新建中
                // this.form.newCreating = true
                const load = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                console.log('hello123')
                const token = getCookie('lingxi-token')
                const id = this.$route.params.id
                const url = this.$store.state.base_url + `/lingxis/blog/edit/${id}`
                const url1 = this.$store.state.base_url + `/lingxis/blog/editAddPhoto/${id}`
                var cur_images = ''
                for (let i=0; i<this.imageAddrs.length; i++) {
                    cur_images = cur_images + this.imageAddrs[i] + 'helloworld'
                }

                var del_images = ''
                for (let i=0; i<this.delImageAddrs.length; i++) {
                    del_images = del_images + this.delImageAddrs[i] + 'helloworld'
                }

                const params = {
                    'token': token,
                    'title': this.title,
                    'content': this.content,
                    'share_flag': this.form.radio,
                    'curImageAddrs': cur_images,
                    'delImageAddrs': del_images,
                }
                console.log('url: ' + url)
                
                var res = await api.post(url, params)
                console.log('aaaa')
                if (res.code === 402) {
                    refresh_token(this.username, token)
                    this.postEntry()
                    return
                }
                var newImages = ''
                for (let i=0; i<this.form.images1.length; i++) {
                    newImages = newImages + this.form.images1[i].image + 'helloworld'
                    if (newImages.length > 1024*1024*5) {
                        console.log(i)
                        var params1 = {
                            'token': token,
                            'image': newImages
                        }
                        console.log(params1)
                        res = await api.post(url1, params1)
                        newImages = ''
                    }
                }
                if (newImages) {
                    var params2 = {
                        'token': token,
                        'image': newImages
                    }
                    console.log(params2)
                    await api.post(url1, params2)
                }
                load.close()
                this.$router.push({path: '/main/detail/' + id})
                this.reload()
            }
        }
    }
</script>

<style>
.img-box {
            margin: 10px;
            display: inline-block;
            position: relative;
        }

        .myimage {
            width: 80px;
            height: 80px;
        }

        .del-icon {
            position: absolute;
            width: 15px;
            height: 15px;
            border: 1px solid red;
            border-radius: 50%;
            top: -13px;
            right: -15px;
            transform: rotate(45deg);

        }

        .del-icon::before {
            display: block;
            position: absolute;
            content: "";
            width: 10px;
            height: 2px;
            background-color: red;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);

        }

        .del-icon::after {
            display: block;
            position: absolute;
            content: "";
            width: 2px;
            height: 10px;
            background-color: red;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);

        }
</style>
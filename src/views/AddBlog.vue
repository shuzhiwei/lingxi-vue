<template>
    <div>
        <table>
        <tr><th><label for="title">标题:</label></th><td><input id="title" name="title" size="30" type="text" v-model="title"/></td></tr>
        <tr><th><label for="content">内容:</label></th><td><textarea cols="40" id="content" name="content" rows="20" v-model="content"></textarea></td></tr>
        

        <tr><th><label for="content">是否公开:</label></th>
        <td>
            <el-radio style="margin-left: 10px" v-model="form.radio" :label="1">公开</el-radio>
            <el-radio v-model="form.radio" :label="0">不公开</el-radio>
        </td></tr>

        <br>
        <tr><th><label for="addOther">添加图片</label></th>
            <td>
                <span align="left">
                <el-button type="primary" v-on:click="openFile()" round>选择文件</el-button>
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
                <el-button type="info" @click="postCancel">取 消</el-button>
                <el-button type="primary" @click="selectFile">提 交</el-button>
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
        inject: ['reload'],
        data () {
            return {
                token: getCookie('lingxi-token'),
                username: getCookie('username'),
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

            // 新建Blog
            selectFile () {
                // 点击即呈现新建中
                // this.form.newCreating = true
                const load = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                const url = this.$store.state.base_url + '/lingxis/blog/addManyPhoto'

                var params0 = {
                    'token': this.token,
                    'title': this.title,
                    'content': this.content,
                    'author': this.username,
                    'share_flag': this.form.radio,
                }
                axios.post(url, qs.stringify(params0)).then(response => {
                    var res0 = response.data
                    console.log(res0)
                    var code = res0.code
                    if (code === 402) {
                        // load.close();
                        console.log('token 过期')
                        refresh_token(this.username, this.token)
                        this.token = getCookie('lingxi-token')
                        this.selectFile()
                        return

                    }else if (code === 200) {
                        let post_id = res0.id
                        console.log(code)
                        const url1 = this.$store.state.base_url + `/lingxis/blog/editAddPhoto/${post_id}`


                        var tmp_images = ''
                        console.log(this.form.images1.length)
                        for (let i=0; i<this.form.images1.length; i++) {
                            tmp_images = tmp_images + this.form.images1[i].image + 'helloworld'
                            if (tmp_images.length > 1024*1024*10) {
                                var params1 = {
                                    'token': this.token,
                                    'image': tmp_images,
                                }
                                axios.post(url1, qs.stringify(params1)).then(response => {
                                    let res = response.data
                                    console.log(res)
                                    let code = res.code
                                    if (code === 402) {
                                        refresh_token(this.username, this.token)
                                        this.token = getCookie('lingxi-token')

                                    }else if (code === 200) {
                                        console.log(code)
                                    }else{
                                        this.$message.error(code)
                                    }
                                })
                                tmp_images = ''
                            }
                        }
                        var params2 = {
                            'token': this.token,
                            'image': tmp_images,
                        }
                        axios.post(url1, qs.stringify(params2)).then(response => {
                            let res = response.data
                            let code = res.code
                            if (code === 402) {
                                refresh_token(this.username, this.token)
                                this.token = getCookie('lingxi-token')
                                load.close();

                            }else if (code === 200) {
                                console.log(code)
                                load.close();
                                this.$message.success('新建成功')
                                this.$router.push({path: '/main/home'})
                                // 解决跳转页面后不刷新数据的问题
                                this.$router.go(0)
                            }else{
                                load.close();
                                this.$message.error(code)
                            }
                        })
                    }else{
                        load.close();
                        this.$message.error('内部错误')
                    }
                })
                
                // load.close();
                // this.$message.success('新建成功')
                // this.$router.push({path: '/main/home'})
                // // 解决跳转页面后不刷新数据的问题
                // this.$router.go(0)
                
            },
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
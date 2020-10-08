<template>
<div>
    <div>
        <!-- <div style="text-align:center"> -->
        <div>
        <!-- <h2>灵犀博客</h2> -->
        <br>

<!-- Form -->
<!-- <el-button type="text" @click="dialogFormVisible = true">新建</el-button> -->
<el-button
        @click="dialogFormVisible = true"
        icon="el-icon-plus"
        type="success"
        style="margin-bottom:10px;margin-left: 30px;"
        size="mini"
      >新建博客</el-button>

<el-dialog title="新建博客" :visible.sync="dialogFormVisible">

  <el-form :model="form">
    <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="form.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="内容" :label-width="formLabelWidth">
      <el-input type="textarea" :rows="5" v-model="form.content" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="是否公开" :label-width="formLabelWidth">
      <el-radio v-model="form.radio" label="1">公开</el-radio>
      <el-radio v-model="form.radio" label="0">不公开</el-radio>
    </el-form-item>
    <el-form-item label="照片" :label-width="formLabelWidth">
     
      <!-- <el-upload
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
</el-dialog> -->


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

    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="info" @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="selectFile" :disabled="form.newCreating">确 定</el-button>
  </div>
</el-dialog>

      <el-button
        @click="delRows()"
        icon="el-icon-delete"
        type="danger"
        style="margin-bottom:10px;"
        size="mini"
      >批量删除</el-button>

        <el-table
        height="500"
        border
    ref="filterTable"
    :data="datas"
    @selection-change="handleSelectionChange"
    style="width: 95%;font-size: 18px;margin-left: 30px;">

    <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <!-- <el-table-column
      prop="id"
      label="id"
      style="font-size: 10px"
      width="180">
    </el-table-column> -->

    <el-table-column
      prop="title"
      label="title"

      column-key="title"
      :formatter="formatter"
    >
    <template slot-scope="scope">
            <span v-if="scope.row.share_flag==1"><i class="el-icon-star-on" style="color:#ffd633;font-size:25px;" @click="shareChange(scope)"></i></span>
            <span v-else><i class="el-icon-star-on" style="color:#c2d6d6;font-size:25px;" @click="shareChange(scope)"></i></span>
            <span>
                <router-link :to="`/main/detail/${scope.row.id}`"><font color="green">{{scope.row.title}}</font></router-link>
                </span>
            <!-- <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="title"></el-input> -->
          </template>
    </el-table-column>

    <el-table-column
      prop="author"
      label="author"
      style="font-size: 10px"
      width="180"
      column-key="author"
      :filters="[{text: 'shuzhiwei', value: 'shuzhiwei'}, 
                    {text: 'houtingyu', value: 'houtingyu'},
                    {text: 'admin', value: 'admin'},
                    ]"
      :filter-method="filterHandler"
      >
    </el-table-column>

    <el-table-column
      prop="date_d"
      label="date_d"
      width="180"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.date_d}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="date_d"></el-input>
          </template>
    </el-table-column>
    <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="editBlog(scope)"
              v-if="scope.row.statusBtn===false"
              icon="el-icon-edit"
            >编辑</el-button>
            
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteBlog(scope)">删除</el-button>
          </template>
        </el-table-column>

  </el-table>
    </div>
    </div>

    <div class="block"  style="text-align:center">
        <el-pagination
            v-if="paginationShow"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNo"
            :page-size="8"
            layout="total, prev, pager, next, jumper"
            font-size="30px"
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
                username: getCookie('username'),
                pageSize: 8,//默认的请求pageSize = 15
                pageNo: 1,//当前页码
                totalPage: 0,//总页数
                paginationShow: false,//是否显示分页
                totalCount: 0,//总条数
                id: '',
                title: '',
                content: '',
                date_d: '',
                tableDataAmount: [],

                form: {
                    title: '',
                    content: '',
                    radio: 0,
                    images: '',
                    images1: [],
                    newCreating: false
                },
                dialogFormVisible: false,
                formLabelWidth: '120px',

                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [],

                

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
                    let author = res[i].author
                    let date_d = getDateDiff(posted_on * 1000)
                    let share_flag = res[i].share_flag
                    let imageAddr = res[i].imageAddr
                    let data = {
                        'id': res[i].id,
                        'title': title,
                        'content': content,
                        'date_d': date_d,
                        'author': author,
                        'share_flag': share_flag,
                        'statusBtn': false,
                        'imageAddr': imageAddr,
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

            shareChange (scope) {

                if (this.username !== scope.row.author) {
                    this.$message.success('不是您的博客哦！')
                    return
                }

                if (scope.row.share_flag === 1) {
                    scope.row.share_flag = 0
                }else{
                    scope.row.share_flag = 1
                }
                const params = {
                    'token': this.token,
                    'title': scope.row.title,
                    'content': scope.row.content,
                    'share_flag': scope.row.share_flag,
                    'curImageAddrs': scope.row.imageAddr,
                    'delImageAddrs': '',
                }
                const url = `https://www.食.tech/lingxis/blog/edit/${scope.row.id}`
                axios.post(url, qs.stringify(params)).then(response => {
                    const code = response.data.code
                    if (code !== 200) {
                        this.$message.error(code)
                    }
                }).catch(error =>{
                    this.$message.error('请求失败！')
                })
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

            changeFileList (file) {
                console.log(file.raw)
                var reader = new FileReader();
                reader.readAsDataURL(file.raw)
                reader.onload = ()=>{
                    var image = reader.result
                    this.form.images = this.form.images + image + 'helloworld'
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

                // 根据title去重
                for (let i=0; i<this.datas.length; i++) {
                    if (this.form.title === this.datas[i].title) {
                        this.$message.success('含有重复标题哦！')
                        this.form.newCreating = false
                        return
                    }
                }

                const url = 'https://www.食.tech/lingxis/blog/addManyPhoto'

                var params0 = {
                    'token': this.token,
                    'title': this.form.title,
                    'content': this.form.content,
                    'author': this.username,
                    'share_flag': this.form.radio,
                }
                axios.post(url, qs.stringify(params0)).then(response => {
                    var res0 = response.data
                    console.log(res0)
                    let code = res0.code
                    if (code === 402) {
                        let username = getCookie('username')
                        refresh_token(username, this.token)
                        this.token = getCookie('lingxi-token')

                    }else if (code === 200) {
                        let post_id = res0.id
                        console.log(code)
                        const url1 = `https://www.食.tech/lingxis/blog/editAddPhoto/${post_id}`


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
                                        let username = getCookie('username')
                                        refresh_token(username, this.token)
                                        this.token = getCookie('lingxi-token')

                                    }else if (code === 200) {
                                        console.log(code)
                                    }else{
                                        alert(code)
                                    }
                                })
                                tmp_images = ''
                            }
                        }
                        if (tmp_images) {
                            var params2 = {
                                'token': this.token,
                                'image': tmp_images,
                            }
                            axios.post(url1, qs.stringify(params2)).then(response => {
                                let res = response.data
                                let code = res.code
                                if (code === 402) {
                                    const username = getCookie('username')
                                    refresh_token(username, this.token)
                                    this.token = getCookie('lingxi-token')

                                }else if (code === 200) {
                                    console.log(code)
                                }else{
                                    alert(code)
                                }
                            })
                        }


                    }else{
                        alert(code)
                    }
                })
                
                load.close();
                this.$message.success('新建成功')
                this.dialogFormVisible = false
                this.reload()
                
            },

            formatter(row, column) {
                return row.title
            },

            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },

            // 选择事件 得到选中的数据
            handleSelectionChange (data) {
                this.tableDataAmount = data
            },

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
                        let author = res[i].author
                        let date_d = getDateDiff(posted_on * 1000)
                        let share_flag = res[i].share_flag
                        let imageAddr = res[i].imageAddr
                        let data = {
                            'id': res[i].id,
                            'title': title,
                            'content': content,
                            'date_d': date_d,
                            'author': author,
                            'share_flag': share_flag,
                            'statusBtn': false,
                            'imageAddr': imageAddr,
                        }
                        this.datas.push(data)
                    }
                }).catch(error => {
                    console.log(error)
                    alert(error)

                })
            },

            // 批量删除
            delRows () {
                // 拿到选中的数据；
                const val = this.tableDataAmount
                // 如果选中数据存在
                if (val != '') {
                    // 将选中数据遍历
                    var ids = ''
                    for(let i=0; i<val.length; i++){
                        if (this.username !== val[i].author) {
                            this.$message.success('含有其他人的博客哦！')
                            return
                        }
                        ids = ids + val[i].id + ','
                    }
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        
                        console.log('ids: ' + ids) 
                        const url = 'https://www.食.tech/lingxis/blog/delete'
                        const params = {
                            'token': this.token,
                            "ids": ids
                        }
                        axios.post(url, qs.stringify(params)).then(res => {
                            const code = res.data.code
                            // if (res.data.code === 200) {
                            //     this.$message.success('删除成功')
                            // }else{
                            //     alert(res.data.code)
                            // }

                            if (code === 402) {
                                const username = getCookie('username')
                                refresh_token(username, token)
                                //this.reload()
                            }else if (code === 200) {
                                this.$message.success('删除成功')
                                this.reload()
                            }else{
                                alert(code)
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                    
                    }).catch(()=>{
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
                }else{
                    this.$message({
                        type: 'info',
                        message: '未选择'
                    })
                }
            },

            editBlog (scope) {
                if (!scope.row.id) {
                    alert('id为空')
                    this.tableData.splice(scope.$index, 1)
                }else if (this.username !== scope.row.author) {
                    this.$message.success('不是您的博客哦！')
                }else{
                    this.$router.push({path: "/main/edit/" + scope.row.id})
                }
            },

            deleteBlog (scope) {
                if (!scope.row.id) {
                    alert('id为空')
                    this.tableData.splice(scope.$index, 1)
                }else if (this.username !== scope.row.author) {
                    this.$message.success('不是您的博客哦！')
                }else {
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const url = 'https://www.食.tech/lingxis/blog/delete'
                        const params = {
                            'token': this.token,
                            "ids": scope.row.id + ','
                        }
                        axios.post(url, qs.stringify(params)).then(res => {
                            const code = res.data.code
                            if (code === 402) {
                                const username = getCookie('username')
                                refresh_token(username, token)
                                //this.reload()
                            }else if (code === 200) {
                                this.$message.success('删除成功')
                                this.reload()
                            }else{
                                alert(code)
                            }

                            // if (res.data.code === 200) {
                            //     this.$message.success('删除成功')
                            //     this.reload()
                            // }else{
                            //     alert(res.data.code)
                            // }
                        }).catch(error => {
                            console.log(error)
                        })
                    }).catch(() =>{
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
                }
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
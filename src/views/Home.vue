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
        style="margin-bottom:10px;"
        size="mini"
      >新建博客</el-button>

<el-dialog title="新建博客" :visible.sync="dialogFormVisible">

  <el-form :model="form">
    <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="form.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="内容" :label-width="formLabelWidth">
      <el-input v-model="form.content" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="照片" :label-width="formLabelWidth">
     
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


    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="info" @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="selectFile">确 定</el-button>
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
    style="width: 100%;font-size: 18px;">

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
            <span v-if="scope.row.statusBtn===false">
                <router-link :to="`/main/detail/${scope.row.id}`"><font color="green">{{scope.row.title}}</font></router-link>
                </span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="title"></el-input>
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
                    images: '',
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
                    let data = {
                        'id': res[i].id,
                        'title': title,
                        'content': content,
                        'date_d': date_d,
                        'author': author,
                        'statusBtn': false
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

            // 新建Blog
            selectFile () {
                const url = 'https://www.食.tech/lingxis/blog/addManyPhoto'
                const params = {
                    'token': this.token,
                    'title': this.form.title,
                    'content': this.form.content,
                    'files': this.form.images,
                    'author': this.username,

                }
                axios.post(url, qs.stringify(params)).then(response => {
                    const res = response.data
                    console.log(res)
                    const code = res.code
                    if (code === 402) {
                        const username = getCookie('username')
                        refresh_token(username, this.token)
                        this.token = getCookie('lingxi-token')

                    }else if (code === 200) {
                        this.$message.success('新建成功')
                        this.dialogFormVisible = false
                        this.reload()
                    }else{
                        alert(code)
                    }
                })
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
                        let data = {
                            'id': res[i].id,
                            'title': title,
                            'content': content,
                            'date_d': date_d,
                            'author': author,
                            'statusBtn': false
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
                            this.$message.error('当前勾选中含有其他人的作品^_^')
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
                    this.$message.error('您无操作权限^_^')
                }else{
                    this.$router.push({path: "/main/edit/" + scope.row.id})
                }
            },

            deleteBlog (scope) {
                if (!scope.row.id) {
                    alert('id为空')
                    this.tableData.splice(scope.$index, 1)
                }else if (this.username !== scope.row.author) {
                    this.$message.error('您无操作权限^_^')
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

</style>
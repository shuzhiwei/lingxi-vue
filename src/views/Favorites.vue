<template>
<div>
    <div>
        <!-- <div>
            <span><h2 align="center">私募篇1</h2></span>
        </div>
        <div>
            <el-input
                style="width:250px;margin-left: 30px;"
                placeholder="请输入私募名称"
                v-model="input"
                type="text"
                clearable>
            </el-input>
            <el-button type="primary" @click="searchStock">搜索</el-button>
            <el-button type="info" @click="returnStock">返回</el-button>
        </div> -->
        <div>
        <br>
        <el-table
        height="500"
        border
    ref="filterTable"
    :data="datas"
    style="width: 95%;font-size: 16px;margin-left: 30px;">

    <el-table-column
      prop="private_name"
      label="私募名称"
      style="font-size: 10px"
      width="580"
      >
      <template slot-scope="scope">
            <span>{{scope.row.private_name}}</span>
          </template>
    </el-table-column>

    <el-table-column
      prop="code_name"
      label="股票名称"
      column-key="code_name"
      width="120"
    >
    <template slot-scope="scope">
            <span>{{scope.row.code_name}}</span>
          </template>
    </el-table-column>

    <el-table-column
      prop="add_sub_store"
      label="增减仓"
      style="font-size: 10px"
      width="300"
      >
      <template slot-scope="scope">
            <span>{{scope.row.add_sub_store}}</span>
          </template>
    </el-table-column>

    <el-table-column
      prop="update_date"
      label="更新时间"
      style="font-size: 10px"
      >
      <template slot-scope="scope">
            <span>{{scope.row.update_date}}</span>
          </template>
    </el-table-column>

    <el-table-column
      prop="cancel"
      label="操作"
      style="font-size: 10px"
      >
      <template slot-scope="scope">
            <span><el-button type="danger" size="mini" icon="el-icon-delete" @click="cancelFavorites(scope)">取消关注</el-button></span>
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
                
                input: '',

            }
        },

        mounted () {
            const token = this.token
            const url = this.$store.state.base_url + `/stock/viewPrivate1Favorites`
            const params = {
                    'token': this.token,
                    'pageSize': this.pageSize,
                    'pageNo': this.pageNo,
                }
            axios.post(url, qs.stringify(params)).then(response => {
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
                if (code === 200) {
                    this.totalPage = con.totalPage
                    this.totalCount = con.totalCount
                    const res = con.data
                    for (let i=0; i<res.length; i++) {
                        let private_name = res[i].private_name
                        let code_name = res[i].code_name
                        let add_sub_store = res[i].add_sub_store
                        let update_date = res[i].update_date
                        let type = res[i].type
                        let data = {
                            'private_name': private_name,
                            'code_name': code_name,
                            'add_sub_store': add_sub_store,
                            'update_date': update_date,
                            'type': type,
                        }
                        this.datas.push(data)
                    }
                    if (this.totalPage > 1) {
                        this.paginationShow = true
                    }
                }else{
                    console.log(con)
                }
            }).catch(error => {
                console.log(error)
                alert(error)
            })
        },

        methods: {

            cancelFavorites (scope) {
                this.$confirm('确定取消关注?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>{
                    const params = {
                        'token': this.token,
                        'private_name': scope.row.private_name,
                        'type': 0,
                    }
                    const url = this.$store.state.base_url + `/stock/updatePrivate1Favorites`
                    axios.post(url, qs.stringify(params)).then(response => {
                        const code = response.data.code
                        if (code !== 200) {
                            this.$message.error(code)
                        }else{
                            this.$message.success('已取消关注')
                            this.reload()
                        }
                    }).catch(error =>{
                        this.$message.error('请求失败！')
                    })

                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    })
                })
            },

            returnStock () {
                this.reload()
            },

            searchStock () {
                const url = this.$store.state.base_url + `/stock/searchPrivate1`
                const params = {
                    'token': this.token,
                    'stock': this.input,
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
                    if (code === 200) {
                        const res = con.data
                        this.datas = []
                        for (let i=0; i<res.length; i++) {
                            let private_name = res[i].private_name
                            let code_name = res[i].code_name
                            let add_sub_store = res[i].add_sub_store
                            let update_date = res[i].update_date
                            let data = {
                                'private_name': private_name,
                                'code_name': code_name,
                                'add_sub_store': add_sub_store,
                                'update_date': update_date,
                            }
                            this.datas.push(data)
                        }
                    }else{
                        console.log(con)
                        this.$message.error('无此私募！')
                    }
                }).catch(error=>{
                    console.log(error)
                    this.$message.error(error)
                })
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
                const url = this.$store.state.base_url + "/stock/viewPrivate1Favorites"
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
                        let private_name = res[i].private_name
                        let code_name = res[i].code_name
                        let add_sub_store = res[i].add_sub_store
                        let update_date = res[i].update_date
                        let data = {
                            'private_name': private_name,
                            'code_name': code_name,
                            'add_sub_store': add_sub_store,
                            'update_date': update_date,
                        }
                        this.datas.push(data)
                    }
                }).catch(error => {
                    console.log(error)
                    this.$message.error('请求失败！')
                })
            },

            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
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
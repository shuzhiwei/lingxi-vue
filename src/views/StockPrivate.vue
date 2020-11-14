<template>
<div>
    <div>
        <div>
            </br>
            <span><h2 align="center">私募篇</h2></span>
            </br>
        </div>
        <div>
            <!-- <label for="transfomer">股票编码: </label> -->
            <el-input
                style="width:200px;margin-left: 30px;"
                placeholder="请输入股票名称或编码"
                v-model="input"
                type="text"
                clearable>
            </el-input>
            <el-button type="primary" size="mini" @click="searchStock">搜索</el-button>
            <el-button type="info" size="mini" @click="returnStock">返回</el-button>
        </div>
        <div>
        <br>
        <el-table
        height="500"
        border
    ref="filterTable"
    :data="datas"
    style="width: 95%;font-size: 16px;margin-left: 30px;">

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
      prop="code"
      label="股票编码"
      column-key="code"
      width="120"
    >
    <template slot-scope="scope">
            <span>{{scope.row.code}}</span>
          </template>
    </el-table-column>

    <el-table-column
      prop="update_date"
      label="更新时间"
      style="font-size: 10px"
      width="130"
      >
      <template slot-scope="scope">
            <span>{{scope.row.update_date}}</span>
          </template>
    </el-table-column>

    <el-table-column
      prop="private_name"
      label="私募名称"
      style="font-size: 10px"
      width="780"
      >
      <template slot-scope="scope">
            <span>{{scope.row.private_name}}</span>
          </template>
    </el-table-column>

    <el-table-column
      prop="add_sub_store"
      label="增减仓"
      style="font-size: 10px"
      >
      <template slot-scope="scope">
            <span>{{scope.row.add_sub_store}}</span>
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
            const url = `https://www.食.tech/stock/viewPrivate`
            const params = {
                    'token': this.token,
                    'pageSize': this.pageSize,
                    'pageNo': this.pageNo
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
                        let code = res[i].code
                        let update_date = res[i].update_date
                        let private_name = res[i].private_name
                        let add_sub_store = res[i].add_sub_store
                        let code_name = res[i].code_name
                        let data = {
                            'code': code,
                            'update_date': update_date,
                            'private_name': private_name,
                            'add_sub_store': add_sub_store,
                            'code_name': code_name,
                        }
                        this.datas.push(data)
                    }
                    if (this.totalPage > 1) {
                        this.paginationShow = true
                    }
                }else{
                    console.log(con)
                    alert(code)
                }
            }).catch(error => {
                console.log(error)
                alert(error)
            })
        },

        methods: {

            returnStock () {
                this.reload()
            },

            searchStock () {
                const url = `https://www.食.tech/stock/searchPrivate`
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
                            let code = res[i].code
                            let code_name = res[i].code_name
                            let update_date = res[i].update_date
                            let private_name = res[i].private_name
                            let add_sub_store = res[i].add_sub_store
                            let data = {
                                'code': code,
                                'code_name': code_name,
                                'update_date': update_date,
                                'private_name': private_name,
                                'add_sub_store': add_sub_store,
                            }
                            this.datas.push(data)
                        }
                    }else{
                        console.log(con)
                        this.$message.error('无此股票！')
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
                const url = "https://www.食.tech/stock/viewPrivate"
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
                        let code = res[i].code
                        let code_name = res[i].code_name
                        let update_date = res[i].update_date
                        let private_name = res[i].private_name
                        let add_sub_store = res[i].add_sub_store
                        let data = {
                            'code': code,
                            'code_name': code_name,
                            'update_date': update_date,
                            'private_name': private_name,
                            'add_sub_store': add_sub_store,
                        }
                        this.datas.push(data)
                    }
                }).catch(error => {
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
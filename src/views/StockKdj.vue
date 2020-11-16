<template>
<div>
    <div>
        <div>
            </br>
            <span><h2 align="center">金叉篇</h2></span>
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
      label="金叉股"
      column-key="code_name"
    >
    <template slot-scope="scope">
            <span>{{scope.row.code_name}}</span>
          </template>
    </el-table-column>

    <el-table-column
      prop="code"
      label="编码"
      column-key="code"
    >
    <template slot-scope="scope">
            <span>{{scope.row.code}}</span>
          </template>
    </el-table-column>

    <el-table-column
      prop="update_date"
      label="更新时间"
      style="font-size: 10px"
      sortable
      >
      <template slot-scope="scope">
            <span>{{scope.row.update_date}}</span>
          </template>
    </el-table-column>

    <!-- <el-table-column
      prop="if_gold_cross"
      label="是否kdj金叉"
      style="font-size: 10px"
      sortable
      >
      <template slot-scope="scope">
            <span>{{scope.row.if_gold_cross}}</span>
          </template>
    </el-table-column> -->

    <el-table-column
      v-if="this.$store.state.isshow"
      prop="shareholder_falling_count"
      label="股东人数下降统计"
      
      sortable
      >
      <template slot-scope="scope">
            <span>{{scope.row.shareholder_falling_count}}</span>
          </template>
    </el-table-column>

    <el-table-column
      v-if="this.$store.state.isshow"
      prop="sdlu_great_retail_count"
      label="十大流通股东牛散个数统计"
      sortable
      >
      <template slot-scope="scope">
            <span>{{scope.row.sdlu_great_retail_count}}</span>
          </template>
    </el-table-column>

    <el-table-column
      v-if="this.$store.state.isshow"
      prop="float_share"
      label="流通市值(亿)"
      sortable
      >
      <template slot-scope="scope">
            <span>{{scope.row.float_share}}</span>
          </template>
    </el-table-column>

    <el-table-column
      v-if="this.$store.state.isshow"
      prop="stock"
      label="是否有主力吸筹迹象"
      :filters="[{text: '是', value: '是'}, 
                    {text: '否', value: '否'},
                    ]"
      :filter-method="filterHandler"
      >
      <template slot-scope="scope">
            <span>{{scope.row.stock}}</span>
          </template>
    </el-table-column>

    <el-table-column
      prop="macd_gold_cross"
      label="是否macd金叉"
      sortable
      >
      <template slot-scope="scope">
            <span>{{scope.row.macd_gold_cross}}</span>
          </template>
    </el-table-column>

    <el-table-column
      v-if="this.$store.state.isshow"
      prop="macd_dif"
      label="macd快线"
      sortable
      >
      <template slot-scope="scope">
            <span>{{scope.row.macd_dif}}</span>
          </template>
    </el-table-column>

    <el-table-column
      v-if="this.$store.state.isshow"
      prop="macd_dea"
      label="macd慢线"
      sortable
      >
      <template slot-scope="scope">
            <span>{{scope.row.macd_dea}}</span>
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

            }
        },

        mounted () {
            const url = this.$store.state.base_url + `/stock/viewKdj`
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
                    refresh_token(username, this.token)
                    this.reload()
                    return
                }
                if (code === 401) {
                    alert(con.message)
                    return
                }
                if (code === 200) {
                    const res = con.data
                    this.totalPage = con.totalPage
                    this.totalCount = con.totalCount
                    for (let i=0; i<res.length; i++) {
                        let code = res[i].code
                        let update_date = res[i].update_date
                        let shareholder_falling_count = res[i].shareholder_falling_count
                        let sdlu_great_retail_count = res[i].sdlu_great_retail_count
                        // let float_share = Math.round(res[i].float_share)
                        let float_share = Math.round(res[i].float_share / 100) / 100
                        let code_name = res[i].code_name
                        let if_gold_cross = res[i].if_gold_cross
                        let macd_gold_cross = res[i].macd_gold_cross
                        let macd_dif = res[i].macd_dif
                        let macd_dea = res[i].macd_dea

                        if (shareholder_falling_count >= 1 && sdlu_great_retail_count >= 6 && float_share < 100) {
                            this.stock = '是'
                        }else{
                            this.stock = '否'
                        }
                        
                        let data = {
                            'code': code,
                            'update_date': update_date,
                            'shareholder_falling_count': shareholder_falling_count,
                            'sdlu_great_retail_count': sdlu_great_retail_count,
                            'float_share': float_share,
                            'code_name': code_name,
                            'if_gold_cross': if_gold_cross,
                            'macd_gold_cross': macd_gold_cross,
                            'macd_dif': macd_dif,
                            'macd_dea': macd_dea,
                            'stock': this.stock,
                        }
                        this.datas.push(data)
                    }
                    if (this.totalPage > 1) {
                        this.paginationShow = true
                    }
                }else{
                    console.log(con)
                    console.log(code)
                }
            }).catch(error => {
                console.log(error)
                alert(error)
            })
        },

        methods: {

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
                this.datas = []
                const url = this.$store.state.base_url + "/stock/viewKdj"
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
                        refresh_token(username, this.token)
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
                        let update_date = res[i].update_date
                        let shareholder_falling_count = res[i].shareholder_falling_count
                        let sdlu_great_retail_count = res[i].sdlu_great_retail_count
                        // let float_share = Math.round(res[i].float_share)
                        let float_share = Math.round(res[i].float_share / 100) / 100
                        let code_name = res[i].code_name
                        let if_gold_cross = res[i].if_gold_cross
                        let macd_gold_cross = res[i].macd_gold_cross
                        let macd_dif = res[i].macd_dif
                        let macd_dea = res[i].macd_dea
                        if (shareholder_falling_count >= 1 && sdlu_great_retail_count >= 6 && float_share < 100) {
                            this.stock = '是'
                        }else{
                            this.stock = '否'
                        }
                        let data = {
                            'code': code,
                            'update_date': update_date,
                            'shareholder_falling_count': shareholder_falling_count,
                            'sdlu_great_retail_count': sdlu_great_retail_count,
                            'float_share': float_share,
                            'code_name': code_name,
                            'if_gold_cross': if_gold_cross,
                            'macd_gold_cross': macd_gold_cross,
                            'macd_dif': macd_dif,
                            'macd_dea': macd_dea,
                            'stock': this.stock,

                        }
                        this.datas.push(data)
                    }
                }).catch(error => {
                    console.log(error)
                    alert(error)

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
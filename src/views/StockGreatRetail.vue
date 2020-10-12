<template>
<div>
    <div>
        <div>
            <span><h2 align="center" @click="dialogFormVisible = true">牛散篇选妖股</h2></span>
            <el-dialog title="妖股满足条件" :visible.sync="dialogFormVisible">
                <li>近一个月第一个涨停板</li>
                <li>最近有吸筹迹象（股东人数下降）</li>
                <li>十大流通股东人名超过6个</li>
                <li>流通市值小于100亿</li>
            </el-dialog>
        </div>
        <div>
        <br>

        <el-table
        height="500"
        border
    ref="filterTable"
    :data="datas"
    style="width: 95%;font-size: 18px;margin-left: 30px;">

    <el-table-column
      prop="name"
      label="妖股名称"
      column-key="name"
    >
    <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
    </el-table-column>

    <el-table-column
      prop="code"
      label="妖股编码"
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
      >
      <template slot-scope="scope">
            <span>{{scope.row.update_date}}</span>
          </template>
    </el-table-column>

    <!-- <el-table-column
      prop="shareholder_falling_count"
      label="是否有主力吸筹迹象(股东人数下降)"
      width="320"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.shareholder_falling_count == 1">是</span>
            <span v-else>否</span>
          </template>
    </el-table-column>

    <el-table-column
      prop="sdlu_great_retail_count"
      label="十大流通股东牛散是否超过6个"
      width="280"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.sdlu_great_retail_count >= 6">是</span>
            <span v-else>否</span>
          </template>
    </el-table-column>

    <el-table-column
      prop="float_share"
      label="流通市值(亿)"
      >
      <template slot-scope="scope">
            <span>{{scope.row.float_share}}</span>
          </template>
    </el-table-column> -->

  </el-table>
    </div>
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
                str1: '有主力吸筹迹象，股东人数下降',
                dialogFormVisible: false,

            }
        },

        mounted () {
            const token = this.token
            const url = `https://www.食.tech/stock/view`
            const params = {
                    'token': this.token,
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
                    const res = con.data
                    for (let i=0; i<res.length; i++) {
                        let code = res[i].code
                        let update_date = res[i].update_date
                        let shareholder_falling_count = res[i].shareholder_falling_count
                        let sdlu_great_retail_count = res[i].sdlu_great_retail_count
                        // let float_share = Math.round(res[i].float_share)
                        let float_share = Math.round(res[i].float_share / 100) / 100
                        let name = res[i].name
                        let data = {
                            'code': code,
                            'update_date': update_date,
                            'shareholder_falling_count': shareholder_falling_count,
                            'sdlu_great_retail_count': sdlu_great_retail_count,
                            'float_share': float_share,
                            'name': name,
                        }
                        this.datas.push(data)
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
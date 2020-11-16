<template>
    <div>
        <h2 align="center">周查询最大功率因数</h2>
        <br>
<div style="text-align:center">

    <label for="transfomer">配电室: </label>
    <el-select label="p" v-model="value" placeholder="请选择">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>

    <span class="block">
        <span class="demonstration">日期范围</span>
        <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="entry">查询</el-button>
    </span>

</div>

    

<table border=0 cellspacing=0 cellpadding=0 style="margin:auto">
    <tr>
        <td colspan="2">
            &nbsp;&nbsp;&nbsp;&nbsp;
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <h3 id="transName" style="font-weight:bold;text-align:center">{{transName}}</h3>
        </td>
    </tr>
    <tr>
        <td colspan="2">
            &nbsp;&nbsp;&nbsp;&nbsp;
        </td>
    </tr>
    <tr>
        <td><span id="main1" style="width: 600px;height:400px;"></span></td>
        <td><span id="main2" style="width: 600px;height:400px;"></span></td>
    </tr>
    <tr>
        <td><span id="main3" style="width: 600px;height:400px;"></span></td>
        <td><span id="main4" style="width: 600px;height:400px;"></span></td>
    </tr>
    <tr>
        <td><span id="main5" style="width: 600px;height:400px;"></span></td>
        <td><span id="main6" style="width: 600px;height:400px;"></span></td>
    </tr>
    
</table>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    import {getCookie, setCookie} from '../../static/js/cookie.js'
    export default {
        data () {
            return {
                transCode: 'TRYGXK4J',
                startTime: '2020-09-01',
                endTime: '2020-09-07',
                token: getCookie('lingxi-token'),
                transName: '',
                value1: '',

                options: [{
                    value: '选项1',
                    label: 'TRYGXK4J'
                    }, {
                    value: '选项2',
                    label: '双皮奶'
                    }, {
                    value: '选项3',
                    label: '蚵仔煎'
                    }, {
                    value: '选项4',
                    label: '龙须面'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',

            }
        },

        mounted () {
            if (!this.token) {
                this.$router.push({path: '/login'})
            }
        },

        methods: {
            entry () {
                const transCode = this.transCode.trim()
                // const startTime = this.startTime.trim()
                // const endTime = this.endTime.trim()

                var startTime = new Date(this.value1[0])
                var endTime = new Date(this.value1[1])

                console.log(startTime, endTime)

                startTime = startTime.getFullYear() + '-' + (startTime.getMonth()+1) + '-' + startTime.getDate()
                endTime = endTime.getFullYear() + '-' + (endTime.getMonth()+1) + '-' + endTime.getDate()

                console.log(startTime, endTime)

                const params = {
                    'token': this.token,
                    'trans_code': transCode,
                    'start_time': startTime,
                    'end_time': endTime
                }
                const url = `https://www.nnbkqnp.cn/rde/powerFactor`

                axios.post(url, qs.stringify(params)).then(response => {
                    const dict_con = response.data
                    console.log(dict_con['code'])
                    if (dict_con['code'] === 401) {
                        alert(dict_con['message'])
                        return
                    }
                    var info = dict_con['info']
                    console.log(info)
                    var aa = 1
                    for(let j=0; j<info.length; j++){
                        var trans_name = info[j]['trans_name']
                        this.transName = trans_name
                        var bom_name = info[j]["bom_name"]
                        var datas = info[j]["data"]

                        var time_list = new Array()
                        var value_list = new Array()
                        for(let k=0; k<datas.length; k++){
                            var timestamp = datas[k].timestamp
                            var value = datas[k].value
                            time_list.push(timestamp)
                            value_list.push(value)
                        }
                        
                        var div_name = 'main' + aa
                        var myChart = this.$echarts.init(document.getElementById(div_name))
                        myChart.setOption({
                            title: {
                                text: bom_name,
                                x: 'center',
                                y: 'top',
                                textAlign: 'left'
                            },
                            xAxis: {
                                type: 'category',
                                data: time_list
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: value_list,
                                type: 'line'
                            }]
                        })

                        aa+=1
                    }

                })

            }
        }
    }
</script>

<style>

</style>
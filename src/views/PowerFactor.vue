<template>
    <div>
        <h2 align="center">周查询最大功率因数</h2>
        <br>
    <table style="margin:auto">
        <tr><th><label for="transCode">配电室编码: </label></th>
            <td>
                <input id="transCode" name="transCode" size="16" type="text" :value="transCode"></input>
            </td>
        </tr>
        <tr><th><label for="startTime">开始日期: </label></th>
            <td>
                <input id="startTime" name="startTime" size="30" type="date" :value="startTime"></input>
            </td>
        </tr>
        <tr><th><label for="endTime">结束日期: </label></th>
            <td>
                <input id="endTime" name="endTime" size="30" type="date" :value="endTime"/>
            </td>
        </tr>
        <tr><th><label for="entry"></label></th>
            <td>
                <button id="entry" name="entry" value="" @click="entry">确定</button>
            </td>
        </tr>

    </table>

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
                transName: ''
            }
        },

        methods: {
            entry () {
                const transCode = this.transCode.trim()
                const startTime = this.startTime.trim()
                const endTime = this.endTime.trim()
                const params = {
                    'token': this.token,
                    'trans_code': transCode,
                    'start_time': startTime,
                    'end_time': endTime
                }
                const url = `https://www.食.tech/rde/powerFactor`

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
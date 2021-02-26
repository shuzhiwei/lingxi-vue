<template>
<div>
    <!-- <li class="a" @mouseenter="aaa(true)" @mouseleave="aaa(false)" :style="{background: backColor}"> -->
    <li class="a" :style="{background: backColor}">
        <label class="b">
            <input class="c" type="checkbox" v-model="item.status"/>

            <span v-if="item.priority===1"><i class="el-icon-star-on" style="color:#ffd633;font-size:25px;" @click="changePriority(item.author, item.id)"></i></span>
            <span v-else><i class="el-icon-star-on" style="color:#c2d6d6;font-size:25px;" @click="changePriority(item.author, item.id)"></i></span>

            <span v-if="item.priority===1" class="d">{{item.todo}}</span>
            <span v-else>{{item.todo}}</span>
            
            <span v-if="item.priority===1" class="d">{{item.create_date}}</span>
            <span v-else>{{item.create_date}}</span>
        </label>
        <button id="e" class="btn btn-danger" v-show="isShow" @click='delItem'>完成</button>
    </li>
</div>
    
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    import {refresh_token} from '../../static/js/acs.js'
    export default {
        props: {
            item: Object,
            index: Number,
            delTodo: Function
        },
        data () {
            return {
                token: getCookie('lingxi-token'),
                username: getCookie('username'),
                backColor: 'white',
                isShow: false,
                todos: this.item
            }
        },
        methods: {
            formatDate(now) { 
                var year=now.getFullYear();  //取得4位数的年份
                var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
                var date=now.getDate();      //返回日期月份中的天数（1到31）
                // var hour=now.getHours();     //返回日期中的小时数（0到23）
                // var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
                // var second=now.getSeconds(); //返回日期中的秒数（0到59）
                return year+"-"+month+"-"+date+" "
            },
            
            aaa (isEnter) {
                if(isEnter){
                    this.backColor = 'gray'
                    this.isShow = true
                }else{
                    this.backColor = 'white'
                    this.isShow = false
                }
            },
            delItem () {
                const {item, index, delTodo} = this
                this.$confirm(`确认完成${item.todo}吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() =>{
                    delTodo(index)
                }).catch(() =>{
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
                
            },

            changePriority (author, id) {
                if (this.username !== author) {
                    this.$message.error('不是您的todo哦！')
                    return
                }

                const params = {
                    'token': this.token,
                    'id': id,
                }
                const url = this.$store.state.base_url + `/entertainment/todoListUpdatePriority`
                axios.post(url, qs.stringify(params)).then(response => {
                    const code = response.data.code
                    console.log(code)
                    if(code == 200){
                        var priority = this.item.priority
                        if (priority) {
                            priority = 0
                        }else{
                            priority = 1
                        }
                        this.item.priority = priority
                    }
                }).catch(error =>{
                    this.$message.error('请求失败！')
                })
            }
            
        }

    }
</script>

<style>
/*item*/
.a {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

.b {
  float: left;
  cursor: pointer;
}

.c {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

.d {
    color: red;
}

#e {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

</style>
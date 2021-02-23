<template>
<div>
<div class="todo-container">
    <div class="todo-wrap">
     
      <!-- <todo-header :addTodo="addTodo"/> -->
      <todo-header @addTodo="addTodo"/> <!--给TodoHeader标签对象绑定addTodo事件监听-->
      <todo-list :todos="todos" :delTodo="delTodo"/>
      <todo-footer :todos="todos" :deleteCompleteTodos="deleteCompleteTodos" :selectAllTodos="selectAllTodos"/>
    </div>
    <div style="text-align: center; width:350px; height:40px">
        <el-button type="success" size="small" @click="showMyselfTodo">未完成</el-button>
        <el-button type="success" size="small" @click="showMyselfAllHistory">历史已完成</el-button>
        <el-button type="success" size="small" @click="showMyselfHistoryOnlyToday">今日已完成</el-button>
    </div>
    <div style="text-align: center; width:350px; height:40px">
        <el-button type="success" size="small" @click="showOtherTodo">{{otherUserShow}}</el-button>
        <el-button type="success" size="small" @click="showOtherAllHistory">历史已完成</el-button>
        <el-button type="success" size="small" @click="showOtherHistoryOnlyToday">今日已完成</el-button>
    </div>
  </div>

  <div class="todo-container">
      <todo-list-history :todos="todos_history" :delTodo="deleteReadHistory"/>
  </div>
</div>
    
</template>

<script>
    import TodoHeader from '../components/TodoHeader.vue'
    import TodoList from '../components/TodoList.vue'
    import TodoFooter from '../components/TodoFooter.vue'
    import TodoListHistory from '../components/TodoListHistory.vue'
    import axios from 'axios'
    import qs from 'qs'
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    import {refresh_token} from '../../static/js/acs.js'
    export default {
        inject: ['reload'],

        components: {
            TodoHeader,
            TodoList,
            TodoFooter,
            TodoListHistory
        },

        data () {
            return {
                token: getCookie('lingxi-token'),
                username: getCookie('username'),
                todos: [],
                todos_history: [],
                otherUser: getCookie('username'),
                otherUserShow: ''
            }
        },

        mounted () {
            if(this.username == "shuzhiwei"){
                this.otherUserShow = "侯婷玉"
            }else{
                this.otherUserShow = "舒志伟"
            }
            const token = this.token
            const url = this.$store.state.base_url + `/entertainment/todoListShow`
            const params = {
                    'token': this.token,
                    'username': this.username
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
                    this.$message.error('无acs权限！')
                    return
                }
                const res = con.todos
                for (let i=0; i<res.length; i++) {
                    let id = res[i].id
                    let todo = res[i].todo
                    let status = res[i].status
                    let create_date = res[i].create_date
                    create_date = this.formatDate(new Date(parseInt(create_date)))
                    let author = res[i].username
                    let priority = res[i].priority
                    let d = {
                        'id': id,
                        'todo': todo,
                        'status': status,
                        'create_date': create_date,
                        'author': author,
                        'priority': priority
                    }
                    this.todos.push(d)
                }
            }).catch(error => {
                console.log(error)
            })
        },

        methods: {
            sleep (time) {
                var timeStamp = new Date().getTime();
                var endTime = timeStamp + time;
                while(true){
                    if (new Date().getTime() > endTime){
                        return;
                    } 
                }
            },
            formatDate(now) { 
                var year=now.getFullYear();  //取得4位数的年份
                var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
                var date=now.getDate();      //返回日期月份中的天数（1到31）
                // var hour=now.getHours();     //返回日期中的小时数（0到23）
                // var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
                // var second=now.getSeconds(); //返回日期中的秒数（0到59）
                return year+"-"+month+"-"+date+" "
            },
            addTodo (todo) {
                var ts = (new Date()).valueOf()
                const url = this.$store.state.base_url + `/entertainment/todoInsert`
                const params = {
                        'token': this.token,
                        'create_date': ts,
                        'todo': todo,
                        'username': this.otherUser
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
                        this.$message.error('无acs权限！')
                        return
                    }
                    const url1 = this.$store.state.base_url + `/entertainment/todoListShow`
                    const params1 = {
                            'token': this.token,
                            'username': this.otherUser
                        }
                    axios.post(url1, qs.stringify(params1)).then(response => {
                        const con1 = response.data
                        console.log(con1)
                        const code1 = con1.code
                        if (code1 === 402) {
                            const username1 = getCookie('username')
                            refresh_token(username1, token)
                            this.reload()
                            return
                        }
                        if (code1 === 401) {
                            this.$message.error('无acs权限！')
                            return
                        }
                        const res1 = con1.todos
                        this.todos = []
                        for (let i=0; i<res1.length; i++) {
                            let id = res1[i].id
                            let todo = res1[i].todo
                            let status = res1[i].status
                            let create_date = res1[i].create_date
                            create_date = this.formatDate(new Date(parseInt(create_date)))
                            let author = res1[i].username
                            let priority = res1[i].priority
                            let d = {
                                'id': id,
                                'todo': todo,
                                'status': status,
                                'create_date': create_date,
                                'author': author,
                                'priority': priority
                            }
                            this.todos.push(d)
                        }
                    }).catch(error => {
                        console.log(error)
                        this.$message.error(error)
                    })
                }).catch(error => {
                    console.log(error)
                    this.$message.error(error)
                })
                
            },
            delTodo (index) {
                if (this.username !== this.otherUser) {
                    this.$message.error('不是您的todo哦！')
                    return
                }
                const ts = (new Date()).valueOf()
                const url = this.$store.state.base_url + `/entertainment/todoDelete`
                const params = {
                        'token': this.token,
                        'ids': index,
                        'timestamp': ts,
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
                        this.$message.error('无acs权限！')
                        return
                    }
                    const url1 = this.$store.state.base_url + `/entertainment/todoListShow`
                    const params1 = {
                            'token': this.token,
                            'username': this.otherUser
                        }
                    axios.post(url1, qs.stringify(params1)).then(response => {
                        const con1 = response.data
                        console.log(con1)
                        const code1 = con1.code
                        if (code1 === 402) {
                            const username1 = getCookie('username')
                            refresh_token(username1, token)
                            this.reload()
                            return
                        }
                        if (code1 === 401) {
                            this.$message.error('无acs权限！')
                            return
                        }
                        const res1 = con1.todos
                        this.todos = []
                        for (let i=0; i<res1.length; i++) {
                            let id = res1[i].id
                            let todo = res1[i].todo
                            let status = res1[i].status
                            let create_date = res1[i].create_date
                            create_date = this.formatDate(new Date(parseInt(create_date)))
                            let author = res1[i].username
                            let priority = res1[i].priority
                            let d = {
                                'id': id,
                                'todo': todo,
                                'status': status,
                                'create_date': create_date,
                                'author': author,
                                'priority': priority
                            }
                            this.todos.push(d)
                        }
                        this.showMyselfHistoryOnlyToday()
                    }).catch(error => {
                        console.log(error)
                    })
                }).catch(error => {
                    console.log(error)
                    this.$message.error(error)
                })

                
            },
            deleteCompleteTodos () {
                if (this.username !== this.otherUser) {
                    this.$message.error('不是您的todo哦！')
                    return
                }
                const todos = this.todos.filter(todo => todo.status == 1 || todo.status == true)
                var ids = ''
                for (let i=0; i<todos.length; i++) {
                    ids += todos[i].id + ','
                }
                ids = ids.substr(0, ids.length-1)
                console.log('ids: ' + ids)
                const ts = (new Date()).valueOf()
                const url = this.$store.state.base_url + `/entertainment/todoDelete`
                const params = {
                        'token': this.token,
                        'ids': ids,
                        'timestamp': ts,
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
                        this.$message.error('无acs权限！')
                        return
                    }
                    const url1 = this.$store.state.base_url + `/entertainment/todoListShow`
                    const params1 = {
                            'token': this.token,
                            'username': this.otherUser
                        }
                    axios.post(url1, qs.stringify(params1)).then(response => {
                        const con1 = response.data
                        console.log(con1)
                        const code1 = con1.code
                        if (code1 === 402) {
                            const username1 = getCookie('username')
                            refresh_token(username1, token)
                            this.reload()
                            return
                        }
                        if (code1 === 401) {
                            this.$message.error('无acs权限！')
                            return
                        }
                        const res1 = con1.todos
                        this.todos = []
                        for (let i=0; i<res1.length; i++) {
                            let id = res1[i].id
                            let todo = res1[i].todo
                            let status = res1[i].status
                            let create_date = res1[i].create_date
                            create_date = this.formatDate(new Date(parseInt(create_date)))
                            let author = res1[i].username
                            let priority = res1[i].priority
                            let d = {
                                'id': id,
                                'todo': todo,
                                'status': status,
                                'create_date': create_date,
                                'author': author,
                                'priority': priority
                            }
                            this.todos.push(d)
                        }
                        this.showMyselfHistoryOnlyToday()
                    }).catch(error => {
                        console.log(error)
                    })
                }).catch(error => {
                    console.log(error)
                })

                
            },
            selectAllTodos (value) {
                this.todos.forEach(todo => todo.status=value)
            },
            deleteReadHistory (index) {
                if (this.username !== this.otherUser) {
                    this.$message.error('不是您的todo哦！')
                    return
                }
                const url = this.$store.state.base_url + `/entertainment/todoRealDeleteHistory`
                const params = {
                        'token': this.token,
                        'ids': index
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
                        this.$message.error('无acs权限！')
                        return
                    }
                    
                    var a = (new Date()).toLocaleDateString()
                    a =a.replace(/\//g,'-')
                    const timestamp = (new Date(a))/1000 * 1000
                    console.log('hello: ' + timestamp)
                    this.showHistory(timestamp, this.username)
                }).catch(error => {
                    console.log(error)
                    this.$message.error(error)
                })

            },

            showHistory (timestamp, username) {
                this.todos = []
                this.showTodo(username)
                const token = this.token
                const url = this.$store.state.base_url + `/entertainment/todoShowHistory`
                const params = {
                        'token': this.token,
                        'username': username,
                        'timestamp': timestamp
                    }
                this.todos_history = []
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
                        this.$message.error('无acs权限！')
                        return
                    }
                    const res = con.todos
                    for (let i=0; i<res.length; i++) {
                        let id = res[i].id
                        let todo = res[i].todo
                        let status = res[i].status
                        let create_date = res[i].create_date
                        create_date = this.formatDate(new Date(parseInt(create_date)))
                        let d = {
                            'id': id,
                            'todo': todo,
                            'status': status,
                            'create_date': create_date
                        }
                        this.todos_history.push(d)
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            showMyselfHistoryOnlyToday () {
                var a = (new Date()).toLocaleDateString()
                a =a.replace(/\//g,'-')
                const timestamp = (new Date(a))/1000 * 1000
                console.log('hello: ' + timestamp)
                this.showHistory(timestamp, this.username)
                this.otherUser = this.username
            },
            showMyselfAllHistory () {
                const timestamp = "1613785971000"
                this.showHistory(timestamp, this.username)
                this.otherUser = this.username
            },
            showOtherHistoryOnlyToday () {
                if (this.username == "shuzhiwei"){
                    this.otherUser = "houtingyu"
                }else{
                    this.otherUser = "shuzhiwei"
                }
                var a = (new Date()).toLocaleDateString()
                a =a.replace(/\//g,'-')
                const timestamp = (new Date(a))/1000 * 1000
                console.log('hello: ' + timestamp)
                this.showHistory(timestamp, this.otherUser)
            },
            showOtherAllHistory () {
                if (this.username == "shuzhiwei"){
                    this.otherUser = "houtingyu"
                }else{
                    this.otherUser = "shuzhiwei"
                }
                const timestamp = "1613785971000"
                this.showHistory(timestamp, this.otherUser)
            },
            showTodo (username) {
                this.todos = []
                const token = this.token
                const url = this.$store.state.base_url + `/entertainment/todoListShow`
                const params = {
                        'token': this.token,
                        'username': username
                    }
                axios.post(url, qs.stringify(params)).then(response => {
                    const con = response.data
                    console.log(con)
                    const code = con.code
                    if (code === 402) {
                        username = getCookie('username')
                        refresh_token(username, token)
                        this.reload()
                        return
                    }
                    if (code === 401) {
                        this.$message.error('无acs权限！')
                        return
                    }
                    const res = con.todos
                    for (let i=0; i<res.length; i++) {
                        let id = res[i].id
                        let todo = res[i].todo
                        let status = res[i].status
                        let create_date = res[i].create_date
                        create_date = this.formatDate(new Date(parseInt(create_date)))
                        let author = res[i].username
                        let priority = res[i].priority
                        let d = {
                            'id': id,
                            'todo': todo,
                            'status': status,
                            'create_date': create_date,
                            'author': author,
                            'priority': priority
                        }
                        this.todos.push(d)
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            showMyselfTodo () {
                this.showTodo(this.username)
                this.otherUser = this.username
                this.todos_history = []
            },
            showOtherTodo () {
                if (this.username == "shuzhiwei"){
                    this.otherUser = "houtingyu"
                }else{
                    this.otherUser = "shuzhiwei"
                }
                this.showTodo(this.otherUser)
                this.todos_history = []
            }
        }

    }
</script>

<style>
/*app*/
.todo-container {
  width: 350px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/*header*/
.todo-header input {
  width: 310px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
<template>
    <div>
            <div class="title" @click="showSub">{{count}}</div>
			<ul class="shop">
                
				<li v-for="(item, key) in addDatas">
					<span class="ziti">{{item.todo}}</span>
					<el-button @click="additem(key, item, $event)">加5分</el-button>
				</li>
                <li v-show="addDatas.length === 0">
                    <el-input v-model="addInput"></el-input>
                    <el-button @click="addFiveInputFunc" size="mini" type="success">加5分</el-button>
                    <el-button @click="addTenInputFunc" size="mini" type="success">加10分</el-button>
                    <!-- <el-button @click="addInputFunc" size="mini" type="success">加20分</el-button> -->
                </li>
			</ul>
            <ul class="shop1" v-show="subFlag">
                <li>
                    <el-input v-model="subInput"></el-input>
                    <el-button @click="subFiveInputFunc" size="mini" type="danger">减5分</el-button>
                    <el-button @click="subTenInputFunc" size="mini" type="danger">减10分</el-button>
                    <!-- <el-button @click="subInputFunc" type="danger">减20分</el-button> -->
                </li>
			</ul>
            <img class="cart" src="../../static/img/存钱罐.png" @click="piggyBankShow"/> 

            <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="30%"
                @click="isShowFunc"
                center>
                <span>
                    <el-timeline :reverse="reverse">
                        <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :timestamp="activity.operate_time">
                        
                        <!-- <div @mouseenter="aaa(true)" @mouseleave="aaa(false)" :style="{background: backColor}"> -->
                            {{activity.todo}} &nbsp;&nbsp; {{activity.score}}
                            <button id="e" class="btn btn-danger" v-show="isShow" @click="delPiggyBank(activity)">删除</button>
                        <!-- </div> -->
                        
                        </el-timeline-item>
                    </el-timeline>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisibleShowControl">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisibleShowControl">确 定</el-button>
                    <i @click="isShowFunc" class="el-icon-edit"></i>
                </span>
            </el-dialog>
            
            
			<!-- <div class="cart" style="">{{count}}</div> -->

				<!--小球-->
				<div v-for="ball in balls">
					<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
						<div class="ball" v-show="ball.show">
							<div class="inner inner-hook"></div>
						</div>
					</transition>
				</div>
		</div>
        
</template>

<script>
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    import {refresh_token} from '../../static/js/acs.js'
    import {api} from '../../static/js/api.js'
    export default {
        inject: ['reload'],
        data () {
            return {
                count: 0,
                items: [{
                        text: "日常任务",
                    },
                    {
                        text: "完成清单",
                    }
                ],
                balls: [ //小球 设为3个
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                ],
                dropBalls: [],
                addInput: '',
                addDatas: [],
                subInput: '',
                subDatas: [],
                subFlag: false,
                centerDialogVisible: false,
                reverse: true,
                activities: [],
                backColor: 'white',
                isShow: false,
            }
        },

        mounted () {
            this.showHistoryOnlyToday()
            this.showPiggyBankCountScore()
        },

        methods: {
            async addFiveInput () {
                const todo = this.addInput
                const username = getCookie('username')
                var a = (new Date()).toLocaleDateString()
                // a =a.replace(/\//g,'-')
                const create_date = (new Date(a))/1000 * 1000
                const score = 5
                await this.piggyBankInsert(todo, create_date, username, score)
                this.addInput = ''
                await this.showPiggyBankCountScore()
            },
            async addTenInput () {
                const todo = this.addInput
                const username = getCookie('username')
                var a = (new Date()).toLocaleDateString()
                // a =a.replace(/\//g,'-')
                const create_date = (new Date(a))/1000 * 1000
                const score = 10
                await this.piggyBankInsert(todo, create_date, username, score)
                this.addInput = ''
                await this.showPiggyBankCountScore()
            },
            addFiveInputFunc (event) {
                this.drop(event.target);
                this.addFiveInput()
            },
            addTenInputFunc (event) {
                this.drop(event.target);
                this.addTenInput()
            },
            centerDialogVisibleShowControl () {
                this.centerDialogVisible = false
                this.isShow = false
                this.showPiggyBankCountScore()
            },
            isShowFunc () {
                if (this.isShow){
                    this.isShow = false
                    this.showPiggyBankCountScore()
                }else[
                    this.isShow = true
                ]
            },
            showSub () {
                if (this.subFlag){
                    this.subFlag = false
                    return
                }
                this.$confirm(`确认要打开减分界面吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() =>{
                    this.subFlag = true
                }).catch(() =>{
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            },
            async showHistory (timestamp) {
                const token = getCookie('lingxi-token')
                const url = this.$store.state.base_url + `/entertainment/todoHisoryOnPiggyBank`
                const params = {
                        'token': token,
                        'timestamp': timestamp
                    }
                const con = await api.post(url, params)
                console.log(con)
                const code = con.code
                if (code === 402) {
                    refresh_token(getCookie('username'), token)
                    await this.showHistory(timestamp)
                    return
                }
                this.addDatas = []
                const res = con.todos
                for (let i=0; i<res.length; i++) {
                    let id = res[i].id
                    let todo = res[i].todo
                    let d = {
                        'id': id,
                        'todo': todo,
                        'username': res[i].username
                    }
                    this.addDatas.push(d)
                }
            },
            async showPiggyBankCountScore () {
                const token = getCookie('lingxi-token')
                const url = this.$store.state.base_url + `/entertainment/piggyBankCountScore`
                const params = {
                        'token': token,
                    }
                const con = await api.post(url, params)
                console.log(con)
                const code = con.code
                if (code === 402) {
                    refresh_token(getCookie('username'), token)
                    await this.showPiggyBankCountScore()
                    return
                }
                this.count = con.data[0]
                console.log('count： ' + this.count)
                if (this.count == 'None'){
                    this.count = 0
                }
            },
            showHistoryOnlyToday () {
                var a = (new Date()).toLocaleDateString()
                // a =a.replace(/\//g,'-')
                const timestamp = (new Date(a))/1000 * 1000
                console.log('hello: ' + timestamp)
                this.showHistory(timestamp)
            },
            async subFiveInputFunc () {
                const todo = this.subInput
                var a = (new Date()).toLocaleDateString()
                // a =a.replace(/\//g,'-')
                const create_date = (new Date(a))/1000 * 1000
                const username = getCookie('username')
                const score = -5
                await this.piggyBankInsert(todo, create_date, username, score)
                this.subInput = ''
                await this.showPiggyBankCountScore()
            },
            async subTenInputFunc () {
                const todo = this.subInput
                var a = (new Date()).toLocaleDateString()
                // a =a.replace(/\//g,'-')
                const create_date = (new Date(a))/1000 * 1000
                const username = getCookie('username')
                const score = -10
                await this.piggyBankInsert(todo, create_date, username, score)
                this.subInput = ''
                await this.showPiggyBankCountScore()
            },
            async additem(key, item, event) {
                const id = item.id
                const todo = item.todo
                const username = item.username
                var a = (new Date()).toLocaleDateString()
                // a =a.replace(/\//g,'-')
                const timestamp = (new Date(a))/1000 * 1000
                console.log('hello: ' + timestamp)
                this.drop(event.target);
                this.count += 5;
                console.log('id: ' + id)
                console.log('key: ' + key)
                // this.addDatas.splice(key, 1)
                await this.updateTodoPiggyBankFlag(id, timestamp)
                await this.showHistoryOnlyToday()
                await this.piggyBankInsert(todo, timestamp, username, 5)
                await this.showPiggyBankCountScore()
            },
            async updateTodoPiggyBankFlag (id, timestamp) {
                const token = getCookie('lingxi-token')
                const url = this.$store.state.base_url + `/entertainment/todoUpdatePiggyBank`
                
                const params = {
                        'token': token,
                        'id': id,
                        'piggy_bank_flag': 1,
                        'operate_date': timestamp
                    }
                const con = await api.post(url, params)
                console.log(con)
                const code = con.code
                if (code === 402) {
                    refresh_token(getCookie('username'), token)
                    await this.updateTodoPiggyBankFlag(id, timestamp)
                }
            },
            async piggyBankInsert (todo, create_date, username, score) {
                const token = getCookie('lingxi-token')
                const url = this.$store.state.base_url + `/entertainment/piggyBankInsert`
                const params = {
                        'token': token,
                        'todo': todo,
                        'create_date': create_date,
                        'operate_time': create_date,
                        'username': username,
                        'score': score
                    }
                const con = await api.post(url, params)
                console.log(con)
                const code = con.code
                if (code === 402) {
                    refresh_token(getCookie('username'), token)
                    await this.piggyBankInsert(todo, create_date, username, score)
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
            async piggyBankShow () {
                this.activities = []
                this.centerDialogVisible = true
                const token = getCookie('lingxi-token')
                const url = this.$store.state.base_url + `/entertainment/piggyBankShow`
                const params = {
                        'token': token,
                    }
                const con = await api.post(url, params)
                console.log(con)
                const code = con.code
                if (code === 402) {
                    refresh_token(getCookie('username'), token)
                    await this.piggyBankShow()
                    return
                }
                const res = con.data
                for (let i=0; i<res.length; i++) {
                    let id = res[i].id
                    let todo = res[i].todo
                    let create_date = this.formatDate(new Date(parseInt(res[i].create_date)))
                    let operate_time = this.formatDate(new Date(parseInt(res[i].operate_time)))
                    let d = {
                        'id': id,
                        'todo': todo,
                        'create_date': create_date,
                        'operate_time': operate_time,
                        'username': res[i].username,
                        'score': res[i].score
                    }
                    this.activities.push(d)
                }
            },
            async deletePiggyBank (ids) {
                const token = getCookie('lingxi-token')
                const url = this.$store.state.base_url + `/entertainment/piggyBankDelete`
                const params = {
                        'token': token,
                        'ids': ids,
                    }
                const con = await api.post(url, params)
                console.log(con)
                const code = con.code
                if (code === 402) {
                    refresh_token(getCookie('username'), token)
                    await this.deletePiggyBank(ids)
                }
               
            },
            delPiggyBank (activity) {
                this.$confirm(`确认完成${activity.todo}吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(async () =>{
                    await this.deletePiggyBank(activity.id)
                    await this.piggyBankShow()
                }).catch(() =>{
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            },
            subitem () {
                this.count -= 5;
            },
            drop(el) { //抛物
                for(let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if(!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },
            beforeDrop(el) { /* 购物车小球动画实现 */
                let count = this.balls.length;
                while(count--) {
                    let ball = this.balls[count];
                    if(ball.show) {
                        let rect = ball.el.getBoundingClientRect(); //元素相对于视口的位置
                        let x = rect.left - 700;
                        let y = -(window.innerHeight - rect.top - 120); //获取y
                        el.style.display = '';
                        el.style.webkitTransform = 'translateY(' + y + 'px)'; //translateY
                        el.style.transform = 'translateY(' + y + 'px)';
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = 'translateX(' + x + 'px)';
                        inner.style.transform = 'translateX(' + x + 'px)';
                    }
                }
            },
            dropping(el, done) { /*重置小球数量  样式重置*/
                let rf = el.offsetHeight;
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend', done);
            },
            afterDrop(el) { /*初始化小球*/
                let ball = this.dropBalls.shift();
                if(ball) {
                    ball.show = false;
                    el.style.display = 'none';
                }
            }
        }
    }
</script>

<style>
    .ziti {
        color: gold;
        font-weight: bolder;

    }

    .title {
        position: fixed;
        top: 120px;
        left: 700px;
        font-size: 35px;
        color: red;
    }

    .shop {
        position: fixed;
        top: 250px;
        left: 400px;
    }
    .shop1 {
        position: fixed;
        top: 250px;
        left: 1000px;
    }
    
    .ball {
        position: fixed;
        left: 700px;
        bottom: 120px;
        z-index: 18000;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        /*贝塞尔曲线*/
    }
    
    .inner {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: gold;
        transition: all 0.4s linear;
    }
    
    .cart {
        position: fixed;
        bottom: 120px;
        left: 600px;
        width: 200px;
        height: 200px;
        /* background-color: rgb(0, 160, 220);
        color: rgb(255, 255, 255); */
        background:#eeeeee;
        opacity:0.9; 
    }
</style>
<template>
<div>
    <div>
        <br>
    <el-button
        @click="addRow()"
        type="success"
        icon="el-icon-plus"
        style="margin-bottom:10px;margin-left: 30px;"
        size="mini"
      ></el-button>

      <el-button
        @click="cancelRow()"
        icon="el-icon-minus"
        style="margin-bottom:10px;"
        size="mini"
      ></el-button>

        <el-table
        height="500"
        border 
    ref="filterTable"
    :data="datas"
    @selection-change="handleSelectionChange"
    style="width: 95%;font-size: 16px;margin-left: 30px;"
    >

    <el-table-column
      prop="username"
      label="username"
      width="500px"
      sortable
      column-key="username"
    >
    <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">
                {{scope.row.username}}
            </span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="username"></el-input>
          </template>
    </el-table-column>

    <el-table-column
      prop="old_password"
      label="old_password"
      sortable
      column-key="old_password"
      v-if="hiddenUrl === true"
    >
    <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.old_password}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="old_password"></el-input>
          </template>
    </el-table-column>
    <el-table-column
      prop="new_password"
      label="new_password"
      sortable
      column-key="new_password"
      v-if="hiddenUrl === true"
    >
    <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.new_password}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="new_password"></el-input>
          </template>
    </el-table-column>

    <el-table-column label="修改" >
          <template slot-scope="scope">
            <i
              @click="editCheck(scope.row)"
              v-if="scope.row.statusBtn===false"
              class="el-icon-edit"
            ></i>
            <i
              @click="sureCheck()"
              v-else-if="scope.row.statusBtn===true"
              class="el-icon-check"
            ></i>
          </template>
        </el-table-column>

        <el-table-column label="删除">
            <template slot-scope="scope">
                <el-button type="text" @click="open(scope)">
                    <i
                        class="el-icon-delete" 
                    ></i>
                </el-button>
            </template>
        </el-table-column>

  </el-table>
    </div>

</div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    import {refresh_token} from '../../static/js/acs.js'
    import PubSub from 'pubsub-js'
    import {api} from '../../static/js/api.js'
    import {b64_md5} from "../../static/js/md5.js"
    export default {
        inject: ['reload'],
        data () {
            return {
                datas: [],
                id: '',
                username: '',
                old_password: '',
                new_password: '',
                tableDataAmount: [],
                hiddenUrl: false
            }
        },

        mounted () {
            if (getCookie('lingxi-token') === 'None') {
                this.$router.push({path: '/login'})
                return
            }
            this.$store.commit('controlShow')
            this.getDatasAll()
        },

        methods: {
            async getDatasAll () {
                const url =  this.$store.state.base_url + `/acs/api/v1/user/show`
                console.log(url)
                const params = {
                }
                const con = await api.post(url, params)
                console.log(con)
                this.datas = []
                const res = con.users
                for (let i=0; i<res.length; i++) {
                    let data = {
                        'id': res[i].id,
                        'username': res[i].username,
                        'statusBtn': false
                    }
                    this.datas.push(data)
                }
                console.log('getDatas执行成功')
            },
            // 选择事件 得到选中的数据
            handleSelectionChange (data) {
                this.tableDataAmount = data
            },

            async delRowsApi (ids, username, old_password) {
                const url = this.$store.state.base_url + '/acs/api/v1/user/delete'
                const params = {
                    "id": ids,
                    "username": old_password,
                }
                const con = await api.post(url, params)
                console.log(con)
                console.log('delRowsApi执行成功')
            },
            
            cancelRow () {
                this.reload()
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            flagFun () {
                const flag = this.datas.every(item => {
                    if (item.username !== '') {
                        return true
                    } else {
                        return false
                    }
                })
                return flag
            },
            addRow () {
                this.hiddenUrl = true
                if (this.datas.length === 0) {
                    this.datas.unshift({ username: '', old_password: '', new_password: '', statusBtn: true })
                } else {
                    for (let i of this.datas) {
                        if (i.statusBtn) return this.$message.warning("请先保存当前编辑项");
                    }
                    if (this.flagFun()) {
                        this.datas.unshift({ username: '',old_password: '', new_password: '', statusBtn: true })
                    } else {
                        this.$message({
                            message: 'username不能为空',
                            type: 'warning'
                        })
                    }
                }
            },

            editCheck (row) {
                this.hiddenUrl = true
                //点击修改 判断是否已经保存所有操作
                for (let i of this.datas) {
                    if (i.statusBtn && i.id != row.id) {
                        this.$message.warning("请先保存当前编辑项");
                        return false;
                    }
                }
                row.statusBtn = true
                this.id = row.id
                this.username = row.username
                this.old_password = row.old_password
                this.new_password = row.new_password
            },

            async addUser () {
                const url = this.$store.state.base_url + '/acs/api/v1/user/add'
                const params = {
                    'username': this.username,
                    'password': b64_md5(this.new_password),
                }
                const con = await api.post(url, params)
                console.log(con)
                console.log('insertBookMarks执行成功')
                // this.checkTable()
            },
            async updataUser () {
                const url = this.$store.state.base_url + '/acs/api/v1/user/update'
                const params = {
                    'id': this.id,
                    'username': this.username,
                    'old_password': b64_md5(this.old_password),
                    'new_password': b64_md5(this.new_password),
                }
                try {
                    const con = await api.post(url, params)
                    console.log(con)
                } catch (error) {
                    this.$message.error('密码输入错误！')
                }
                
            },
            // 勾选弹框保存按钮
            async sureCheck () {
                if (this.id === '') {
                    // 新建
                    if (this.username !== '') {
                        await this.addUser()
                        await this.getDatasAll()
                    }else{
                        this.$message.error('请补全数据')
                    }
                }else{
                    // 修改
                    await this.updataUser()
                    await this.getDatasAll()
                }
                this.id = ''
                this.username = ''
                this.old_password = ''
                this.new_password = ''
                this.hiddenUrl = false
            },

            open (scope) {
                this.$prompt('请输入旧密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(async ({ value }) => {
                    await this.delRowsApi(scope.row.id, scope.row.username, value)
                    await this.getDatasAll()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });       
                });
            }
        }
    }
</script>

<style>
.inline-block {
  display: inline-block;
}
</style>
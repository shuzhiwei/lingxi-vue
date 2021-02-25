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

      <el-button
        @click="delRows()"
        icon="el-icon-delete"
        type="danger"
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
      type="selection"
      >
    </el-table-column>

    <!-- <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column> -->

    <el-table-column
      prop="name"
      label="name"
      sortable
      column-key="name"
    >
    <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">
                <el-link type="primary" style="font-size: 16px;" :href="scope.row.url" target="_blank">{{scope.row.name}}</el-link>
            </span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="name"></el-input>
          </template>
    </el-table-column>

    <el-table-column
      prop="url"
      label="url"
      sortable
      column-key="url"
      v-if="hiddenUrl === true"
    >
    <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.url}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="url"></el-input>
          </template>
    </el-table-column>

    <el-table-column label="操作" >
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
            <i
             class="el-icon-delete" 
             @click="deleteFun(scope)"
             ></i>
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
    export default {
        inject: ['reload'],
        data () {
            return {
                datas: [],
                username: getCookie('username'),
                id: '',
                name: '',
                url: '',
                author: '',
                tableDataAmount: [],
                hiddenUrl: false
            }
        },

        mounted () {
            this.getDatas()
        },

        methods: {
            async getDatas () {
                const token = getCookie('lingxi-token')
                const url =  this.$store.state.base_url + `/entertainment/bookMarksShow`
                console.log(url)
                const params = {
                    'token': token,
                    'author': this.username
                }
                const con = await api.post(url, params)
                console.log(con)
                const code = con.code
                if (code === 402) {
                    refresh_token(this.username, token)
                    this.getDatas()
                    return
                }
                this.datas = []
                const res = con.memory_palaces
                for (let i=0; i<res.length; i++) {
                    let data = {
                        'id': res[i].id,
                        'name': res[i].name,
                        'url': res[i].url,
                        'author': res[i].author,
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
            async delRowsApi (ids) {
                const token = getCookie('lingxi-token')
                const url = this.$store.state.base_url + '/entertainment/bookMarksDelete'
                const params = {
                    'token': token,
                    "ids": ids
                }
                const con = await api.post(url, params)
                if (con.code === 402) {
                    refresh_token(this.username, token)
                    this.delRowsApi(ids)
                    return
                }
                console.log('delRowsApi执行成功')
            },
            delRows () {
                this.$confirm(`确认删除吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(async () =>{
                    // 拿到选中的数据；
                    var val = this.tableDataAmount
                    // 如果选中数据存在
                    if (val) {
                        // 将选中数据遍历
                        var ids = ''
                        for(let i=0; i<val.length; i++){
                            ids = ids + val[i].id + ','
                        }
                        console.log('ids: ' + ids)  
                        await this.delRowsApi(ids)        
                        await this.getDatas()
                    }
                }).catch(() =>{
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })

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
                    if (item.name !== '' && item.url !== '') {
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
                    this.datas.unshift({ name: '', url: '', statusBtn: true })
                } else {
                    for (let i of this.datas) {
                        if (i.statusBtn) return this.$message.warning("请先保存当前编辑项");
                    }
                    if (this.flagFun()) {
                        this.datas.unshift({ name: '', url: '', statusBtn: true })
                    } else {
                        this.$message({
                            message: 'name不能为空',
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
                this.name = row.name
                this.url = row.url
            },

            async insertBookMarks () {
                const token = getCookie('lingxi-token')
                const url = this.$store.state.base_url + '/entertainment/bookMarksInsert'
                const create_date = (new Date()).valueOf()
                const params = {
                    'token': token,
                    'name': this.name,
                    'url': this.url,
                    'create_date': create_date,
                    'author': this.username,
                }
                const con = await api.post(url, params)
                if (con.code === 402) {
                    refresh_token(this.username, token)
                    this.insertBookMarks()
                    return
                }
                this.$message.success('保存成功')
                console.log('insertBookMarks执行成功')
                // this.checkTable()
            },
            async updataBookMarks () {
                const token = getCookie('lingxi-token')
                const url = this.$store.state.base_url + '/entertainment/bookMarksUpdate'
                const params = {
                    'token': token,
                    'id': this.id,
                    'name': this.name,
                    'url': this.url,
                }
                const con = await api.post(url, params)
                if (con.code === 402) {
                    refresh_token(this.username, token)
                    this.updataBookMarks()
                    return
                }
            },
            // 勾选弹框保存按钮
            async sureCheck () {
                if (this.id === '') {
                    // 新建
                    if (this.name !== '' && this.url !== '') {
                        await this.insertBookMarks()
                        await this.getDatas()
                    }else{
                        this.$message.error('请补全数据')
                    }
                }else{
                    // 修改
                    await this.updataBookMarks()
                    await this.getDatas()
                }
                this.id = ''
                this.name = ''
                this.url = ''
            },

            async deleteBookMarks (ids) {
                const token = getCookie('lingxi-token')
                const url = this.$store.state.base_url + '/entertainment/bookMarksDelete'
                const params = {
                    'token': token,
                    "ids": ids + ','
                }
                const con = await api.post(url, params)
                if (con.code === 402){
                    refresh_token(this.username, token)
                    this.deleteBookMarks()
                }
                console.log('deleteBookMarks执行成功')
            },
            // 删除一行
            deleteFun (scope) {
                const ids = scope.row.id
                if (!ids) {
                    this.$message.error('id为空')
                    this.tableData.splice(scope.$index, 1)
                } else {
                    this.$confirm(`确认删除吗？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'success'
                    }).then(async () =>{
                        await this.deleteBookMarks(ids)
                        await this.getDatas()
                    }).catch(() =>{
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
                }
            },
        }
    }
</script>

<style>
.inline-block {
  display: inline-block;
}
</style>
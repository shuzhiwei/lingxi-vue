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
    export default {
        inject: ['reload'],
        data () {
            return {
                datas: [],
                token: getCookie('lingxi-token'),
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
            const token = this.token
            const url =  this.$store.state.base_url + `/entertainment/bookMarksShow`
            console.log(url)
            const params = {
                'token': token,
                'author': this.username
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
                this.totalPage = con.totalPage
                this.totalCount = con.totalCount
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
            }).catch(error => {
                console.log(error)
                this.$message.error(error)
            })

            
        },

        methods: {

            // 选择事件 得到选中的数据
            handleSelectionChange (data) {
                this.tableDataAmount = data
            },

            delRows () {
                this.$confirm(`确认删除吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() =>{
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
                        const url = this.$store.state.base_url + '/entertainment/bookMarksDelete'
                        const params = {
                            'token': this.token,
                            "ids": ids
                        }
                        axios.post(url, qs.stringify(params)).then(res => {
                            console.log(res.data.code)
                            console.log(res.data)
                        }).catch(error => {
                            console.log(error)
                        })
                        this.reload()
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
                    if (item.p_type !== '' && item.v0 !== '' && item.v1 !== '') {
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
            // 勾选弹框保存按钮
            sureCheck () {
                if (this.id === '') {
                    // 新建
                    if (this.p_type !== '' && this.v0 !== '' && this.v1 !== '') {
                        const url = this.$store.state.base_url + '/entertainment/bookMarksInsert'
                        const create_date = (new Date()).valueOf()
                        const params = {
                            'token': this.token,
                            'name': this.name,
                            'url': this.url,
                            'create_date': create_date,
                            'author': this.username,
                        }
                        axios.post(url, qs.stringify(params)).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success('保存成功')
                                this.id = ''
                                this.reload()
                                // this.checkTable()
                            } else {
                                this.$message.error(res.data.code)
                            }
                        }).catch(error =>{
                            console.log(error)
                        })
                    }else{
                        this.$message.error('请补全数据')
                    }
                }else{
                    // 修改
                    const url = this.$store.state.base_url + '/entertainment/bookMarksUpdate'
                    const params = {
                        'token': this.token,
                        'id': this.id,
                        'name': this.name,
                        'url': this.url,
                    }
                    axios.post(url, qs.stringify(params)).then(res => {
                        console.log(res.data)
                        this.id = ''
                        this.reload()
                    }).catch(error =>{
                        console.log(error)
                    })
                }

                
            },
            // 删除一行
            deleteFun (scope) {
                if (!scope.row.id) {
                    this.$message.error('id为空')
                    this.tableData.splice(scope.$index, 1)
                } else {
                    this.$confirm(`确认删除吗？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'success'
                    }).then(() =>{
                        const url = this.$store.state.base_url + '/entertainment/bookMarksDelete'
                        const params = {
                            'token': this.token,
                            "ids": scope.row.id + ','
                        }
                        axios.post(url, qs.stringify(params)).then(res => {
                            console.log(res.data)
                            this.reload()
                        }).catch(error => {
                            console.log(error)
                        })
                    }).catch(() =>{
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
                }
            },
            deleteAuth () {
                if (confirm('确定删除吗？') === true) {
                    var aa = this.$refs.inputTitle
                    var checkboxValues = ''
                    for (let i=0; i<aa.length; i++) {
                        if (aa[i].checked) {
                            checkboxValues = checkboxValues + aa[i].value + ','
                            // checkboxValues.push(aa[i].value)
                        }
                    }
                    if (!checkboxValues) {
                        this.$message.error('不能删除0条！')
                    }else{
                        const url = this.$store.state.base_url + `/entertainment/bookMarksDelete`
                        const params = {
                            "token": this.token,
                            "ids": checkboxValues
                        }
                        axios.post(url, qs.stringify(params)).then(response => {
                            let res = response.data
                            if (res.code === 200) {
                                this.reload()
                            }else{
                                this.$message.error(res.code)
                            }
                        })
                        
                    }
                }
            }
        }
    }
</script>

<style>
.inline-block {
  display: inline-block;
}
</style>
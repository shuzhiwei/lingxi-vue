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
      prop="address"
      label="address"
      sortable
      column-key="address"
    >
    <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.address}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="address" @keyup.enter.native="sureCheck"></el-input>
          </template>
    </el-table-column>

    <el-table-column
      prop="p1"
      label="p1"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.p1}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="p1" @keyup.enter.native="sureCheck"></el-input>
          </template>
    </el-table-column>

    <el-table-column
      prop="p2"
      label="p2"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.p2}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="p2" @keyup.enter.native="sureCheck"></el-input>
          </template>
    </el-table-column>

    <el-table-column
      prop="p3"
      label="p3"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.p3}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="p3" @keyup.enter.native="sureCheck"></el-input>
          </template>
    </el-table-column>

    <el-table-column
      prop="p4"
      label="p4"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.p4}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="p4" @keyup.enter.native="sureCheck"></el-input>
          </template>
    </el-table-column>

    <el-table-column
      prop="p5"
      label="p5"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.p5}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="p5" @keyup.enter.native="sureCheck"></el-input>
          </template>
    </el-table-column>

    <el-table-column
      prop="p6"
      label="p6"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.p6}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="p6" @keyup.enter.native="sureCheck"></el-input>
          </template>
    </el-table-column>

    <el-table-column
      prop="p7"
      label="p7"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.p7}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="p7" @keyup.enter.native="sureCheck"></el-input>
          </template>
    </el-table-column>

    <el-table-column
      prop="p8"
      label="p8"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.p8}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="p8" @keyup.enter.native="sureCheck"></el-input>
          </template>
    </el-table-column>

    <el-table-column
      prop="p9"
      label="p9"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.p9}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="p9" @keyup.enter.native="sureCheck"></el-input>
          </template>
    </el-table-column>

    <el-table-column
      prop="p10"
      label="p10"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.p10}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="p10" @keyup.enter.native="sureCheck"></el-input>
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
                token: getCookie('lingxi-token'),
                username: getCookie('username'),
                id: '',
                address: '',
                p1: '',
                p2: '',
                p3: '',
                p4: '',
                p5: '',
                p6: '',
                p7: '',
                p8: '',
                p9: '',
                p10: '',
                tableDataAmount: [],
            }
        },

        mounted () {
            const url =  this.$store.state.base_url + `/entertainment/memoryPalaceShow`
            console.log(url)
            const params = {
                'token': getCookie('lingxi-token'),
                'author': this.username
            }
            axios.post(url, qs.stringify(params)).then(response => {
                const con = response.data
                console.log(con)
                const code = con.code
                if (code === 402) {
                    refresh_token(getCookie('username'), getCookie('lingxi-token'))
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
                        'address': res[i].address,
                        'p1': res[i].p1,
                        'p2': res[i].p2,
                        'p3': res[i].p3,
                        'p4': res[i].p4,
                        'p5': res[i].p5,
                        'p6': res[i].p6,
                        'p7': res[i].p7,
                        'p8': res[i].p8,
                        'p9': res[i].p9,
                        'p10': res[i].p10,
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
                        const url = this.$store.state.base_url + '/entertainment/memoryPalaceDelete'
                        const params = {
                            'token': getCookie('lingxi-token'),
                            "ids": ids
                        }
                        const con = await api.post(url, params)
                        if (con.code === 402) {
                            refresh_token(getCookie('username'), getCookie('lingxi-token'))
                            await this.delRows()
                        }
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
                if (this.datas.length === 0) {
                    this.datas.unshift({ address: '', p1: '', p2: '', p3: '', p4: '', p5: '', p6: '', p7: '', p8: '', p9: '', p10: '', statusBtn: true })
                } else {
                    for (let i of this.datas) {
                        if (i.statusBtn) return this.$message.warning("请先保存当前编辑项");
                    }
                    if (this.flagFun()) {
                        this.datas.unshift({ address: '', p1: '', p2: '', p3: '', p4: '', p5: '', p6: '', p7: '', p8: '', p9: '', p10: '', statusBtn: true })
                    } else {
                        this.$message({
                            message: 'address和p1不能为空',
                            type: 'warning'
                        })
                    }
                }
            },

            editCheck (row) {
                //点击修改 判断是否已经保存所有操作
                for (let i of this.datas) {
                    if (i.statusBtn && i.id != row.id) {
                        this.$message.warning("请先保存当前编辑项");
                        return false;
                    }
                }
                row.statusBtn = true
                this.id = row.id
                this.address = row.address
                this.p1 = row.p1
                this.p2 = row.p2
                this.p3 = row.p3
                this.p4 = row.p4
                this.p5 = row.p5
                this.p6 = row.p6
                this.p7 = row.p7
                this.p8 = row.p8
                this.p9 = row.p9
                this.p10 = row.p10
            },
            // 勾选弹框保存按钮
            sureCheck () {
                if (this.id === '') {
                    // 新建
                    if (this.p_type !== '' && this.v0 !== '' && this.v1 !== '') {
                        const url = this.$store.state.base_url + '/entertainment/memoryPalaceInsert'
                        const params = {
                            'token': this.token,
                            'address': this.address,
                            'p1': this.p1,
                            'p2': this.p2,
                            'p3': this.p3,
                            'p4': this.p4,
                            'p5': this.p5,
                            'p6': this.p6,
                            'p7': this.p7,
                            'p8': this.p8,
                            'p9': this.p9,
                            'p10': this.p10,
                            'author': this.username
                        }
                        axios.post(url, qs.stringify(params)).then(res => {
                            const con = res.data
                            if (con.code === 402) {
                                refresh_token(getCookie('username'), getCookie('lingxi-token'))
                                this.sureCheck()
                                return
                            }
                            if (con.code === 200) {
                                this.$message.success('保存成功')
                                this.id = ''
                                this.reload()
                                // this.checkTable()
                            }else{
                                console.log(con)
                            }
                        }).catch(error =>{
                            console.log(error)
                        })
                    }else{
                        this.$message.error('请补全数据')
                    }
                }else{
                    // 修改
                    const url = this.$store.state.base_url + '/entertainment/memoryPalaceUpdate'
                    const params = {
                        'token': this.token,
                        'id': this.id,
                        'address': this.address,
                        'p1': this.p1,
                        'p2': this.p2,
                        'p3': this.p3,
                        'p4': this.p4,
                        'p5': this.p5,
                        'p6': this.p6,
                        'p7': this.p7,
                        'p8': this.p8,
                        'p9': this.p9,
                        'p10': this.p10,
                    }
                    axios.post(url, qs.stringify(params)).then(res => {
                        const con = res.data
                        if (con.code === 402) {
                            refresh_token(getCookie('username'), getCookie('lingxi-token'))
                            this.sureCheck()
                            return
                        }
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
                        const url = this.$store.state.base_url + '/entertainment/memoryPalaceDelete'
                        const params = {
                            'token': this.token,
                            "ids": scope.row.id + ','
                        }
                        axios.post(url, qs.stringify(params)).then(res => {
                            const con = res.data
                            if (con.code === 402) {
                                refresh_token(getCookie('username'), getCookie('lingxi-token'))
                                this.deleteFun(scope)
                                return
                            }
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
        }
    }
</script>

<style>
.inline-block {
  display: inline-block;
}
</style>
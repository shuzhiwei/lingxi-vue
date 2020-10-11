<template>
<div>
    <div>
        <br>
    <el-button
        @click="addRow()"
        type="success"
        icon="el-icon-plus"
        style="margin-bottom:10px;"
        size="mini"
      >添加</el-button>

      <el-button
        @click="cancelRow()"
        icon="el-icon-minus"
        style="margin-bottom:10px;"
        size="mini"
      >取消</el-button>

      <el-button
        @click="delRows()"
        icon="el-icon-delete"
        type="danger"
        style="margin-bottom:10px;"
        size="mini"
      >批量删除</el-button>

        <el-table
        height="500"
        border 
    ref="filterTable"
    :data="datas"
    @selection-change="handleSelectionChange"
    style="width: 100%;font-size: 18px;">

    <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <!-- <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column> -->

    <el-table-column
      prop="p_type"
      label="p_type"
      sortable
      width="180"
      column-key="p_type"
      :filters="[{text: 'p', value: 'p'}, {text: 'g', value: 'g'}]"
      :filter-method="filterHandler"
    >
    <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.p_type}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="p_type"></el-input>
          </template>
    </el-table-column>
    <el-table-column
      prop="v0"
      label="v0"
      :filters="[{text: 'shuzhiwei', value: 'shuzhiwei'}, 
                {text: 'admin', value: 'admin'},
                {text: 'houtingyu', value: 'houtingyu'},
                {text: 'admin_role', value: 'admin_role'},
                {text: 'user_role', value: 'user_role'},
                ]"
      :filter-method="filterHandler"
      width="180">
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.v0}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="v0"></el-input>
          </template>
    </el-table-column>
    <el-table-column
      prop="v1"
      label="v1"
      width="180"
      column-key="v1"
      :filters="[{text: 'acs', value: 'acs'}, {text: 'blog', value: 'blog'}, {text: 'rde', value: 'rde'}]"
      :filter-method="filterHandler"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.v1}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="v1"></el-input>
          </template>
    </el-table-column>
    <el-table-column
      prop="v2"
      label="v2"
      width="180">
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.v2}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="v2"></el-input>
          </template>
    </el-table-column>
    <el-table-column
      prop="v3"
      label="v3"
      width="180">
      <template slot-scope="scope">
            <span v-if="scope.row.statusBtn===false">{{scope.row.v3}}</span>
            <el-input size="mini" v-else-if="scope.row.statusBtn===true" v-model="v3"></el-input>
          </template>
    </el-table-column>
    <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="editCheck(scope.row)"
              v-if="scope.row.statusBtn===false"
              icon="el-icon-edit"
            >编辑</el-button>
            <el-button
              style="display: inline-block"
              type="success"
              size="mini"
              @click="sureCheck()"
              v-else-if="scope.row.statusBtn===true"
              icon="el-icon-check"
            >保存</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteFun(scope)">删除</el-button>
          </template>
        </el-table-column>

  </el-table>
    </div>

    <div class="block"  style="text-align:center">
        <el-pagination
            v-if="paginationShow"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNo"
            :page-size="200"
            layout="total, prev, pager, next, jumper"
            font-size="30px"
            :total="totalCount">
        </el-pagination>
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
                id: '',
                p_type: '',
                v0: '',
                v1: '',
                v2: '',
                v3: '',
                tableDataAmount: [],

                pageSize: 200,//默认的请求pageSize = 15
                pageNo: 1,//当前页码
                totalPage: 0,//总页数
                paginationShow: false,//是否显示分页
                totalCount: 0,//总条数
            }
        },

        mounted () {
            const token = this.token
            const url = `https://www.食.tech/acs-manage/policy/show`
            const params = {
                'token': token,
                'pageSize': this.pageSize,
                'pageNo': this.pageNo
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
                    alert(con.message)
                    return
                }
                this.totalPage = con.totalPage
                this.totalCount = con.totalCount
                const res = con.data
                for (let i=0; i<res.length; i++) {
                    let data = {
                        'id': res[i].id,
                        'p_type': res[i].p_type,
                        'v0': res[i].v0,
                        'v1': res[i].v1,
                        'v2': res[i].v2,
                        'v3': res[i].v3,
                        'statusBtn': false
                    }
                    this.datas.push(data)
                }
                if (this.totalPage > 1) {
                    this.paginationShow = true
                }
            }).catch(error => {
                console.log(error)
                alert(error)
            })

            
        },

        methods: {
            //改变每页显示数量时调用
            handleSizeChange(val) {
                this.$nextTick(() =>
                    this.getPageData(),
                )
            },
            //点击下一页和点击页码时执行
            handleCurrentChange(val) {
                this.getPageData();
            },
            //获取分页数据totalDataNumber
            getPageData: function () {
                const url = "https://www.食.tech/acs-manage/policy/show"
                const params = {
                    'token': this.token,
                    'pageSize': this.pageSize,
                    'pageNo': this.pageNo
                }
                axios.post(url, qs.stringify(params)).then(response =>{
                    const con = response.data
                    const code = con.code
                    console.log(code)
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
                    const res = con.data
                    this.datas = []
                    for (let i=0; i<res.length; i++) {
                        let id = res[i].id
                        let p_type = res[i].p_type
                        let v0 = res[i].v0
                        let v1 = res[i].v1
                        let v2 = res[i].v2
                        let v3 = res[i].v3
                        let data = {
                            'id': id,
                            'p_type': p_type,
                            'v0': v0,
                            'v1': v1,
                            'v2': v2,
                            'v3': v3,
                            'statusBtn': false
                        }
                        this.datas.push(data)
                    }
                }).catch(error => {
                    console.log(error)
                    alert(error)
                })
            },

            // 选择事件 得到选中的数据
            handleSelectionChange (data) {
                this.tableDataAmount = data
            },

            delRows () {
                if (confirm('确定删除吗？') === true) {
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
                        const url = 'https://www.食.tech/acs-manage/policy/delete'
                        const params = {
                            'token': this.token,
                            "ids": ids
                        }
                        axios.post(url, qs.stringify(params)).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success('删除成功')
                            }else{
                                alert(res.data.code)
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                        this.reload()
                    }
                }else{
                    this.$message.success('已取消删除')
                }
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
                    this.datas.unshift({ p_type: '', v0: '', v1: '', v2: '', v3: '', statusBtn: true })
                } else {
                    for (let i of this.datas) {
                        if (i.statusBtn) return this.$message.warning("请先保存当前编辑项");
                    }
                    if (this.flagFun()) {
                        this.datas.unshift({ p_type: '', v0: '', v1: '', v2: '', v3: '', statusBtn: true })
                    } else {
                        this.$message({
                            message: 'p_type和v0不能为空',
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
                this.p_type = row.p_type
                this.v0 = row.v0
                this.v1 = row.v1
                this.v2 = row.v2
                this.v3 = row.v3
            },
            // 勾选弹框保存按钮
            sureCheck () {
                console.log(this.p_type + ',' + this.v0)

                if (this.id === '') {
                    // 新建
                    if (this.p_type !== '' && this.v0 !== '' && this.v1 !== '') {
                        const url = 'https://www.食.tech/acs-manage/policy/add'
                        const params = {
                            'token': this.token,
                            'p_type': this.p_type,
                            'v0': this.v0,
                            'v1': this.v1,
                            'v2': this.v2,
                            'v3': this.v3
                        }
                        axios.post(url, qs.stringify(params)).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success('保存成功')
                                this.id = ''
                                this.reload()
                                // this.checkTable()
                            } else {
                                alert(res.data.code)
                            }
                        }).catch(error =>{
                            console.log(error)
                        })
                    }else{
                        alert('请补全数据')
                    }
                }else{
                    // 修改
                    if (this.p_type !== '' && this.v0 !== '' && this.v1 !== '') {
                        const url = 'https://www.食.tech/acs-manage/policy/update'
                        const params = {
                            'token': this.token,
                            'id': this.id,
                            'p_type': this.p_type,
                            'v0': this.v0,
                            'v1': this.v1,
                            'v2': this.v2,
                            'v3': this.v3
                        }
                        axios.post(url, qs.stringify(params)).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success('保存成功')
                                this.id = ''
                                this.reload()
                                // this.checkTable()
                            } else {
                                alert(res.data.code)
                            }
                        }).catch(error =>{
                            console.log(error)
                        })
                    }
                }

                
            },
            // 删除一行
            deleteFun (scope) {
                if (!scope.row.id) {
                    alert('id为空')
                    this.tableData.splice(scope.$index, 1)
                } else {
                    if (confirm('确定删除吗？' + scope.row.p_type + ', ' + scope.row.v0 + ', ' + scope.row.v1 + ', ' + scope.row.v2 + ', ' + scope.row.v3) === true) {
                        const url = 'https://www.食.tech/acs-manage/policy/delete'
                        const params = {
                            'token': this.token,
                            "ids": scope.row.id + ','
                        }
                        axios.post(url, qs.stringify(params)).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success('删除成功')
                                this.reload()
                            }else{
                                alert(res.data.code)
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                    }else{
                        this.$message.success('已取消删除')
                    }
                        
                    
                }
            },

            addAuth () {
                this.$router.push({path: '/main/addAuth'})
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
                        alert('不能删除0条！')
                    }else{
                        const url = `https://www.食.tech/acs-manage/policy/delete`
                        const params = {
                            "token": this.token,
                            "ids": checkboxValues
                        }
                        axios.post(url, qs.stringify(params)).then(response => {
                            let res = response.data
                            if (res.code === 200) {
                                this.reload()
                            }else{
                                alert(res.code)
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
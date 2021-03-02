<template>
    <div align="center">
        <br>
        <table>
        <tr >
            <!-- <th><label for="title">搜索：</label></th> -->
            <td>
                <!-- <input id="title" name="title" size="30" type="text" v-model="title"/> -->
                <el-input
                    placeholder="请输入关键字"
                    v-model="keyword"
                    @keyup.enter.native="search1"
                    clearable>
                </el-input>
            </td>
            <td>
                <el-button type="primary" @click="search1">
                    搜索
                </el-button>
            </td>
        </tr>
        <tr>    
                &nbsp;&nbsp;&nbsp;&nbsp;
                <el-dropdown @command="handleCommand" trigger="click">
                    <span class="el-dropdown-link">
                        类型<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="blog">博客</el-dropdown-item>
                        <el-dropdown-item command="book_marks">书签</el-dropdown-item>
                        <el-dropdown-item command="stock">股票</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span v-show="(this.dropdownValue !== 'default')">
                    <font size="2px">{{dropdownValue}}</font><i class="el-icon-delete" @click="removeDropdownValue"></i>
                </span>
        </tr>

    </table>
    <br>

    <el-table
        height="500"
    ref="filterTable"
    :data="datas"
    style="width: 90%;font-size: 16px;margin-left: 1px;">

     <el-table-column
      prop="查询结果"
      label="查询结果"
      >
        <template slot-scope="scope">

            <router-link v-if="scope.row.id.length < 10" :to="`${scope.row.html_path}/${scope.row.id}`">
                <h5 style="font-size: 15px; color: green" v-if="scope.row.highlight" v-html="scope.row.highlight">
                </h5>
                <span v-else>
                    <h5 style="font-size: 15px; color: red">{{scope.row.title}}</h5>
                    <h5 style="font-size: 15px; color: red">{{scope.row.name}}</h5>
                    <h5 style="font-size: 15px; color: red" v-show="scope.row.update_date">{{scope.row.code_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.update_date}}&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.private_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.html_path}}</h5>
                </span>
            </router-link>

            <router-link v-else-if="scope.row.id.length === 19 || scope.row.id.length === 17" :to="`${scope.row.html_path}/${scope.row.code}/${scope.row.update_date}`">
                <h5 style="font-size: 15px; color: green" v-if="scope.row.highlight" v-html="scope.row.highlight">
                </h5>
                <span v-else>
                    <h5 style="font-size: 15px; color: red">{{scope.row.title}}</h5>
                    <h5 style="font-size: 15px; color: red">{{scope.row.name}}</h5>
                    <h5 style="font-size: 15px; color: red">{{scope.row.code_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.update_date}}&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.private_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.html_path}}</h5>
                </span>
            </router-link>

            <router-link v-else :to="`${scope.row.html_path}/${scope.row.id}`">
                <h5 style="font-size: 15px; color: green" v-if="scope.row.highlight" v-html="scope.row.highlight">
                </h5>
                <span v-else>
                    <h5 style="font-size: 15px; color: red">{{scope.row.title}}</h5>
                    <h5 style="font-size: 15px; color: red">{{scope.row.name}}</h5>
                    <h5 style="font-size: 15px; color: red">{{scope.row.code_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.update_date}}&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.private_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.html_path}}</h5>
                </span>
            </router-link>
        </template>
    </el-table-column>
  </el-table>
    <br><br>
    </div>
</template>
<script>
    import axios from 'axios'
    import qs from 'qs'
    import {api} from '../../static/js/api.js'
    import {getDateDiff} from '../../static/js/parse_time.js'
    export default {
        data () {
            return {
                keyword: '',
                datas: [],
                dropdownValue: 'default',
            }
        },

        mounted () {
        },
        
        methods: {
            async base_search (url, params) {
                console.log(url)
                console.log(params)
                const con = await api.es_post(url, params)
                var hits = con.data.hits.hits
                console.log(hits)
                if (hits.length === 0) {
                    this.$message.success('搜索无果！')
                    return
                }
                this.datas = []
                for (let i=0; i<hits.length; i++) {
                    var html_path = hits[i]._source.html_path
                    html_path = html_path.split(',')
                    for (let j=0; j<html_path.length; j++){
                        var highlight = ''
                        try {
                            highlight = hits[i].highlight.content[0]
                        } catch (error) {
                            highlight = ''
                        }
                        var subContent = hits[i]._source.content
                        if (subContent) {
                            subContent = subContent.substr(0, 20)
                        }
                        let data = {
                            'id': hits[i]._id,
                            'title': hits[i]._source.title,
                            'author': hits[i]._source.author,
                            'content': subContent,
                            'imageAddr': hits[i]._source.imageAddr,
                            'html_path': html_path[j],
                            'posted_on': getDateDiff(hits[i]._source.posted_on * 1000),
                            'share_flag': hits[i]._source.share_flag,
                            'highlight': highlight,

                            'name': hits[i]._source.name,
                            'url': hits[i]._source.url,

                            'create_date': hits[i]._source.create_date,
                            'update_date': hits[i]._source.update_date,
                            'code': hits[i]._source.code,
                            'code_name': hits[i]._source.code_name,
                            'private_name': hits[i]._source.private_name,

                        }
                        this.datas.push(data)
                    }
                    
                }
            },

            async searchDefault () {
                const url = 'https://www.nnbkqnp.cn:7991/lingxi/_search'
                const params = '{"query":{"bool":{"should":[{"match":{"title":"' + this.keyword + '"}},{"match":{"content":"' + this.keyword + '"}},{"match":{"author":"' + this.keyword + '"}},{"match":{"name":"' + this.keyword + '"}}]}},"highlight":{"boundary_scanner_locale":"zh_CN","fields":{"title":{"pre_tags":["<em>"],"post_tags":["</em>"]}, "content":{"pre_tags":["<em>"],"post_tags":["</em>"]}}}, "from": 0, "size": 50}'
                this.base_search(url, params)
            },

            async search1 () {
                console.log(this.dropdownValue)
                if (this.dropdownValue === 'blog') {
                    this.searchBlog()
                }else if (this.dropdownValue === 'book_marks') {
                    this.searchBookMarks()
                }else if (this.dropdownValue === 'stock') {
                    this.searchStock()
                }else if (this.dropdownValue === 'default') {
                    this.searchDefault()
                }else{
                    // this.search()
                    this.searchDefault()
                }
            },

            async searchBlog () {
                const url = 'https://www.nnbkqnp.cn:7991/lingxi/entries/_search'
                const params = '{"query":{"bool":{"should":[{"match":{"title":"' + this.keyword + '"}},{"match":{"content":"' + this.keyword + '"}},{"match":{"author":"' + this.keyword + '"}}]}},"highlight":{"boundary_scanner_locale":"zh_CN","fields":{"title":{"pre_tags":["<em>"],"post_tags":["</em>"]}, "content":{"pre_tags":["<em>"],"post_tags":["</em>"]}}}}'
                this.base_search(url, params)
            },

            async searchBookMarks () {
                const url = 'https://www.nnbkqnp.cn:7991/lingxi/book_marks/_search'
                const params = '{"query":{"bool":{"should":[{"match":{"name":"' + this.keyword + '"}}]}},"highlight":{"boundary_scanner_locale":"zh_CN","fields":{"title":{"pre_tags":["<em>"],"post_tags":["</em>"]}, "content":{"pre_tags":["<em>"],"post_tags":["</em>"]}}}}'
                this.base_search(url, params)
            },

            async searchStock () {
                const url = 'https://www.nnbkqnp.cn:7991/lingxi/_search'
                const params = '{"query":{"bool":{"should":[{"match":{"code":"' + this.keyword + '"}},{"match":{"code_name":"' + this.keyword + '"}},{"match":{"private_name":"' + this.keyword + '"}}]}},"highlight":{"boundary_scanner_locale":"zh_CN","fields":{"title":{"pre_tags":["<em>"],"post_tags":["</em>"]}, "content":{"pre_tags":["<em>"],"post_tags":["</em>"]}}}, "from": 0, "size": 50}'
                this.base_search(url, params)
            },

            handleCommand(command) {
                this.dropdownValue = command
                console.log(this.dropdownValue)
            },

            removeDropdownValue () {
                this.dropdownValue = ''
            }

        }

    }
</script>

<style>
em {
  color: red;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
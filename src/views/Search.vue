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
                    @keyup.enter.native="search"
                    clearable>
                </el-input>
            
            </td>
            <td>
                <el-button type="primary" @click="search">
                    搜索
                </el-button>
            </td>
        </tr>
        

    </table>
    <br><br>

    <el-table
        height="500"
        border
    ref="filterTable"
    :data="datas"
    style="width: 80%;font-size: 16px;margin-left: 30px;">

     <el-table-column
      prop="查询结果"
      label="查询结果"
      >
        <template slot-scope="scope">
            <!-- <router-link :to="`/main/${scope.row.path}/${scope.row.id}`"><font color="green">{{scope.row.id}}</font></router-link> -->
            <!-- <router-link :to="`/main/detail/321`"><font color="green">{{scope.row.id}}</font></router-link> -->
            <router-link :to="`${scope.row.html_path}/${scope.row.id}`">
                <h5 style="font-size: 15px; color: green" v-if="scope.row.highlight" v-html="scope.row.highlight">
                </h5>
                <span v-else>
                    <h5 style="font-size: 15px; color: red">{{scope.row.title}}</h5>
                    <h5 style="font-size: 15px; color: red">{{scope.row.name}}</h5>
                </span>
                

            </router-link>
            <!-- <router-link :to="`/main/greatRetail/321`"><font color="green">{{scope.row.id}}</font></router-link> -->
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

            }
        },
        
        methods: {
            async search () {
                const url = 'http://47.92.143.32:9200/_search'
                const params = '{"query":{"bool":{"should":[{"match":{"title":"' + this.keyword + '"}},{"match":{"content":"' + this.keyword + '"}},{"match":{"author":"' + this.keyword + '"}},{"match":{"name":"' + this.keyword + '"}},{"match":{"url":"' + this.keyword + '"}}]}},"highlight":{"boundary_scanner_locale":"zh_CN","fields":{"content":{"pre_tags":["<em>"],"post_tags":["</em>"]}}}}'
                console.log(params)

                const con = await api.es_post(url, params)
                var hits = con.data.hits.hits
                console.log(hits)
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
                            'url': hits[i]._source.url
                        }
                        this.datas.push(data)
                    }
                    
                }

                

            }
        }

    }
</script>

<style>
em {
  color: red;
}
</style>
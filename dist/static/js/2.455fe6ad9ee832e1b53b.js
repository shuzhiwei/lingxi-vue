webpackJsonp([2],{"1kaH":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("mtWM"),n=a.n(o),r=a("mw3O"),s=a.n(r),l=a("g5nd"),i=(a("7ZBB"),a("miE6")),u=(a("x9pK"),{inject:["reload"],data:function(){return{datas:[],token:Object(l.b)("lingxi-token"),username:Object(l.b)("username"),str1:"有主力吸筹迹象，股东人数下降",dialogFormVisible:!1,pageSize:8,pageNo:1,totalPage:0,paginationShow:!1,totalCount:0,stock:""}},mounted:function(){var t=this.$route.params.code,e=this.$route.params.update_date;t&&e?this.getOneData(t,e):this.getAllDatas()},methods:{getAllDatas:function(){var t=this;this.$store.commit("controlShow");this.token;var e=this.$store.state.base_url+"/stock/view",a={token:this.token,pageSize:this.pageSize,pageNo:this.pageNo};n.a.post(e,s.a.stringify(a)).then(function(e){var a=e.data,o=a.code;if(402===o){var n=Object(l.b)("username");return Object(i.a)(n,t.token),void t.reload()}if(401!==o)if(200===o){var r=a.data;t.totalPage=a.totalPage,t.totalCount=a.totalCount;for(var s=0;s<r.length;s++){var u=r[s].code,c=r[s].update_date,d=r[s].shareholder_falling_count,_=r[s].sdlu_great_retail_count,h=Math.round(r[s].float_share/100)/100,g=r[s].name;t.stock=d>=1&&_>=6&&h<100?"是":"否";var f={code:u,update_date:c,shareholder_falling_count:d,sdlu_great_retail_count:_,float_share:h,name:g,stock:t.stock};t.datas.push(f)}t.totalPage>1&&(t.paginationShow=!0)}else console.log(a),t.$message.error(o);else t.$message.error("无acs权限！")}).catch(function(e){console.log(e),t.$message.error(e)})},getOneData:function(t,e){var a=this;this.$store.commit("controlShow");this.token;var o=this.$store.state.base_url+"/stock/viewOne",r={token:this.token,code:t,update_date:e};n.a.post(o,s.a.stringify(r)).then(function(t){var e=t.data,o=e.code;if(402===o){var n=Object(l.b)("username");return Object(i.a)(n,a.token),void a.reload()}if(401!==o)if(200===o){var r=e.data;a.totalPage=e.totalPage,a.totalCount=e.totalCount;for(var s=0;s<r.length;s++){var u=r[s].code,c=r[s].update_date,d=r[s].shareholder_falling_count,_=r[s].sdlu_great_retail_count,h=Math.round(r[s].float_share/100)/100,g=r[s].name;a.stock=d>=1&&_>=6&&h<100?"是":"否";var f={code:u,update_date:c,shareholder_falling_count:d,sdlu_great_retail_count:_,float_share:h,name:g,stock:a.stock};a.datas.push(f)}a.totalPage>1&&(a.paginationShow=!0)}else console.log(e),a.$message.error(o);else a.$message.error("无acs权限！")}).catch(function(t){console.log(t),a.$message.error(t)})},handleSizeChange:function(t){var e=this;this.$nextTick(function(){return e.getPageData()})},handleCurrentChange:function(t){this.getPageData()},getPageData:function(){var t=this,e=this.$store.state.base_url+"/stock/view",a={token:this.token,pageSize:this.pageSize,pageNo:this.pageNo};n.a.post(e,s.a.stringify(a)).then(function(e){var a=e.data,o=a.code;if(402===o){var n=Object(l.b)("username");return Object(i.a)(n,t.token),void t.reload()}if(401!==o){var r=a.data;t.datas=[];for(var s=0;s<r.length;s++){var u=r[s].code,c=r[s].update_date,d=r[s].shareholder_falling_count,_=r[s].sdlu_great_retail_count,h=Math.round(r[s].float_share/100)/100,g=r[s].name;t.stock=d>=1&&_>=6&&h<100?"是":"否";var f={code:u,update_date:c,shareholder_falling_count:d,sdlu_great_retail_count:_,float_share:h,name:g,stock:t.stock};t.datas.push(f)}}else t.$message.error("无acs权限！")}).catch(function(e){console.log(e),t.$message.error(e)})},filterHandler:function(t,e,a){return e[a.property]===t}}}),c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("div",[a("br"),t._v(" "),a("span",[a("h2",{attrs:{align:"center"},on:{click:function(e){t.dialogFormVisible=!0}}},[t._v("牛散篇")])]),t._v(" "),a("el-dialog",{attrs:{title:"妖股满足条件",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("li",[t._v("近一个月第一个涨停板")]),t._v(" "),a("li",[t._v("最近有吸筹迹象（股东人数下降）")]),t._v(" "),a("li",[t._v("十大流通股东人名超过6个")]),t._v(" "),a("li",[t._v("流通市值小于100亿")])])],1),t._v(" "),a("div",[a("br"),t._v(" "),a("el-table",{ref:"filterTable",staticStyle:{width:"95%","font-size":"16px","margin-left":"30px"},attrs:{height:"500",border:"",data:t.datas}},[a("el-table-column",{attrs:{prop:"name",label:"涨停股","column-key":"name"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"code",label:"编码","column-key":"code"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.code))])]}}])}),t._v(" "),a("el-table-column",{staticStyle:{"font-size":"10px"},attrs:{prop:"update_date",label:"更新时间",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.update_date))])]}}])}),t._v(" "),this.$store.state.isshow?a("el-table-column",{attrs:{prop:"shareholder_falling_count",label:"股东人数下降统计",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.shareholder_falling_count))])]}}],null,!1,4049139479)}):t._e(),t._v(" "),this.$store.state.isshow?a("el-table-column",{attrs:{prop:"sdlu_great_retail_count",label:"十大流通股东牛散个数统计",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.sdlu_great_retail_count))])]}}],null,!1,1079912758)}):t._e(),t._v(" "),this.$store.state.isshow?a("el-table-column",{attrs:{prop:"float_share",label:"流通市值(亿)",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.float_share))])]}}],null,!1,2772994788)}):t._e(),t._v(" "),a("el-table-column",{attrs:{prop:"stock",label:"妖股","column-key":"stock",filters:[{text:"是",value:"是"},{text:"否",value:"否"}],"filter-method":t.filterHandler},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.stock))])]}}])})],1)],1)]),t._v(" "),a("div",{staticClass:"block",staticStyle:{"text-align":"center"}},[t.paginationShow?a("el-pagination",{attrs:{"current-page":t.pageNo,"page-size":8,layout:"total, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.pageNo=e},"update:current-page":function(e){t.pageNo=e}}}):t._e()],1)])},staticRenderFns:[]};var d=a("VU/8")(u,c,!1,function(t){a("7TZh")},null,null);e.default=d.exports},"7TZh":function(t,e){}});
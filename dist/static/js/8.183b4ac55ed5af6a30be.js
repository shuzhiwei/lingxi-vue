webpackJsonp([8],{J9KH:function(t,e,i){t.exports=i.p+"static/img/555.99f327c.png"},VZrM:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("mtWM");var s=i("g5nd"),n={inject:["reload"],data:function(){return{token:Object(s.b)("lingxi-token"),username:Object(s.b)("username"),isCollapse:!1}},mounted:function(){"None"===this.token&&this.$router.push({path:"/login"}),this.$store.commit("controlShow")},methods:{controlScreenShow:function(){this.screenWidth<1236?this.isshow=!1:this.isshow=!0},safeQuit:function(){Object(s.a)("lingxi-token"),Object(s.a)("username"),this.$router.push({path:"/login"}),this.reload()},goHome:function(){this.isCollapse=!this.isCollapse},goSearch:function(){this.isCollapse=!1,this.$router.push({path:"/main/search"})},storage:function(){var t=this;this.$confirm("正在进入seafile资料库，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){t.isCollapse=!1,window.open(t.$store.state.base_url+":7996/","_blank")}).catch(function(){t.$message({type:"info",message:"已取消"})})},aiqiyi:function(){window.open("https://www.iqiyi.com/","_blank")},tengxun:function(){window.open("https://v.qq.com/","_blank")},music:function(){window.open("https://music.163.com/","_blank")},jenkins:function(){window.open("http://www.nnbkqnp.cn:8080/","_blank")},konga:function(){window.open("http://www.nnbkqnp.cn:1337/","_blank")},glances:function(){window.open("http://www.nnbkqnp.cn:61208/","_blank")},goShare:function(){window.open(this.$store.state.base_url_test+"/#/share","_blank")},jumpChat:function(){this.$router.push({path:"/main/chat"})},evernote:function(){this.isCollapse=!1,window.open("https://app.yinxiang.com/Home.action?login=true#n=db9ada5f-7cec-4eca-9eaf-6d81197e2637&s=s35&ses=4&sh=2&sds=2&","_blank")},english:function(){this.isCollapse=!1,window.open("https://bdc.youzack.com/Recitation/Home/ChooseDictionary","_blank")},youdao:function(){this.isCollapse=!1,window.open("https://ke.youdao.com/","_blank")},tianqi:function(){this.isCollapse=!1,window.open("https://tianqi.qq.com/index.htm","_blank")},map:function(){this.isCollapse=!1,window.open("https://map.51240.com/","_blank")},aliyun:function(){this.isCollapse=!1,window.open("https://cn.aliyun.com/","_blank")}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-container",{staticClass:"con"},[s("el-header",{staticClass:"header",attrs:{height:"80px"}},[s("el-row",[s("el-col",{attrs:{span:5,align:"left"}},[s("div",{staticClass:"grid-content bg-purple"},[s("img",{staticClass:"header-logo",attrs:{src:i("J9KH")},on:{click:t.goHome}})])]),t._v(" "),s("el-col",{attrs:{span:14,align:"center"}},[s("div",{staticClass:"grid-content bg-purple"},[s("img",{staticClass:"header-logo",attrs:{src:i("lwDb")},on:{click:t.goSearch}})])]),t._v(" "),s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple-light text-right"},[s("span",[s("span",[s("el-dropdown",[s("span",{staticStyle:{cursor:"pointer",color:"white"}},[s("i",{staticClass:"el-icon-user",staticStyle:{"font-size":"20px"}})]),t._v(" "),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",[t._v(t._s(t.username))]),t._v(" "),s("el-dropdown-item",{nativeOn:{click:function(e){return t.safeQuit(e)}}},[t._v("安全退出")])],1)],1)],1)])])])],1)],1),t._v(" "),s("el-container",[s("el-aside",{directives:[{name:"show",rawName:"v-show",value:t.isCollapse,expression:"isCollapse"}],staticClass:"aside",attrs:{width:"220px"}},[s("div",{staticClass:"mean-top"},[s("i",{staticClass:"el-icon-menu"}),t._v(" FuncNavi")]),t._v(" "),s("el-menu",{attrs:{"default-active":"1","background-color":"#dbe9f1","active-text-color":"#6ec673",id:"menu"}},[s("el-submenu",{attrs:{index:"1"}},[s("template",{slot:"title"},[s("i",{staticClass:"el-icon-location"}),t._v("Home")]),t._v(" "),s("el-menu-item-group",[s("el-menu-item",{attrs:{index:"1-1"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/home"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Blog")])],1),t._v(" "),s("el-menu-item",{attrs:{index:"1-6"},on:{click:t.goShare}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Share")]),t._v(" "),s("el-menu-item",{attrs:{index:"1-5"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/chat"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Chat")])],1)],1)],2),t._v(" "),s("el-submenu",{attrs:{index:"4"}},[s("template",{slot:"title"},[s("i",{staticClass:"el-icon-location"}),t._v("Learn")]),t._v(" "),s("el-menu-item-group",[s("el-menu-item",{attrs:{index:"4-3"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/todo"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Todo")])],1),t._v(" "),s("el-menu-item",{attrs:{index:"4-1"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/bookMarks"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("BookMarks")])],1),t._v(" "),s("el-menu-item",{attrs:{index:"4-2"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/memoryPalace"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Memory")])],1),t._v(" "),s("el-menu-item",{attrs:{index:"4-6"},on:{click:t.storage}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Seafile")])],1)],2),t._v(" "),s("el-submenu",{directives:[{name:"show",rawName:"v-show",value:"shuzhiwei"==this.username,expression:"this.username == 'shuzhiwei'"}],attrs:{index:"5"}},[s("template",{slot:"title"},[s("i",{staticClass:"el-icon-location"}),t._v("Work")]),t._v(" "),s("el-menu-item-group",[s("el-menu-item",{attrs:{index:"5-2"},on:{click:t.jenkins}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Jenkins")]),t._v(" "),s("el-menu-item",{attrs:{index:"5-4"},on:{click:t.evernote}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Evernote")]),t._v(" "),s("el-menu-item",{attrs:{index:"5-5"},on:{click:t.konga}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Konga")]),t._v(" "),s("el-menu-item",{attrs:{index:"5-6"},on:{click:t.glances}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Glances")]),t._v(" "),s("el-menu-item",{attrs:{index:"5-7"},on:{click:t.aliyun}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Aliyun")])],1)],2),t._v(" "),s("el-submenu",{attrs:{index:"2"}},[s("template",{slot:"title"},[s("i",{staticClass:"el-icon-location"}),t._v("Stock")]),t._v(" "),s("el-menu-item-group",[s("el-menu-item",{attrs:{index:"2-1"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/greatRetail"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("GreatRetail")])],1),t._v(" "),s("el-menu-item",{attrs:{index:"2-2"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/kdj"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("GoldCross")])],1),t._v(" "),s("el-menu-item",{attrs:{index:"2-5"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/private"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Private")])],1),t._v(" "),s("el-menu-item",{attrs:{index:"2-6"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/private1"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Private1")])],1),t._v(" "),s("el-menu-item",{attrs:{index:"2-7"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/favorites"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Favorites")])],1)],1)],2),t._v(" "),s("el-submenu",{attrs:{index:"3"}},[s("template",{slot:"title"},[s("i",{staticClass:"el-icon-location"}),t._v("Play")]),t._v(" "),s("el-menu-item-group",[s("el-menu-item",{attrs:{index:"3-1"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/dytt"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("Dytt")])],1),t._v(" "),s("el-menu-item",{attrs:{index:"3-2"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/vipParser"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("VipParser")])],1),t._v(" "),s("el-menu-item",{attrs:{index:"3-6"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/piggyBank"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("PiggyBank")])],1)],1)],2),t._v(" "),s("el-submenu",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{index:"8"}},[s("template",{slot:"title"},[s("i",{staticClass:"el-icon-location"}),t._v("Rde")]),t._v(" "),s("el-menu-item-group",[s("el-menu-item",{attrs:{index:"8-1"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/powerFactor"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("PowerFactor")])],1)],1)],2),t._v(" "),s("el-submenu",{directives:[{name:"show",rawName:"v-show",value:"shuzhiwei"==this.username||"admin"==this.username,expression:"(this.username == 'shuzhiwei' || this.username == 'admin')"}],attrs:{index:"9"}},[s("template",{slot:"title"},[s("i",{staticClass:"el-icon-location"}),t._v("System")]),t._v(" "),s("el-menu-item-group",[s("el-menu-item",{attrs:{index:"9-1"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/authManage"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("AuthManage")])],1),t._v(" "),s("el-menu-item",{attrs:{index:"9-2"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[s("router-link",{attrs:{to:"/main/userManage"}},[s("i",{staticClass:"el-icon-tickets"}),t._v("UserManage")])],1)],1)],2)],1)],1),t._v(" "),s("button",{staticStyle:{color:"write",width:"20px",border:"none",outline:"none"},on:{click:function(e){t.isCollapse=!t.isCollapse}}},[t._v("》")]),t._v(" "),s("el-main",{staticClass:"main"},[s("router-tab")],1)],1)],1)],1)},staticRenderFns:[]};var o=i("VU/8")(n,a,!1,function(t){i("h/LU")},null,null);e.default=o.exports},"h/LU":function(t,e){},lwDb:function(t,e){t.exports="data:image/png;base64,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"}});
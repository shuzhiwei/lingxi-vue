webpackJsonp([1],{"1TKa":function(t,e){},BvJH:function(t,e){},I3S0:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o("Xxa5"),n=o.n(s),r=o("exGp"),a=o.n(r),i={props:{addTodo:Function},data:function(){return{todo:""}},methods:{addItem:function(){var t=this.todo.trim();t?(this.$emit("addTodo",t),this.todo=""):alert("输入不能为空！")}}},c={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todo-header"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.todo,expression:"todo"}],attrs:{type:"text",placeholder:"请输入你的任务名称，按回车键确认"},domProps:{value:t.todo},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addItem(e)},input:function(e){e.target.composing||(t.todo=e.target.value)}}})])},staticRenderFns:[]};var l=o("VU/8")(i,c,!1,function(t){o("h3Qj")},null,null).exports,u=o("mtWM"),d=o.n(u),h=o("mw3O"),m=o.n(h),f=o("g5nd"),p=o("miE6"),v={props:{item:Object,index:Number,delTodo:Function},data:function(){return{token:Object(f.b)("lingxi-token"),username:Object(f.b)("username"),backColor:"white",isShow:!1,todos:this.item}},methods:{formatDate:function(t){return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "},aaa:function(t){t?(this.backColor="gray",this.isShow=!0):(this.backColor="white",this.isShow=!1)},delItem:function(){var t=this,e=this.item,o=this.index,s=this.delTodo;this.$confirm("确认完成"+e.todo+"吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){s(o)}).catch(function(){t.$message({type:"info",message:"已取消"})})},changePriority:function(t,e){var o=this;if(this.username===t){var s={token:this.token,id:e},n=this.$store.state.base_url+"/entertainment/todoListUpdatePriority";d.a.post(n,m.a.stringify(s)).then(function(t){var e=t.data.code;if(console.log(e),200==e){var s=o.item.priority;s=s?0:1,o.item.priority=s}}).catch(function(t){o.$message.error("请求失败！")})}else this.$message.error("不是您的todo哦！")}}},y={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("li",{staticClass:"a",style:{background:t.backColor}},[o("label",{staticClass:"b"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.item.status,expression:"item.status"}],staticClass:"c",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.item.status)?t._i(t.item.status,null)>-1:t.item.status},on:{change:function(e){var o=t.item.status,s=e.target,n=!!s.checked;if(Array.isArray(o)){var r=t._i(o,null);s.checked?r<0&&t.$set(t.item,"status",o.concat([null])):r>-1&&t.$set(t.item,"status",o.slice(0,r).concat(o.slice(r+1)))}else t.$set(t.item,"status",n)}}}),t._v(" "),1===t.item.priority?o("span",[o("i",{staticClass:"el-icon-star-on",staticStyle:{color:"#ffd633","font-size":"25px"},on:{click:function(e){return t.changePriority(t.item.author,t.item.id)}}})]):o("span",[o("i",{staticClass:"el-icon-star-on",staticStyle:{color:"#c2d6d6","font-size":"25px"},on:{click:function(e){return t.changePriority(t.item.author,t.item.id)}}})]),t._v(" "),1===t.item.priority?o("span",{staticClass:"d"},[t._v(t._s(t.item.todo))]):o("span",[t._v(t._s(t.item.todo))]),t._v(" "),1===t.item.priority?o("span",{staticClass:"d"},[t._v(t._s(t.item.create_date))]):o("span",[t._v(t._s(t.item.create_date))])]),t._v(" "),o("button",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"btn btn-danger",attrs:{id:"e"},on:{click:t.delItem}},[t._v("完成")])])])},staticRenderFns:[]};var w=o("VU/8")(v,y,!1,function(t){o("1TKa")},null,null).exports,_={props:{todos:Array,delTodo:Function},components:{TodoItem:w}},b={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ul",{staticClass:"todo-main"},t._l(t.todos,function(e,s){return o("todo-item",{key:s,attrs:{item:e,index:e.id,delTodo:t.delTodo}})}),1)},staticRenderFns:[]};var g=o("VU/8")(_,b,!1,function(t){o("XaEo")},null,null).exports,k={props:{todos:Array,deleteCompleteTodos:Function,selectAllTodos:Function},computed:{completeSize:function(){return this.todos.reduce(function(t,e){return t+(e.status?1:0)},0)},isAllCheck:{get:function(){return this.completeSize==this.todos.length&&this.completeSize>0},set:function(t){this.selectAllTodos(t)}}},methods:{aaa:function(){var t=this;this.$confirm("确认完成所有已勾选任务吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){t.deleteCompleteTodos()}).catch(function(){t.$message({type:"info",message:"已取消"})})}}},x={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todo-footer"},[o("label",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.isAllCheck,expression:"isAllCheck"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.isAllCheck)?t._i(t.isAllCheck,null)>-1:t.isAllCheck},on:{change:function(e){var o=t.isAllCheck,s=e.target,n=!!s.checked;if(Array.isArray(o)){var r=t._i(o,null);s.checked?r<0&&(t.isAllCheck=o.concat([null])):r>-1&&(t.isAllCheck=o.slice(0,r).concat(o.slice(r+1)))}else t.isAllCheck=n}}})]),t._v(" "),o("span",[o("span",[t._v("已勾选"+t._s(t.completeSize))]),t._v(" / 全部"+t._s(t.todos.length)+"\n    ")]),t._v(" "),o("button",{directives:[{name:"show",rawName:"v-show",value:t.completeSize,expression:"completeSize"}],staticClass:"btn btn-danger",on:{click:t.aaa}},[t._v("完成已勾选")])])},staticRenderFns:[]};var T=o("VU/8")(k,x,!1,function(t){o("wJKS")},null,null).exports,C={props:{item:Object,index:Number,delTodo:Function},data:function(){return{token:Object(f.b)("lingxi-token"),username:Object(f.b)("username"),backColor:"white",isShow:!1}},methods:{aaa:function(t){t?(this.backColor="gray",this.isShow=!0):(this.backColor="white",this.isShow=!1)},delItem:function(){var t=this,e=this.item,o=this.index,s=this.delTodo;this.$confirm("确认删除"+e.todo+"吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){s(o)}).catch(function(){t.$message({type:"info",message:"已取消"})})}}},A={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("li",{staticClass:"a",style:{background:t.backColor},on:{mouseenter:function(e){return t.aaa(!0)},mouseleave:function(e){return t.aaa(!1)}}},[o("label",{staticClass:"b"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.item.status,expression:"item.status"}],staticClass:"c",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.item.status)?t._i(t.item.status,null)>-1:t.item.status},on:{change:function(e){var o=t.item.status,s=e.target,n=!!s.checked;if(Array.isArray(o)){var r=t._i(o,null);s.checked?r<0&&t.$set(t.item,"status",o.concat([null])):r>-1&&t.$set(t.item,"status",o.slice(0,r).concat(o.slice(r+1)))}else t.$set(t.item,"status",n)}}}),t._v(" "),1===t.item.priority?o("span",{staticClass:"d"},[t._v(t._s(t.item.todo))]):o("span",[t._v(t._s(t.item.todo))]),t._v(" "),1===t.item.priority?o("span",{staticClass:"d"},[t._v(t._s(t.item.create_date))]):o("span",[t._v(t._s(t.item.create_date))])]),t._v(" "),o("button",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"btn btn-danger",attrs:{id:"e"},on:{click:t.delItem}},[t._v("删除")])])])},staticRenderFns:[]};var O=o("VU/8")(C,A,!1,function(t){o("XMac")},null,null).exports,S={props:{todos:Array,delTodo:Function},components:{TodoItemHistory:O}},U={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ul",{staticClass:"todo-main"},t._l(t.todos,function(e,s){return o("todo-item-history",{key:s,attrs:{item:e,index:e.id,delTodo:t.delTodo}})}),1)},staticRenderFns:[]};var D=o("VU/8")(S,U,!1,function(t){o("BvJH")},null,null).exports,$=o("BoEg"),H={inject:["reload"],components:{TodoHeader:l,TodoList:g,TodoFooter:T,TodoListHistory:D},data:function(){return{token:Object(f.b)("lingxi-token"),username:Object(f.b)("username"),todos:[],todos_history:[],otherUser:Object(f.b)("username"),otherUserShow:""}},mounted:function(){"shuzhiwei"==this.username?this.otherUserShow="侯婷玉":this.otherUserShow="舒志伟",this.getDatas(this.username)},methods:{getDatas:function(t){var e=this;return a()(n.a.mark(function o(){var s,r,a,i,c,l,u,d,h,m,v,y,w;return n.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return s=Object(f.b)("lingxi-token"),r=e.$store.state.base_url+"/entertainment/todoListShow",a={token:s,username:t},console.log("hello"),o.next=6,$.a.post(r,a);case 6:if(i=o.sent,console.log(i),402!==i.code){o.next=13;break}return Object(p.a)(e.username,s),e.reload(),o.abrupt("return");case 13:for(c=i.todos,e.todos=[],l=0;l<c.length;l++)u=c[l].id,d=c[l].todo,h=c[l].status,m=c[l].create_date,m=e.formatDate(new Date(parseInt(m))),v=c[l].username,y=c[l].priority,w={id:u,todo:d,status:h,create_date:m,author:v,priority:y},e.todos.push(w);console.log("getDatas执行成功");case 17:case"end":return o.stop()}},o,e)}))()},sleep:function(t){for(var e=(new Date).getTime()+t;;)if((new Date).getTime()>e)return},formatDate:function(t){return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "},insertTodo:function(t){var e=this;return a()(n.a.mark(function o(){var s,r,a,i,c;return n.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return s=Object(f.b)("lingxi-token"),r=(new Date).valueOf(),a=e.$store.state.base_url+"/entertainment/todoInsert",i={token:s,create_date:r,todo:t,username:e.otherUser},o.next=6,$.a.post(a,i);case 6:if(c=o.sent,console.log(c),402!==c.code){o.next=13;break}return Object(p.a)(e.username,s),o.next=13,e.insertTodo(t);case 13:console.log("insertTodo执行成功");case 14:case"end":return o.stop()}},o,e)}))()},addTodo:function(t){var e=this;return a()(n.a.mark(function o(){return n.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.insertTodo(t);case 2:return o.next=4,e.getDatas(e.otherUser);case 4:case"end":return o.stop()}},o,e)}))()},deleteTodo:function(t){var e=this;return a()(n.a.mark(function o(){var s,r,a,i,c;return n.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(e.username===e.otherUser){o.next=3;break}return e.$message.error("不是您的todo哦！"),o.abrupt("return");case 3:return s=Object(f.b)("lingxi-token"),r=(new Date).valueOf(),a=e.$store.state.base_url+"/entertainment/todoDelete",i={token:s,ids:t,timestamp:r},o.next=9,$.a.post(a,i);case 9:if(c=o.sent,console.log(c),402!==c.code){o.next=15;break}return Object(p.a)(e.username,s),o.next=15,e.deleteTodo(t);case 15:console.log("deleteTodo执行成功");case 16:case"end":return o.stop()}},o,e)}))()},delTodo:function(t){var e=this;return a()(n.a.mark(function o(){return n.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.deleteTodo(t);case 2:return o.next=4,e.getDatas(e.otherUser);case 4:case"end":return o.stop()}},o,e)}))()},deleteCompleteTodos:function(){var t=this;return a()(n.a.mark(function e(){var o,s,r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.username===t.otherUser){e.next=3;break}return t.$message.error("不是您的todo哦！"),e.abrupt("return");case 3:for(o=t.todos.filter(function(t){return 1==t.status||1==t.status}),s="",r=0;r<o.length;r++)s+=o[r].id+",";return s=s.substr(0,s.length-1),console.log("ids: "+s),e.next=10,t.deleteTodo(s);case 10:return e.next=12,t.getDatas(t.otherUser);case 12:case"end":return e.stop()}},e,t)}))()},selectAllTodos:function(t){this.todos.forEach(function(e){return e.status=t})},deleteFact:function(t){var e=this;return a()(n.a.mark(function o(){var s,r,a,i;return n.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(e.username===e.otherUser){o.next=3;break}return e.$message.error("不是您的todo哦！"),o.abrupt("return");case 3:return s=Object(f.b)("lingxi-token"),r=e.$store.state.base_url+"/entertainment/todoRealDeleteHistory",a={token:s,ids:t},o.next=8,$.a.post(r,a);case 8:if(i=o.sent,console.log(i),402!==i.code){o.next=16;break}return Object(p.a)(e.username,s),o.next=15,e.deleteFact(t);case 15:return o.abrupt("return");case 16:case"end":return o.stop()}},o,e)}))()},deleteReadHistory:function(t){var e=this;return a()(n.a.mark(function o(){var s,r;return n.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.deleteFact(t);case 2:return s=(new Date).toLocaleDateString(),r=new Date(s)/1e3*1e3,console.log("hello: "+r),o.next=7,e.showHistory(r,e.username);case 7:case"end":return o.stop()}},o,e)}))()},showHistory:function(t,e){var o=this;return a()(n.a.mark(function s(){var r,a,i,c,l,u,d,h,m,v,y;return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return o.todos=[],r=Object(f.b)("lingxi-token"),a=o.$store.state.base_url+"/entertainment/todoShowHistory",i={token:r,username:e,timestamp:t},o.todos_history=[],s.next=7,$.a.post(a,i);case 7:if(c=s.sent,console.log(c),402!==c.code){s.next=15;break}return Object(p.a)(o.username,r),s.next=14,o.showHistory(t,e);case 14:return s.abrupt("return");case 15:for(l=c.todos,u=0;u<l.length;u++)d=l[u].id,h=l[u].todo,m=l[u].status,v=l[u].create_date,v=o.formatDate(new Date(parseInt(v))),y={id:d,todo:h,status:m,create_date:v},o.todos_history.push(y);case 17:case"end":return s.stop()}},s,o)}))()},showMyselfHistoryOnlyToday:function(){var t=(new Date).toLocaleDateString(),e=new Date(t)/1e3*1e3;console.log("hello: "+e),this.showHistory(e,this.username),this.otherUser=this.username},showMyselfAllHistory:function(){this.showHistory("1613785971000",this.username),this.otherUser=this.username},showOtherHistoryOnlyToday:function(){"shuzhiwei"==this.username?this.otherUser="houtingyu":this.otherUser="shuzhiwei";var t=(new Date).toLocaleDateString(),e=new Date(t)/1e3*1e3;console.log("hello: "+e),this.showHistory(e,this.otherUser)},showOtherAllHistory:function(){"shuzhiwei"==this.username?this.otherUser="houtingyu":this.otherUser="shuzhiwei";this.showHistory("1613785971000",this.otherUser)},showMyselfTodo:function(){this.getDatas(this.username),this.otherUser=this.username,this.todos_history=[]},showOtherTodo:function(){"shuzhiwei"==this.username?this.otherUser="houtingyu":this.otherUser="shuzhiwei",this.getDatas(this.otherUser),this.todos_history=[]}}},j={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"todo-container"},[o("div",{staticClass:"todo-wrap"},[o("todo-header",{on:{addTodo:t.addTodo}}),t._v(" "),o("todo-list",{attrs:{todos:t.todos,delTodo:t.delTodo}}),t._v(" "),o("todo-footer",{attrs:{todos:t.todos,deleteCompleteTodos:t.deleteCompleteTodos,selectAllTodos:t.selectAllTodos}})],1),t._v(" "),o("div",{staticStyle:{"text-align":"center",width:"350px",height:"40px"}},[o("el-button",{attrs:{type:"success",size:"small"},on:{click:t.showMyselfTodo}},[t._v("未完成")]),t._v(" "),o("el-button",{attrs:{type:"success",size:"small"},on:{click:t.showMyselfAllHistory}},[t._v("历史已完成")]),t._v(" "),o("el-button",{attrs:{type:"success",size:"small"},on:{click:t.showMyselfHistoryOnlyToday}},[t._v("今日已完成")])],1),t._v(" "),o("div",{staticStyle:{"text-align":"center",width:"350px",height:"40px"}},[o("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.showOtherTodo}},[t._v(t._s(t.otherUserShow))]),t._v(" "),o("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.showOtherAllHistory}},[t._v("历史已完成")]),t._v(" "),o("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.showOtherHistoryOnlyToday}},[t._v("今日已完成")])],1)]),t._v(" "),o("div",{staticClass:"todo-container"},[o("todo-list-history",{attrs:{todos:t.todos_history,delTodo:t.deleteReadHistory}})],1)])},staticRenderFns:[]};var z=o("VU/8")(H,j,!1,function(t){o("TW+S")},null,null);e.default=z.exports},"TW+S":function(t,e){},XMac:function(t,e){},XaEo:function(t,e){},h3Qj:function(t,e){},wJKS:function(t,e){}});
webpackJsonp([11],{NWgS:function(t,e){},w5di:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("g5nd"),i=a("miE6"),o=a("mtWM"),n=a.n(o),s=a("mw3O"),l=a.n(s),d={inject:["reload"],data:function(){return{title:"",content:"",imageAddr:"",image:"",imageAddrs:[],delImageAddrs:[],defaultImg:'this.src="'+a("DBQu")+'"',dialogImageUrl:"",dialogVisible:!1,fileList:[],form:{images1:[],radio:0}}},mounted:function(){var t=this,e=this.$route.params.id,a=Object(r.b)("lingxi-token"),o=this.$store.state.base_url+"/lingxis/view/"+e+"?token="+a;n.a.get(o).then(function(e){var o=e.data,n=o.code;if(console.log(n),402===n){var s=Object(r.b)("username");Object(i.a)(s,a),t.reload()}else if(200===n){t.title=o.data.title,t.content=o.data.content,t.form.radio=o.data.share_flag;var l=o.data.imageAddr,d=o.data.imageAddr.split("helloworld");if(-1!==l.indexOf("helloworld")){for(var c=0;c<d.length;c++)t.imageAddrs.push(d[c]);t.imageAddrs.pop()}else t.imageAddr=o.data.imageAddr}else console.log(n),t.$message.error("无acs权限！")})},methods:{deleteCurPhoto:function(t){this.delImageAddrs.push(this.imageAddrs[t]),this.imageAddrs.splice(t,1)},deletePrePhoto:function(t){this.form.images1.splice(t,1)},openFile:function(){document.getElementById("filename").click()},showRealPath:function(){for(var t=this,e=document.getElementById("filename").files,a=function(a){var r=e[a].name,i=new FileReader;i.readAsDataURL(e[a]),i.onload=function(){var e=i.result;t.form.images1.push({name:r,image:e})}},r=0;r<e.length;r++)a(r)},postCancel:function(){this.$router.push({path:"/main/home"})},postEntry:function(){var t=this,e=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});console.log("hello123");for(var a=Object(r.b)("lingxi-token"),i=this.$route.params.id,o=this.$store.state.base_url+"/lingxis/blog/edit/"+i,s=this.$store.state.base_url+"/lingxis/blog/editAddPhoto/"+i,d="",c=0;c<this.imageAddrs.length;c++)d=d+this.imageAddrs[c]+"helloworld";for(var m="",u=0;u<this.delImageAddrs.length;u++)m=m+this.delImageAddrs[u]+"helloworld";var g={token:a,title:this.title,content:this.content,share_flag:this.form.radio,curImageAddrs:d,delImageAddrs:m};n.a.post(o,l.a.stringify(g)).then(function(r){var i=r.data;if(200===i.code){for(var o="",d=0;d<t.form.images1.length;d++)if((o=o+t.form.images1[d].image+"helloworld").length>10485760){console.log(d);var c={token:a,image:o};n.a.post(s,l.a.stringify(c)).then(function(e){var a=e.data;200!==a.code&&t.$message.error(a.code)}).catch(function(e){t.$message.error(e)}),o=""}if(o){var m={token:a,image:o};n.a.post(s,l.a.stringify(m)).then(function(e){var a=e.data;200!==a.code&&t.$message.error(a.code)}).catch(function(e){t.$message.error(e)})}e.close()}else t.$message.error(i.code),console.log(i.message),e.close()}).catch(function(e){t.$message.error(e)}),this.$router.push({path:"/main/home"}),this.$router.go(0)}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("table",[a("tr",[t._m(0),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{id:"title",name:"title",size:"30",type:"text"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})])]),t._v(" "),a("tr",[t._m(1),a("td",[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],attrs:{cols:"80",id:"content",name:"content",rows:"10"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}})])]),t._v(" "),a("tr",[t._m(2),a("td",[t.imageAddr?a("div",[a("div",{staticClass:"img-box"},[a("img",{staticClass:"myimage",attrs:{src:t.imageAddr,alt:"logo",onerror:t.defaultImg}}),t._v(" "),a("div",{staticClass:"del-icon",on:{click:function(e){return t.deleteCurPhoto(t.index)}}})])]):a("div",t._l(t.imageAddrs,function(e,r){return a("span",{key:r},[a("div",{staticClass:"img-box"},[a("img",{staticClass:"myimage",attrs:{src:e,alt:"",onerror:t.defaultImg}}),t._v(" "),a("div",{staticClass:"del-icon",on:{click:function(e){return t.deleteCurPhoto(r)}}})])])}),0)])]),t._v(" "),a("tr",[t._m(3),t._v(" "),a("td",[a("el-radio",{staticStyle:{"margin-left":"10px"},attrs:{label:1},model:{value:t.form.radio,callback:function(e){t.$set(t.form,"radio",e)},expression:"form.radio"}},[t._v("公开")]),t._v(" "),a("el-radio",{attrs:{label:0},model:{value:t.form.radio,callback:function(e){t.$set(t.form,"radio",e)},expression:"form.radio"}},[t._v("不公开")])],1)]),t._v(" "),a("br"),t._v(" "),a("tr",[t._m(4),t._v(" "),a("td",[a("span",{attrs:{align:"left"}},[a("el-button",{attrs:{type:"primary",round:""},on:{click:function(e){return t.openFile()}}},[t._v("选择文件")]),t._v(" "),a("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"filename",multiple:"multiple"},on:{change:t.showRealPath}})],1),t._v(" "),a("br"),t._v(" "),t._l(t.form.images1,function(e,r){return a("span",{key:r},[a("div",{staticClass:"img-box"},[a("img",{staticClass:"myimage",attrs:{src:e.image,alt:""}}),t._v(" "),a("div",{staticClass:"del-icon",on:{click:function(e){return t.deletePrePhoto(r)}}})])])})],2)]),t._v(" "),a("tr",[t._m(5),t._v(" "),a("td",[a("br"),t._v(" "),a("el-button",{attrs:{type:"info"},on:{click:t.postCancel}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.postEntry}},[t._v("提 交")])],1)])]),t._v(" "),a("br"),a("br")])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("label",{attrs:{for:"title"}},[this._v("标题:")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("label",{attrs:{for:"content"}},[this._v("内容:")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("label",{attrs:{for:"content"}},[this._v("当前图片:")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("label",{attrs:{for:"content"}},[this._v("是否公开:")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("label",{attrs:{for:"addOther"}},[this._v("添加图片")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("label",{attrs:{for:"Post entry"}})])}]};var m=a("VU/8")(d,c,!1,function(t){a("NWgS")},null,null);e.default=m.exports}});
//# sourceMappingURL=11.ba9e557cb4aff7f3a3a5.js.map
<template>
  <div>
    <el-container class="con">
      <el-header class="header" height="80px">
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple"><img src="../../static/img/555.png" class="header-logo"/> </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light text-right">
           <span><i class="el-icon-share i_rd"></i><button @click="safeQuit" style="background:transparent; border:none; font-size:17px; color:white;">安全退出</button></span>
          </div></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="220px" class="aside">
     <div class="mean-top"><i class="el-icon-menu"></i> 功能导航</div>
          <el-menu  default-active="1"

                    background-color="#dbe9f1"

                    active-text-color="#6ec673" id="menu">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-location"></i>Blog</template>
              <el-menu-item-group>
                <el-menu-item index="1-1"> <router-link to="/main/home"><i class="el-icon-tickets"></i>Home</router-link></el-menu-item>
                <el-menu-item index="1-2"> <router-link to="/main/hello"><i class="el-icon-tickets"></i>Hello</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-location"></i>Rde</template>
              <el-menu-item-group>
                <el-menu-item index="2-1"> <router-link to="/main/powerFactor"><i class="el-icon-tickets"></i>PowerFactor</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="9">
              <template slot="title"><i class="el-icon-location"></i>System</template>
              <el-menu-item-group>
                <el-menu-item index="9-1"> <router-link to="/main/authManage"><i class="el-icon-tickets"></i>AuthManage</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-aside>

        <el-main class="main">
          <router-view class="router-view"   ></router-view>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
    import {setCookie,getCookie,delCookie} from '../../static/js/cookie.js'
    export default {
        inject: ['reload'],

        mounted(){
            const token = getCookie('lingxi-token')
            if (token === 'None') {
                this.$router.push({path: '/login'})
            }
        },

        methods: {
            safeQuit () {
                delCookie('lingxi-token')
                delCookie('username')
                this.reload()
            }
        }
    }
</script>

<style>
.test{
  width: 500px;
  height: 500px;
  background-color: red;
}
.header{
  width: 100%;


  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  background-color:#0d3349 ;
}
  .header-logo{
    margin-top: 8px;
    height: 64px;
  }
  .text-right{
    text-align: right;
    line-height: 80px;
  }
  .text-right span{
    margin-right: 10px;
  }
  .text-right span i{
    margin-right: 5px;
  }
  .i_yellow{
    color: yellow;
  }
  .i_rd{
    color: red;
  }
  .aside{
    background-color: rgba(219, 233, 241, 0.45);
  }
  .el-submenu{
    border-bottom: 1px solid #bbe0f6;

  }
  .mean-top{
    width: 100%;
    height: 41px;
    line-height: 41px;
    text-indent: 5px;
  }
  .main{
    background-color: #eeeeee;
    width: 100%;
    padding: 0px;
  }
  .main-tab{
    width: 100%;
    line-height: 40px;
    border-bottom: 2px solid #0d3349;
    height: 40px;
  }
  .el-tag {
    background-color: rgba(64,158,255,.1);
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #666;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
  }
  .router-view{
   margin-bottom: 5px;
    /*background-color: #ffffff;*/
    /*border:1px solid #eeeeee;*/
    border-radius: 5px;
    width: 100%;
    margin-top: 5px;

  }
</style>

<template>
  <div>
    <el-container class="con">
      <el-header class="header" height="80px">
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">
              <img src="../../static/img/555.png" class="header-logo" @click="isCollapse=!isCollapse"/> 
              <img v-show="this.$store.state.isshow" src="../../static/img/777.png" class="header-logo"/> 
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light text-right">
           <span>
                <!-- <span>{{username}}</span> -->
                <span>
                    <i class="el-icon-chat-dot-square" style="font-size:20px;color: white" @click="chat"></i>

                    <el-dropdown>
                        <span style="cursor: pointer; color: white;">
                            <i class="el-icon-user" style="font-size:20px;"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>{{username}}</el-dropdown-item>
                            <el-dropdown-item @click.native="safeQuit">安全退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
            </span>
          </div></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="220px" class="aside" v-show="isCollapse">
            
     <div class="mean-top"><i class="el-icon-menu"></i> FuncNavi</div>

          <el-menu  default-active="1"

                    background-color="#dbe9f1"

                    active-text-color="#6ec673" id="menu">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-location"></i>Blog</template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="isCollapse=!isCollapse"><router-link to="/main/home"><i class="el-icon-tickets"></i>Home</router-link></el-menu-item>
                <el-menu-item index="1-3" @click="isCollapse=!isCollapse"><router-link to="/main/hello"><i class="el-icon-tickets"></i>Hello</router-link></el-menu-item>
                <el-menu-item index="1-4" @click="isCollapse=!isCollapse"><router-link to="/main/test"><i class="el-icon-tickets"></i>test</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-location"></i>Stock</template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="isCollapse=!isCollapse"> <router-link to="/main/greatRetail"><i class="el-icon-tickets"></i>GreatRetail</router-link></el-menu-item>
                <el-menu-item index="2-2" @click="isCollapse=!isCollapse"> <router-link to="/main/kdj"><i class="el-icon-tickets"></i>GoldCross</router-link></el-menu-item>
                <el-menu-item index="2-5" @click="isCollapse=!isCollapse"> <router-link to="/main/private"><i class="el-icon-tickets"></i>Private</router-link></el-menu-item>
                <el-menu-item index="2-6" @click="isCollapse=!isCollapse"> <router-link to="/main/private1"><i class="el-icon-tickets"></i>Private1</router-link></el-menu-item>
                <el-menu-item index="2-7" @click="isCollapse=!isCollapse"> <router-link to="/main/favorites"><i class="el-icon-tickets"></i>Favorites</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-location"></i>Movie</template>
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="isCollapse=!isCollapse"> <router-link to="/main/dytt"><i class="el-icon-tickets"></i>Dytt</router-link></el-menu-item>
                <el-menu-item index="3-2" @click="isCollapse=!isCollapse"> <router-link to="/main/vipParser"><i class="el-icon-tickets"></i>VipParser</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-location"></i>Storage</template>
              <el-menu-item-group>
                <el-menu-item index="4-1" @click="storage"> <i class="el-icon-tickets"></i>Seafile</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="8">
              <template slot="title"><i class="el-icon-location"></i>Rde</template>
              <el-menu-item-group>
                <el-menu-item index="8-1" @click="isCollapse=!isCollapse"> <router-link to="/main/powerFactor"><i class="el-icon-tickets"></i>PowerFactor</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="9">
              <template slot="title"><i class="el-icon-location"></i>System</template>
              <el-menu-item-group>
                <el-menu-item index="9-1" @click="isCollapse=!isCollapse"> <router-link to="/main/authManage"><i class="el-icon-tickets"></i>AuthManage</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-aside>

        <el-main class="main">
            <router-tab></router-tab>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    import {setCookie,getCookie,delCookie} from '../../static/js/cookie.js'
    export default {
        inject: ['reload'],

        data () {
            return {
                token: getCookie('lingxi-token'),
                username: getCookie('username'),
                isCollapse: false,
                chatStatus: 'font-size:20px;color: yellow',
            }
        },

        mounted(){
            if (this.token === 'None') {
                this.$router.push({path: '/login'})
            }

            this.$store.commit('controlShow')
        },

        methods: {
            chat () {
                // this.chatStatus = 'font-size:20px;color: white'
                window.open('https://www.食.tech:7996/websocket', '_blank')
            },

            controlScreenShow () {
                if (this.screenWidth < 1236) {
                    this.isshow = false;
                } else {
                    this.isshow = true;
                }
            },

            safeQuit () {
                delCookie('lingxi-token')
                delCookie('username')
                this.reload()
            },

            storage () {
                this.$confirm('正在进入seafile资料库，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() =>{
                    this.isCollapse = false
                    window.open('https://www.食.tech:7996/', '_blank')
                }).catch(() =>{
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
                
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

  .el-message-box{
      width: 310px !important;
    }

  .icon-wrap {
      font-size: 16px;
  }

</style>

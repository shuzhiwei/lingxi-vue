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
                <span>
                    <i class="el-icon-chat-dot-square" style="font-size:20px;color: white" @click="jumpChat">
                    </i>

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
            <el-submenu index="1" v-show="this.username !== 'helloworld'">
              <template slot="title"><i class="el-icon-location"></i>Blog</template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="isCollapse=!isCollapse"><router-link to="/main/home"><i class="el-icon-tickets"></i>Home</router-link></el-menu-item>
                <el-menu-item index="1-2" @click="isCollapse=!isCollapse"><router-link to="/main/add"><i class="el-icon-tickets"></i>Add</router-link></el-menu-item>
                <el-menu-item  index="1-3" @click="isCollapse=!isCollapse"><router-link to="/main/chat"><i class="el-icon-tickets"></i>Chat</router-link></el-menu-item>
                <el-menu-item v-show="this.username == 'shuzhiwei'" index="1-4" @click="isCollapse=!isCollapse"><router-link to="/main/test"><i class="el-icon-tickets"></i>test</router-link></el-menu-item>
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
              <template slot="title"><i class="el-icon-location"></i>Play</template>
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="isCollapse=!isCollapse"> <router-link to="/main/dytt"><i class="el-icon-tickets"></i>Dytt</router-link></el-menu-item>
                <el-menu-item index="3-2" @click="isCollapse=!isCollapse"> <router-link to="/main/vipParser"><i class="el-icon-tickets"></i>VipParser</router-link></el-menu-item>
                <el-menu-item index="3-3" @click="aiqiyi"> <i class="el-icon-tickets"></i>Aiqiyi</el-menu-item>
                <el-menu-item index="3-4" @click="music"> <i class="el-icon-tickets"></i>Music</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" v-show="this.username !== 'helloworld'">
              <template slot="title"><i class="el-icon-location"></i>Learn</template>
              <el-menu-item-group>
                <el-menu-item index="4-1" @click="storage"> <i class="el-icon-tickets"></i>Seafile</el-menu-item>
                <el-menu-item index="4-2" @click="board"> <i class="el-icon-tickets"></i>Board</el-menu-item>
                <el-menu-item index="4-3" @click="english"> <i class="el-icon-tickets"></i>English</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5" v-show="this.username == 'shuzhiwei'">
              <template slot="title"><i class="el-icon-location"></i>Work</template>
              <el-menu-item-group>
                <el-menu-item index="5-1" @click="personalNote"> <i class="el-icon-tickets"></i>Note</el-menu-item>
                <el-menu-item index="5-2" @click="jupyter"> <i class="el-icon-tickets"></i>Jupyter</el-menu-item>
                <el-menu-item index="5-3" @click="jenkins"> <i class="el-icon-tickets"></i>Jenkins</el-menu-item>
                <el-menu-item index="5-4" @click="konga"> <i class="el-icon-tickets"></i>Konga</el-menu-item>
                <el-menu-item index="5-5" @click="glances"> <i class="el-icon-tickets"></i>Glances</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu v-show="false" index="8">
              <template slot="title"><i class="el-icon-location"></i>Rde</template>
              <el-menu-item-group>
                <el-menu-item index="8-1" @click="isCollapse=!isCollapse"> <router-link to="/main/powerFactor"><i class="el-icon-tickets"></i>PowerFactor</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu v-show="(this.username == 'shuzhiwei' || this.username == 'admin')" index="9">
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
    import axios from 'axios'
    import {setCookie,getCookie,delCookie} from '../../static/js/cookie.js'
    export default {
        inject: ['reload'],

        data () {
            return {
                token: getCookie('lingxi-token'),
                username: getCookie('username'),
                isCollapse: false,
            }
        },

        mounted(){
            if (this.token === 'None') {
                this.$router.push({path: '/login'})
            }
            this.$store.commit('controlShow')
        },

        methods: {

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
                    window.open(this.$store.state.base_url + ':7996/', '_blank')
                }).catch(() =>{
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
                
            },
            aiqiyi () {
                window.open('https://www.iqiyi.com/', '_blank')
            },
            music () {
                window.open('https://music.163.com/', '_blank')
            },
            jenkins () {
                window.open(this.$store.state.base_url + ':7994/', '_blank')
            },
            konga () {
                window.open(this.$store.state.base_url + ':7993/', '_blank')
            },
            glances () {
                window.open(this.$store.state.base_url + ':7995/', '_blank')
            },
            jupyter () {
                window.open('http://www.nnbkqnp.cn:9999/notebooks/test.ipynb', '_blank')
            },

            jumpChat () {
                this.$router.push({path: '/main/chat'})
            },

            board () {
                this.isCollapse = false
                window.open('https://gitlab.com/lingxi-work/work-board/-/boards', '_blank')
            },

            personalNote () {
                this.isCollapse = false
                window.open('https://www.nnbkqnp.cn:7996/lib/2a8ae87c-ef5b-4966-ac0f-0d4f11d44591/file/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0.md', '_blank')
            },

            english () {
                this.isCollapse = false
                window.open('https://bdc.youzack.com/Recitation/Home/ChooseDictionary', '_blank')
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

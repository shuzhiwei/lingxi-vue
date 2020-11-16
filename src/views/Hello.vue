<template>
<div style="text-align:center">
    <!-- <label for="transfomer">配电室编码: </label>
    <el-input
        style="width:250px;"
        placeholder="请输入内容"
        v-model="input"
        type="text"
        clearable>
    </el-input> -->
    </br>
    <el-button type="primary" @click="reqJenkins">Jenkins</el-button>&nbsp;&nbsp;
    <el-button type="primary" @click="reqKonga">Konga</el-button>&nbsp;&nbsp;
    <el-button type="primary" @click="reqGlances">Glances</el-button>&nbsp;&nbsp;
    <el-button type="primary" @click="reqJupyter">Jupyter</el-button>&nbsp;&nbsp;

</div>
</template>

<script>
import { getCookie } from '../../static/js/cookie'
  export default {
    data() {
      return {
          token: getCookie('lingxi-token'),
          input: ''
      }
    },

    mounted () {
        if (!this.token) {
            this.$router.push({path: '/login'})
        }
    },

    methods: {
        reqJenkins () {
            window.open('https://www.食.tech:7994', '_blank')
        },

        reqKonga () {
            window.open('https://www.食.tech:7993', '_blank')
        },

        reqGlances () {
            window.open('https://www.食.tech:7995', '_blank')
        },

        reqJupyter () {
            window.open('https://www.食.tech:7992', '_blank')
        }
    }

  }
</script>
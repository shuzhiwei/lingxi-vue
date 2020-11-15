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
    <el-button type="primary" @click="reqJenkins">Jenkins</el-button></br></br>
    <el-button type="primary" @click="reqKonga">Konga</el-button></br>

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
            window.open('http://www.食.tech:8080', '_blank')
        },

        reqKonga () {
            window.open('http://www.食.tech:1337', '_blank')
        }
    }

  }
</script>
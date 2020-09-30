<template>
<div>
    <label for="transfomer">配电室编码: </label>
    <el-input
        style="width:250px;"
        placeholder="请输入内容"
        v-model="input"
        type="text"
        clearable>
    </el-input>
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

  }
</script>
<template>
  <div id="wrapper" align="center">
    <div align="center">
      <h1> Welcome to EfonMark!</h1>
    </div>

    <div align="center">
      <el-input id="input01"
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 40}"
        placeholder="请选择文件"
        v-model="textarea">
      </el-input>
    </div>

    <div align="center">
      <el-button type="primary" v-on:click="openFile()" round>选择文件</el-button>
      <input type="file" id="filename" style="display:none" multiple="multiple" @change="showRealPath"/>
    </div>

    <span v-for="(item, index) in images" :key="index">
        <img style="height:100px;weight:100px;" :src="item.image" alt="">
    </span>

  </div>
  
</template>

<script>
export default {
  data() {
    return {
      textarea: '',
      images: []
    }
  },
  methods: {
    openFile: function () {
      document.getElementById('filename').click()
    },
    showRealPath: function () {
      var files = document.getElementById('filename').files
      var paths = ''
      
      for (let i = 0; i < files.length; i++) {
        let name = files[i].name
        let reader = new FileReader();
        reader.readAsDataURL(files[i])
        reader.onload = ()=>{
            var image = reader.result
            console.log(name)
            console.log(image)
            this.images.push({'name': name, 'image': image})
        }
        paths += (files[i].name + '\n')
        
      }
      console.log(this.images.length)
      document.getElementById('input01').value = paths
    }
  }
}
</script>
<template>
  <ele-upload-video
    :data="{
      token: token
    }"
    :fileSize="20"
    @error="handleUploadError"
    :responseFn="handleResponse"
    style="margin: 50px"
    action="https://upload.qiniup.com/"
    v-model="video"
  />
</template>

<script>
import EleUploadVideo from "vue-ele-upload-video";
  export default {
      components: {
    EleUploadVideo
  },
    data() {
      return {
        // 上传时需要携带后台请求的token
        token: "xxxx",
        video: ""
      };
    },
    methods: {
      handleUploadError(error) {
        console.log("error", error);
      },
      handleResponse(response) {
        return "https://www.xxx.com/upload/video/" + response.id;
      }
    }
  };
</script>
<template>
    <div>
<div class="album albumvideo">
    <div>
        <p class="type_title">
            <span>视频介绍</span>
        </p>
        <div class="pic_img">
            <div class="pic_img_box">
                <el-upload class="avatar-uploader"
                           action="上传地址"
                           v-bind:data="{FoldPath:'上传目录',SecretKey:'安全验证'}"
                           v-bind:on-progress="uploadVideoProcess"
                           v-bind:on-success="handleVideoSuccess"
                           v-bind:before-upload="beforeUploadVideo"
                           v-bind:show-file-list="false">
                    <video v-if="videoForm.showVideoPath !='' && !videoFlag"
                           v-bind:src="videoForm.showVideoPath"
                           class="avatar video-avatar"
                           controls="controls">
                        您的浏览器不支持视频播放
                    </video>
                    <i v-else-if="videoForm.showVideoPath =='' && !videoFlag"
                       class="el-icon-plus avatar-uploader-icon"></i>
                    <el-progress v-if="videoFlag == true"
                                 type="circle"
                                 v-bind:percentage="videoUploadPercent"
                                 style="margin-top:7px;"></el-progress>
                </el-upload>
            </div>
        </div>
    </div>
    <p class="Upload_pictures">
        <span></span>
        <span>最多可以上传1个视频，建议大小50M，推荐格式mp4</span>
    </p>
</div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                videoFlag: false,
            //是否显示进度条
            videoUploadPercent: "",
            //进度条的进度，
            isShowUploadVideo: false,
            //显示上传按钮
            videoForm: {
                showVideoPath: ''
            }
            }
        },

        methods: {
            //上传前回调
            beforeUploadVideo(file) {
                var fileSize = file.size / 1024 / 1024 < 50;
                if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
                    layer.msg("请上传正确的视频格式");
                    return false;
                }
                if (!fileSize) {
                    layer.msg("视频大小不能超过50MB");
                    return false;
                }
                this.isShowUploadVideo = false;
            },
            //进度条
            uploadVideoProcess(event, file, fileList) {
                this.videoFlag = true;
                this.videoUploadPercent = file.percentage.toFixed(0) * 1;
            },
            //上传成功回调
            handleVideoSuccess(res, file) {
                this.isShowUploadVideo = true;
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                
                //前台上传地址
                //if (file.status == 'success' ) {
                //    this.videoForm.showVideoPath = file.url;
                //} else {
                //     layer.msg("上传失败，请重新上传");
                //}

                //后台上传地址
                if (res.Code == 0) {
                    this.videoForm.showVideoPath = res.Data;
                } else {
                    layer.msg(res.Message);
                }
            }
        }

    }
</script>

<style>

</style>
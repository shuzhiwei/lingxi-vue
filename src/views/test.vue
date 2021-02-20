<template>
    <div>
        <img src="https://lingxi-images.oss-cn-zhangjiakou.aliyuncs.com/1601449562-3168.jpeg?x-oss-process=style/aaa" alt="">
        <button @click="aaa">aaa</button>
    </div>
</template>

<script>
    import {b64_md5} from "../../static/js/md5.js"
    export default {
        methods: {
            aaa () {
                console.log(b64_md5("helloworld"))
            }
        }

    }
</script>

<style>

</style>
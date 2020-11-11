<template>
    <div style="text-align:center">
        </br>
        <label for="transfomer">vip电影链接: </label>
        <el-input
            style="width:500px;"
            placeholder="请输入电影链接"
            v-model="url"
            type="text"
            clearable>
        </el-input></br></br>
        <el-button type="primary" @click="search">观看</el-button><br/></br>
    </div>
</template>

<script>
    export default {
        
        data () {
            return {
                url: ''
            }
        },
        methods: {
            search () {
                const base_url = 'https://jx.618g.com/?url='
                const url = base_url + this.url
                window.open(url, '_blank')

            }
        }

    }
</script>

<style>

</style>
<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
    import Login from './views/Login.vue'
    import Share from './components/Share.vue'
    import ShareDetail from './components/ShareDetail.vue'
    export default {
        name: 'App',
        components: {
            Login,
            Share,
            ShareDetail,
        },
        
        provide () {
            return {
                reload: this.reload
            }
        },

        data () {
            return {
                isRouterAlive: true
            }
        },

        methods: {
            reload () {
                this.isRouterAlive = false
                this.$nextTick(function () {
                    this.isRouterAlive = true
                })
            }
        }
    }
</script>

<style>

</style>
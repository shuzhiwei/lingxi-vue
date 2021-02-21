<template>
<div>
    <li class="a" @mouseenter="aaa(true)" @mouseleave="aaa(false)" :style="{background: backColor}">
        <label class="b">
            <input class="c" type="checkbox" v-model="item.status"/>
            <span v-if="item.priority===1" class="d">{{item.todo}}</span>
            <span v-else>{{item.todo}}</span>
            
            <span v-if="item.priority===1" class="d">{{item.create_date}}</span>
            <span v-else>{{item.create_date}}</span>
        </label>
        <button id="e" class="btn btn-danger" v-show="isShow" @click='delItem'>删除</button>
    </li>
</div>
    
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    import {refresh_token} from '../../static/js/acs.js'
    export default {
        props: {
            item: Object,
            index: Number,
            delTodo: Function
        },
        data () {
            return {
                token: getCookie('lingxi-token'),
                username: getCookie('username'),
                backColor: 'white',
                isShow: false,
            }
        },
        methods: {
            
            aaa (isEnter) {
                if(isEnter){
                    this.backColor = 'gray'
                    this.isShow = true
                }else{
                    this.backColor = 'white'
                    this.isShow = false
                }
            },
            delItem () {
                const {item, index, delTodo} = this
                if(window.confirm(`确认删除${item.todo}吗？`)){
                    delTodo(index)
                }
            },
            
        }

    }
</script>

<style>
/*item*/
.a {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

.b {
  float: left;
  cursor: pointer;
}

.c {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

#e {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

</style>
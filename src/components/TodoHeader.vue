<template>
     <div class="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" 
            v-model="todo" @keyup.enter="addItem"/>
      </div>
</template>

<script>
    
    export default {
        props: {
            addTodo: Function
        },
        data () {
            return {
                todo: ''
            }
        },
        methods: {
            addItem(){
                const todo = this.todo.trim()
                if(!todo){
                    alert('输入不能为空！')
                    return
                }
                // this.addTodo(todo)
                // 触发自定义事件
                this.$emit('addTodo', todo)

                this.todo = ''
            }
        }
    }
</script>

<style>

</style>
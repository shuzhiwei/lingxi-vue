<template>
    <div class="todo-footer">
        <label>
          <input type="checkbox" v-model="isAllCheck"/>
        </label>
        <span>
          <span>已勾选{{completeSize}}</span> / 全部{{todos.length}}
        </span>
        <button class="btn btn-danger" v-show="completeSize" @click="aaa">完成已勾选</button>
      </div>
</template>

<script>
    export default {
        props: {
            todos: Array,
            deleteCompleteTodos: Function,
            selectAllTodos: Function
        },
        computed: {
            completeSize () {
                return this.todos.reduce((preTotal, todo) => preTotal + (todo.status?1:0), 0)
            },
            isAllCheck: {
                get () {
                    return this.completeSize == this.todos.length && this.completeSize > 0
                },
                set (value) {
                    this.selectAllTodos(value) 
                }
            }
        },
        methods : {
            aaa () {
                this.$confirm(`确认完成所有已勾选任务吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() =>{
                    this.deleteCompleteTodos()
                }).catch(() =>{
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            }
        }

    }
</script>

<style>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  /* float: right; */
  margin-left: 50px;
  margin-top: 1px;
}

</style>
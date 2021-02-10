<template>
    <ul class="todo-main">
        
        <todo-item-history v-for="(item, index) in todos" :key=index :item=item :index=item.id :delTodo="delTodo"/>
      </ul>
</template>

<script>
    import TodoItemHistory from './TodoItemHistory.vue'
    export default {
        props: {
            todos: Array,
            delTodo: Function
        },
        components: {
            TodoItemHistory
        }

    }
</script>

<style>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}

</style>
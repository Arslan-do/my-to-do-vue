<script setup>
import { getTodo } from '@/api/todo/getTodo';
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const todo = reactive({})

onMounted( async ()=> {
  const newTodo =  await getTodo(route.params.id);
  Object.assign(todo, newTodo);
});

</script>

<template>
  <div class="todo-app">
    <div class="container">
      {{todo}}
    </div>
  </div>
</template>

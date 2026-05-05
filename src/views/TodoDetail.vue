<script setup>
import { getTodo } from '@/api/todo/getTodo';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const todo = ref(null);


onMounted( async ()=> {
  const newTodo =  await getTodo(route.params.id);
  todo.value = newTodo;
});

</script>

<template>
  <div class="todo-app">
    <div class="container">
      <div v-if="todo">{{ todo }}</div>
    <div v-else></div>
    </div>
  </div>
</template>

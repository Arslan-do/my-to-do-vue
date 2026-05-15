<script setup lang="ts">
import { getTodo } from '@/api/todo/getTodo';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { ApiTodo } from '@/types/todo';

const route = useRoute();
const todo = ref<ApiTodo | null>(null)

 function getRouteParamId(
  param: string | string[] | undefined
): string | null {
  if (param == null) return null
  if (Array.isArray(param)) return param[0] ?? null
  return param
}



onMounted( async ()=> {
  const newTodo =  await getTodo(route.params.id as string);
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

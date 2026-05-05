<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <div class="todo-app">
    <div class="container">

            {{route.params.id}}
        
    </div>
  </div>
</template>


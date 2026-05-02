import TodoList from "@/views/TodoList.vue"


import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: TodoList}
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export {routes}
import TodoList from "@/views/TodoList.vue"
import TodoDetail from "@/views/TodoDetail.vue"


import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: TodoList},
  { path: '/todo/:id', component: TodoDetail},
  
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export {routes}
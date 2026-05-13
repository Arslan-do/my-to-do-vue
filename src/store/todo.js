import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getTodos } from '@/api/todo/getTodos'

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref([])

  const todoTasks = computed(() => tasks.value.filter((t) => !t.completed))
  const doneTasks = computed(() => tasks.value.filter((t) => t.completed))

  function addTask(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    tasks.value.push({
      id: Date.now(),
      text: trimmed,
      completed: false,
    })
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  function toggleTask(id) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) task.completed = !task.completed
  }

  async function fetchTodos() {
    const rawTodos = await getTodos()
    if (!Array.isArray(rawTodos)) return
    tasks.value = rawTodos.map((todo) => ({
      id: todo.id,
      text: todo.title ?? todo.text ?? '',
      completed: Boolean(todo.completed),
    }))
  }

  return {
    tasks,
    todoTasks,
    doneTasks,
    addTask,
    deleteTask,
    toggleTask,
    fetchTodos,
  }
})
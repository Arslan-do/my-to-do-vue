import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getTodos } from '@/api/todo/getTodos'
import type { Task } from '@/types/todo'
import { mapApiTodoToTask } from '@/types/todo'

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref<Task[]>([])

  const todoTasks = computed(() => tasks.value.filter((t) => !t.completed))
  const doneTasks = computed(() => tasks.value.filter((t) => t.completed))

  function addTask(text: string): void {
    const trimmed = text.trim()
    if (!trimmed) return
    tasks.value.push({
      id: Date.now(),
      text: trimmed,
      completed: false,
    })
  }

  function deleteTask(id: number): void {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  function toggleTask(id: number): void {
    const task = tasks.value.find((t) => t.id === id)
    if (task) task.completed = !task.completed
  }

  async function fetchTodos(): Promise<void> {
    const rawTodos = await getTodos()
    if (!Array.isArray(rawTodos)) return
    tasks.value = rawTodos.map(mapApiTodoToTask)
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
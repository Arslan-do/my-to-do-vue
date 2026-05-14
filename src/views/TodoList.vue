<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import GroupIcon from '@/components/icons/GroupIcon.vue'
import VectorIcon from '@/components/icons/VectorIcon.vue'
import ArrowForward from '@/components/icons/ArrowForward.vue'
import { useCounter } from '@/composables/useCounter'
import { useTodoStore } from '@/store/todo'
import { useMinWidth } from '@/composables/useMinWidth'
import { MIN_TODO_LAYOUT_PX } from '@/constants/breakpoints'


const newTaskText = ref('');

const router = useRouter();

const todoStore = useTodoStore()
const { todoTasks, doneTasks } = storeToRefs(todoStore)

onMounted(() => {
  todoStore.fetchTodos()
})

const addTask = () => {
  todoStore.addTask(newTaskText.value)
  newTaskText.value = ''
}

const deleteTask = (id) => {
  todoStore.deleteTask(id)
}

const toggleTask = (id) => {
  todoStore.toggleTask(id)
}

const { isAbove: isLayoutWideEnough } = useMinWidth(MIN_TODO_LAYOUT_PX - 1)

const onTodoNav = (id) => {
  router.push(`/todo/${id}`)
}

const counterComposable = useCounter();
const counterButton = useCounter();
</script>

<template>
  <div class="todo-app">
    <div class="container">
      <template v-if="isLayoutWideEnough">
      <div class="add-task">
        <input
          v-model="newTaskText"
          @keyup.enter="addTask"
          placeholder="Add a new task"
        />
        <button @click="addTask" class="add-btn">
          <VectorIcon />
        </button>
      </div>
      <div class="tasks-section">
        <h3 class="h32">Tasks to do - {{ todoTasks.length }}</h3>
        <div v-for="task in todoTasks" :key="task.id" class="task-item">
          <span :class="{ completed: task.completed }"> {{ task.text }} </span>

          <GroupIcon @click="toggleTask(task.id)" />

          <button @click="deleteTask(task.id)" class="delete-btn">
            <TrashIcon />
          </button>
          <button @click="onTodoNav(task.id)" class="arrow-btn">
            <ArrowForward />
          </button>
        </div>
      </div>

      <div class="done-section">
        <h3 class="h33">
          Done <span v-if="doneTasks.length > 0">- {{ doneTasks.length }}</span>
        </h3>
        <div v-for="task in doneTasks" :key="task.id" class="task-item">
          <span class="completed-done">{{ task.text }}</span>

          <GroupIcon
            @click="toggleTask(task.id)"
            class="task-item-done"
          />

          <button @click="deleteTask(task.id)" class="delete-btn">
            <TrashIcon />
          </button>
        </div>

        <div v-if="doneTasks.length === 0" class="empty-state">
          Ничего не найдено...
        </div>
      </div>
      </template>
      <p v-else class="too-small-msg">Sorry, too small</p>
    </div>
  </div>
</template>

<style>
.todo-app {
  background-color: #1d1825;
  width: 583px;
  border-radius: 20px;
  margin: 40px auto;
  font-family: 'Inter', sans-serif;
  color: #ffffff;
}

.container {
  padding: 55px 85px 55px 60px;
  width: 432px;
  height: 100%;
}

.too-small-msg {
  margin: 0;
  color: #9e78cf;
  font-size: 16px;
}

.add-task {
  height: 40px;
  border-radius: 10px;
  border-width: 1px;
  display: flex;
  gap: 8px;
  flex-flow: row;
}

.add-btn {
  width: 40px;
  height: 40px;
  background-color: #9e78cf;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 40px;
  font-weight: 100;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.add-task input {
  width: 381px;
  padding: 8px;
  border: 1px solid #9e78cf;
  background-color: #1d1825;
  color: #9e78cf;
  border-radius: 10px;
}

.tasks-section {
  margin: 60px 0px 0px 0px;
}

.done-section {
  margin: 60px 0px 0px 0px;
}

.done-section .task-item:last-child {
  margin-bottom: 0;
}

.task-item {
  background: #15101c;
  display: flex;
  align-items: center;
  padding: 22px 20px;
  margin-bottom: 16px;
  border-radius: 10px;
}

.task-item span {
  width: 227px;
  height: 19px;
  color: #9e78cf;
  flex: 1;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.done-section .task-item span {
  color: #78cfb0;
  text-decoration: line-through;
}

.task-item-done {
  cursor: pointer;
}

.delete-btn {
  width: 30px;
  height: 30px;
  padding: 4px 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9e78cf;
}

.arrow-btn {
  width: 30px;
  height: 30px;
  padding: 4px 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9e78cf;
}

.h32 {
  width: 135px;
  height: 19px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}

.h33 {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}
</style>

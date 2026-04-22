<script setup>
import { ref, computed } from 'vue'

const tasks = ref([
  { id: 1, text: 'Купить хлеб и изучить Vue.js', completed: true },
  { id: 2, text: 'Купить продуктов и изучить Vue.js', completed: false },
  { id: 3, text: 'Купить хлеб и изучить Vue.js', completed: false },
  { id: 4, text: 'Купить хлеб и изучить Vue.js', completed: false },
  { id: 5, text: 'To study React fundamentals', completed: false },
])

const newTaskText = ref('')


const todoTasks = computed(() => tasks.value.filter(t => !t.completed))
const doneTasks = computed(() => tasks.value.filter(t => t.completed))

const addTask = () => {
  if (newTaskText.value.trim()) {
    tasks.value.push({
      id: Date.now(),
      text: newTaskText.value.trim(),
      completed: false,
    })
    newTaskText.value = ''
  }
}

const deleteTask = (id) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

</script>

<template>
<div class="todo-app">
<div class="add-task" >
    <input 
    v-model="newTaskText" 
        @keyup.enter="addTask"
    placeholder="Add a new task"
    />
    <button @click="addTask" class="add-btn">+</button>
</div>
    <div class="tasks-section"> 
        <h3>Tasks to do - {{ todoTasks.length }} </h3>
        <div v-for="task in todoTasks" 
        :key="task.id" 
        class="task-item">
        <span :class="{ completed: task.completed }">{{ task.text }}></span>
            <input type="checkbox"
            v-model="task.completed"
            />
        <button @click="deleteTask(task.id)" class="delete-btn"
        >
      <img src="/src\image\TrashSimple.svg" alt="">
      </button>
    </div>
    </div>

    <div class="done-section" >
<h3>Done <span v-if="doneTasks.length > 0">- {{ doneTasks.length }}</span></h3>
<div v-for="task in doneTasks" 
        :key="task.id" 
        class="task-item"
        > 
        <span class="completed-done">{{ task.text }}</span>
    <input type="checkbox"
    v-model="task.completed"
    />
    <button @click="deleteTask(task.id)" class="delete-btn">
    <img src="/src\image\TrashSimple.svg" alt="нет картины">
    </button>
  </div>

  <div v-if="doneTasks.length === 0" class="empty-state">
      Ничего не найдено...
  </div>
</div>
</div>

</template>

<style scoped>

.todo-app {
  max-width: 585px;
  max-height: 758px;
  margin: 0 auto;
  font-family: sans-serif;
  color: #ffff;
}

.add-task {
  display: flex;
  gap: 8px;
  flex-flow: row;
  margin-bottom: 24px;
}

.add-btn{
width: 32px;
height: 32px;
background-color: #9E78CF;
color: #ffff;
}

.add-task input {
  max-width: none;
  width: 100%;
  padding: 8px;
  border: 1px solid #9E78CF;
  border-radius: 4px;
  background-color: #1D1825;
}

.task-item {
background: #15101C;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px ;
  border-bottom: 16px solid #1D1825;
}

.task-item span {
  width: 227px;
height: 19px;
    color: #9E78CF;
  flex: 1;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.completed-done {
  text-decoration: line-through;
  color: #78CFB0;
}
.done-section .task-item span {
  color: #78CFB0;
}

.delete-btn {
width: 30px;
height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9E78CF;
}

h3 {
margin: 16px 0 8px;
width: 115px;
height: 19px;
font-family: Inter;
font-weight: 400;
font-size: 16px;
line-height: 100%;
}

 .task-item input[type="checkbox"] {
  accent-color: #9E78CF; 
  width: 20px;
  height: 20px;
  cursor: pointer;
}


</style>
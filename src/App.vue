<script setup>
import { ref, computed } from 'vue';

const tasks = ref([
  { id: 1, text: 'Купить хлеб и изучить Vue.js', completed: true },
  { id: 2, text: 'Купить продуктов и изучить Vue.js', completed: false },
  { id: 3, text: 'Занятся спортом и изучить Vue.js', completed: false },
  { id: 4, text: 'Купить хлеб и изучить Vue.js', completed: false },
  { id: 5, text: 'Изучить основы React', completed: false },
]);

const newTaskText = ref('');

const todoTasks = computed(() => tasks.value.filter((t) => !t.completed));
const doneTasks = computed(() => tasks.value.filter((t) => t.completed));

const addTask = () => {
  if (newTaskText.value.trim()) {
    tasks.value.push({
      id: Date.now(),
      text: newTaskText.value.trim(),
      completed: false,
    });
    newTaskText.value = '';
  }
};

const deleteTask = (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id);
};
</script>

<template>
  <div class="todo-app">
    <div class="add-task">
      <input
        v-model="newTaskText"
        @keyup.enter="addTask"
        placeholder="Add a new task"
      />
      <button @click="addTask" class="add-btn">+</button>
    </div>
    <div class="tasks-section">
      <h3>Tasks to do - {{ todoTasks.length }}</h3>
      <div v-for="task in todoTasks" :key="task.id" class="task-item">
        <span :class="{ completed: task.completed }"> {{ task.text }} </span>
        <label >
          <input type="checkbox" v-model="task.completed" />
          <span></span>
        </label>
        <button @click="deleteTask(task.id)" class="delete-btn">
          <img src="/src\image\TrashSimple.svg" alt="Удалить" />
        </button>
      </div>
    </div>

    <div class="done-section">
      <h3 class="done-h3">
        Done <span v-if="doneTasks.length > 0">- {{ doneTasks.length }}</span>
      </h3>
      <div v-for="task in doneTasks" :key="task.id" class="task-item">
        <span class="completed-done">{{ task.text }}</span>
        <label >
          <input type="checkbox" v-model="task.completed" />
          <span></span>
        </label>
        <button @click="deleteTask(task.id)" class="delete-btn">
          <img src="/src\image\TrashSimple.svg" alt="нет картины" />
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
  position: absolute;
  left: 600px;
  top: 100px;
  background-color: #1d1825;
  width: 583px;
  height: max(100% 758px);
  
  border-radius: 20px;
  margin: 40px auto;
  font-family: 'Inter', sans-serif;
  color: #ffff;
}

.add-task {
padding: 50px 65px 30px;
width: 454px;
height: 32px;
border-radius: 10px;
border-width: 1px;
  display: flex;
  gap: 8px;
  flex-flow: row;
  margin-bottom: 24px;
}

.add-btn {
  width: 32px;
  height: 32px;
  background-color: #9e78cf;
  color: #ffff;
  border: none;
  border-radius: 10px;
  font-size: 35px;          /* Размер плюса */
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

.task-item {
  width: 432px;
  height: 70px;
  background: #15101c;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0px 20px;
  margin: 16px 60px;
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

.completed-done {
  text-decoration: line-through;
  color: #78cfb0;
}
.done-section .task-item span {
  color: #78cfb0;
}

.delete-btn {
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9e78cf;
}

h3 {
  margin:10px;
padding-left: 60px;
  width: 115px;
  height: 19px;
  font-family: Inter;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}
.done-h3{
  margin: 10px 60px;
  padding: 50px 10px 0px 10px;
}

label input {
  display: none;
}

label span {
  margin: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border: 2px solid #9e78cf;
  position: relative;
  border-radius: 2px;
  padding: 0 8px 0 10px;
}

[type=checkbox]:checked + span:before{
  color: #9e78cf;
  content: '\2714';
  position: absolute;
  top: -5px;
  left: 0;
  font-size: 23px;
}

/* .task-item input[type='checkbox'] {
  accent-color: #9e78cf;
  width: 20px;
  height: 20px;
  cursor: pointer;
} */

/* .task-item input[type="checkbox"]:hover {
  box-shadow: 0 0 0 1px #9e78cf;
} */


.empty-state{
  margin: 5px 10px 5px 10px;
  padding: 0px 10px 10px 50px;
}
</style>

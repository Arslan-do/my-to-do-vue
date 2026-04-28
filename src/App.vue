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
    <div class="container"> 
    <div class="add-task">
      <input
        v-model="newTaskText"
        @keyup.enter="addTask"
        placeholder="Add a new task"
      />
      <button @click="addTask" class="add-btn"><img src="/src\image\Vector.svg" alt="pulus"></button>
    </div>
    <div class="tasks-section">
      <h3>Tasks to do - {{ todoTasks.length }}</h3>
      <div v-for="task in todoTasks" :key="task.id" class="task-item">
        <span :class="{ completed: task.completed }"> {{ task.text }} </span>
        <img src="/src\image\Group 1.svg" alt="done" @click="task.completed = !task.completed"
  style="cursor: pointer">
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
        <img src="/src\image\Group 1.svg" alt="done" @click="task.completed = !task.completed"
  style="cursor: pointer">
        <button @click="deleteTask(task.id)" class="delete-btn">
          <img src="/src\image\TrashSimple.svg"  alt="нет картины" />
        </button>
      </div>

      <div v-if="doneTasks.length === 0" class="empty-state">
        Ничего не найдено...
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
:global(body) {
  background-color: #0D0714;
  margin: 0;
  min-height: 100vh;
}
.todo-app {
  background-color: #1d1825;
  width: 583px;
  border-radius: 20px;
  margin: 40px auto;
  font-family: 'Inter', sans-serif;
  color: #ffff;
}
.container{
padding: 55px 85px 55px  60px;
width: 432px;
height: 100%;
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
  color: #FFFFFF;
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

.task-item {
  height: 70px;
  background: #15101c;
  display: flex;
  align-items: center;
  padding: 0px 20px;
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
  padding: 4px 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9e78cf;
}

h3 {
  margin: 0;
  padding: 60px 0px 17px 0px;
  width: 115px;
  height: 19px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}
.done-h3{
  font-family: 'Inter', sans-serif;
  padding: 60px 0px 17px 0px;
}

</style>

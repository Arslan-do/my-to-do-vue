<script setup>
import { ref, computed } from 'vue';
import TrashIcon from '@/components/icons/TrashIcon.vue'; 
import GroupIcon from '@/components/icons/GroupIcon.vue';
import VectorIcon from '@/components/icons/VectorIcon.vue';

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
    <div class="todo-app__container">
      <div class="todo-app__add-task">
        <input
          v-model="newTaskText"
          @keyup.enter="addTask"
          placeholder="Add a new task"
        />
        <button @click="addTask" class="todo-app__add-btn">
          <VectorIcon/>
        </button>
      </div>
      <div class="todo-app__tasks-section">
        <h3 class="todo-app__h32">Tasks to do - {{ todoTasks.length }}</h3>
        <div v-for="task in todoTasks" :key="task.id" class="todo-app__task-item">
          <span :class="{ completed: task.completed }"> {{ task.text }} </span>

          <GroupIcon @click="task.completed = !task.completed" style="cursor: pointer"/>
          
          <button @click="deleteTask(task.id)" class="todo-app__delete-btn">
            <TrashIcon/>
          </button>
        </div>
      </div>

      <div class="todo-app__done-section">
        <h3 class="todo-app__h33">
          Done <span v-if="doneTasks.length > 0">- {{ doneTasks.length }}</span>
        </h3>
        <div v-for="task in doneTasks" :key="task.id" class="todo-app__task-item">
          <span class="completed-done">{{ task.text }}</span>
          
          <GroupIcon @click="task.completed = !task.completed" style="cursor: pointer"/>
          
          <button @click="deleteTask(task.id)" class="todo-app__delete-btn">
            <TrashIcon/>
          </button>
        </div>

        <div v-if="doneTasks.length === 0" class="todo-app__empty-state">
          Ничего не найдено...
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:global(body) {
  background-color: #0d0714;
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
.todo-app__container {
  padding: 55px 85px 55px 60px;
  width: 432px;
  height: 100%;
}

.todo-app__add-task {
  height: 40px;
  border-radius: 10px;
  border-width: 1px;
  display: flex;
  gap: 8px;
  flex-flow: row;
}

.todo-app__add-btn {
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

.todo-app__add-task input {
  width: 381px;
  padding: 8px;
  border: 1px solid #9e78cf;
  background-color: #1d1825;
  color: #9e78cf;
  border-radius: 10px;
}

.todo-app__task-item {
  height: 70px;
  background: #15101c;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  margin-bottom: 16px;
  border-radius: 10px;
}

.todo-app__task-item span {
  width: 227px;
  height: 19px;
  color: #9e78cf;
  flex: 1;
}

.todo-app__completed {
  text-decoration: line-through;
  color: #999;
}

.todo-app__completed-done {
  text-decoration: line-through;
  color: #78cfb0;
}
.todo-app__done-section .task-item span {
  color: #78cfb0;
}

.todo-app__delete-btn {
  width: 30px;
  height: 30px;
  padding: 4px 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9e78cf;
}

.todo-app__h32 {
  margin: 0;
  padding: 60px 0px 17px 0px;
  width: 115px;
  height: 19px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}
.todo-app__h33 {
  margin: 0;
  font-family: 'Inter', sans-serif;
  padding: 60px 0px 17px 0px;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}
</style>

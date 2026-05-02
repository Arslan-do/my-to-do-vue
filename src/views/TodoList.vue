<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import TrashIcon from '@/components/icons/TrashIcon.vue'; 
import GroupIcon from '@/components/icons/GroupIcon.vue';
import VectorIcon from '@/components/icons/VectorIcon.vue';
import ArrowForward from '@/components/icons/ArrowForward.vue';

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
const router = useRouter();

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

const onTodoNav = (id) => {
  router.push(`/todo/${id}`);
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
        <button @click="addTask" class="add-btn">
          <VectorIcon/>
        </button>
      </div>
      <div class="tasks-section">
        <h3 class="h32">Tasks to do - {{ todoTasks.length }}</h3>
        <div v-for="task in todoTasks" :key="task.id" class="task-item">
          <span :class="{ completed: task.completed }"> {{ task.text }} </span>

          <GroupIcon @click="task.completed = !task.completed"/>
          
          <button @click="deleteTask(task.id)" class="delete-btn">
            <TrashIcon/>
          </button>
          <button @click="onTodoNav(task.id)" class="arrow-btn"> 
            <ArrowForward/>  
          </button>
        </div>
      </div>

      <div class="done-section">
        <h3 class="h33">
          Done <span v-if="doneTasks.length > 0">- {{ doneTasks.length }}</span>
        </h3>
        <div v-for="task in doneTasks" :key="task.id" class="task-item">
          <span class="completed-done">{{ task.text }}</span>
          
            <GroupIcon @click="task.completed = !task.completed" class="task-item-done"/>
          
          <button @click="deleteTask(task.id)" class="delete-btn">
            <TrashIcon/>
          </button>
        </div>

        <div v-if="doneTasks.length === 0" class="empty-state">
          Ничего не найдено...
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { getTodos } from '@/api/todo/getTodos';
import { useRouter } from 'vue-router';
import TrashIcon from '@/components/icons/TrashIcon.vue';
import GroupIcon from '@/components/icons/GroupIcon.vue';
import VectorIcon from '@/components/icons/VectorIcon.vue';
import ArrowForward from '@/components/icons/ArrowForward.vue';
import { useCounter } from '@/composables/useCounter';

const tasks = ref([
  { id: 1, text: 'Купить хлеб и изучить Vue.js', completed: false },
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

onMounted(async () => {
  const rawTodos = await getTodos();
  if (!Array.isArray(rawTodos)) return;
  tasks.value = rawTodos.map((todo) => ({
    id: todo.id,
    text: todo.title ?? todo.text ?? '',
    completed: Boolean(todo.completed),
  }));
});

const counterComposable = useCounter();
const counterButton = useCounter();
</script>

<template>
  <div class="todo-app">
    <div class="container">
      <hr />
      <p>{{ counterComposable.count }}</p>
      <button @click="counterComposable.increment">+</button>
      <hr />
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

          <GroupIcon @click="task.completed = !task.completed" />

          <button @click="deleteTask(task.id)" class="delete-btn">
            <TrashIcon />
          </button>
          <button @click="onTodoNav(task.id)" class="arrow-btn">
            <ArrowForward />
          </button>
          
          <div class="counter-btn">
            <p>{{ counterButton.count }}</p>
            <button @click="counterButton.increment" class="increment-btn">
              <VectorIcon />
            </button>
          </div>

        </div>
      </div>

      <div class="done-section">
        <h3 class="h33">
          Done <span v-if="doneTasks.length > 0">- {{ doneTasks.length }}</span>
        </h3>
        <div v-for="task in doneTasks" :key="task.id" class="task-item">
          <span class="completed-done">{{ task.text }}</span>

          <GroupIcon
            @click="task.completed = !task.completed"
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

.increment-btn {
  width: 30px;
  height: 30px;
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

.counter-btn{
  display: flex;
  align-items: center;
  gap: 4px;
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

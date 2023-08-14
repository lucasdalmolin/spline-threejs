<script  lang="ts">
  import { ref, type Ref } from 'vue';
  import TaskDetails from './components/TaskDetails.vue'
  import TaskForm from './components/TaskForm.vue'
  import { useTaskStore } from './stores/TaskStore'
  import { storeToRefs } from 'pinia';
  import type { Task } from './types/task';

  type ReturnTypeOfUseTaskStore = ReturnType<typeof useTaskStore>;

  interface SetupReturn {
    taskStore: ReturnTypeOfUseTaskStore;
    filter: Ref<string>;
    tasks: Ref<Task[]>;             
    loading: Ref<boolean>;
    favs: Ref<Task[]>;           
    totalCount: Ref<number>;
    favCount: Ref<number>;
}

export default {
    components: { TaskDetails, TaskForm },
    setup(): SetupReturn {
        const taskStore = useTaskStore();

        const { tasks, loading, favs, totalCount, favCount } = storeToRefs(taskStore)

        taskStore.getTasks()
        const filter = ref('all')

        return { taskStore, filter, tasks, loading, favs, totalCount, favCount };
    }
}
</script>

<template>
  <div>
    <router-view/>
  </div>
  <!-- header -->
  <!-- <router-link to="/model-test">Inicio</router-link>
  <router-view /> -->
  <!-- new-task-form -->
  <!-- <div class="new-task-form">
    <TaskForm />
  </div> -->
  <!-- filter -->
  <!-- <nav class="filter">
    <button @click="filter = 'all'">All tasks</button>
    <button @click="filter = 'favs'">Favs tasks</button>
  </nav> -->
  <!-- loading -->
  <!-- <div class="loading" v-if="loading">Loading tasks...</div> -->
  <!-- task list -->
  <!-- <div class="task-list" v-if="filter === 'all'">
    <p>You have {{ totalCount }} left to do</p>
    <div v-for="task in tasks" :key="task.id">
      <TaskDetails :task="task"/>
    </div>
  </div> -->
  <!-- <div class="task-list" v-if="filter === 'favs'">
    <p>You have {{ favCount }} left to do</p>
    <p>fav Takss</p>
    <div v-for="task in favs" :key="task.id">
      <TaskDetails :task="task"/>
    </div>
  </div> -->
</template>

<style lang="scss">
  @import './styles/globals.scss'
</style>

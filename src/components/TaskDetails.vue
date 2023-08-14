<template>
    <div class="task">
        <h3>{{ task.title }}</h3>
        <div class="icon">
            <button @click="taskStore.deleteTask(task.id)">delete</button>
            <button @click="taskStore.toggleFav(task.id)">favorite</button>
        </div>
    </div>
</template>

<script lang="ts">
import { useTaskStore } from '@/stores/TaskStore';

    export default {
        props: ['task'],
        setup() {
            const taskStore = useTaskStore()

            return { taskStore }
        }
    }
</script>

<style lang="scss" scoped>

</style>
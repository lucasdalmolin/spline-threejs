<template>
    <form @submit.prevent="handleSubmit">
        <input 
            type="text"
            placeholder="i need to...."
            v-model="newTask"
        >
        <button>Add</button>
    </form>
</template>

<script lang="ts">
    import { useTaskStore } from '@/stores/TaskStore';
    import { ref, type Ref } from 'vue';

    type ReturnTypeOfUseTaskStore = ReturnType<typeof useTaskStore>;

    interface SetupReturn {
        taskStore: ReturnTypeOfUseTaskStore;
        newTask: Ref<string>;
        handleSubmit: () => void;
        
    }

    export default {
        setup(): SetupReturn {
            const taskStore = useTaskStore()
            const newTask = ref('')

            const handleSubmit = () => {
                if(newTask.value.length > 0) {
                    taskStore.addTask({
                        title: newTask.value,
                        isFav: false,
                        id: Math.floor(Math.random() * 10000)
                    })
                    newTask.value = ''
                }

                return { handleSubmit, newTask }
            }

            return { taskStore, newTask, handleSubmit }
        }
    }
</script>

<style lang="scss" scoped>

</style>
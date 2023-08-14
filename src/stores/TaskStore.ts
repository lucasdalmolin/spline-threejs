import { defineStore } from "pinia";
import { type Task } from "@/types/task";

export type State = {
    tasks: Task[]
    loading: boolean;
}
// {id: 1, title: "aprender Vue", isFav: false},
// {id: 2, title: "aprender Pinia", isFav: true},
export const useTaskStore = defineStore('taskStore', {
    state: (): State => ({
        tasks: [],
        loading: false
    }),
    getters: {
        favs(): Task[] {
            return this.tasks.filter((task) => task.isFav)
        },
        favCount(): number {
            return this.tasks.reduce((prev, current) => {
                return current.isFav ? prev + 1 : prev
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    actions: {
        async getTasks() {
            this.loading = true

            const res = await fetch('http://localhost:3000/tasks')

            if (!res.ok) {
                console.error('There was an error fetching tasks.');
                this.loading = false;
                return;
            }

            const data = await res.json();
            this.tasks = data
            this.loading = false
        },
        async addTask(task: Task) {
            this.tasks.push(task)

            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            })

            if (!res.ok) {
                console.error('There was an error adding a task.');
            }
        },
        async deleteTask(id: number) {
            this.tasks = this.tasks.filter(task => {
                return task.id !== id
            })

            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'DELETE',
            })

            if (!res.ok) {
                console.error('There was an error adding a task.');
            }
        },
        async toggleFav(id: number) {
            const task = this.tasks.find(task => task.id === id)
            if(task) {
                task.isFav = !task?.isFav
            }

            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'PATCH',
                body: JSON.stringify({ isFav: task?.isFav }),
                headers: {'Content-Type': 'application/json'}
            })

            if (!res.ok) {
                console.error('There was an error adding a task.');
            }
        }
    }
});
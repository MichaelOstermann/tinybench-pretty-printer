import type { Bench } from "tinybench"
import type { TaskOptions } from "./types.js"
import { createTask } from "./createTask.js"

export function createBench(tasks: TaskOptions[]) {
    return {
        tasks: tasks.map(createTask),
    } as Bench
}

import type Bench from 'tinybench'
import { createTask } from './createTask.js'
import type { TaskOptions } from './types.js'

export function createBench(tasks: TaskOptions[]) {
    return {
        tasks: tasks.map(createTask),
    } as Bench
}

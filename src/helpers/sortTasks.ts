import type { SortMethod, TaskWithResult } from '../types.js'

export function sortTasks(
    tasks: TaskWithResult[],
    method?: SortMethod,
): TaskWithResult[] {
    switch (method) {
        case false: return tasks
        case undefined: return tasks.sort((a, b) => b.result.hz - a.result.hz)
        case 'asc': return tasks.sort((a, b) => a.result.hz - b.result.hz)
        case 'desc': return tasks.sort((a, b) => b.result.hz - a.result.hz)
        default: return method(tasks)
    }
}

import type { SortMethod, TaskWithResult } from "../types.js"

export function sortTasks(
    tasks: TaskWithResult[],
    method?: SortMethod,
): TaskWithResult[] {
    switch (method) {
        case false: return tasks
        case undefined: return tasks.sort((a, b) => b.result.throughput.mean - a.result.throughput.mean)
        case "asc": return tasks.sort((a, b) => a.result.throughput.mean - b.result.throughput.mean)
        case "desc": return tasks.sort((a, b) => b.result.throughput.mean - a.result.throughput.mean)
        default: return method(tasks)
    }
}

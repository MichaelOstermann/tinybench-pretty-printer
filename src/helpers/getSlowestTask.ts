import type { TaskWithResult } from "../types.js"

export function getSlowestTask(tasks: TaskWithResult[]): TaskWithResult | undefined {
    const [first] = tasks
    return first ? tasks.reduce((a, b) => a.result.throughput.mean < b.result.throughput.mean ? a : b, first) : undefined
}

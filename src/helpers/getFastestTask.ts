import type { TaskWithResult } from '../types.js'

export function getFastestTask(tasks: TaskWithResult[]): TaskWithResult | undefined {
    const [first] = tasks
    return first ? tasks.reduce((a, b) => a.result.hz < b.result.hz ? b : a, first) : undefined
}

import type { TaskWithResult } from '../types.js'

export function getSlowestTask(tasks: TaskWithResult[]): TaskWithResult | undefined {
    const [first] = tasks
    return first ? tasks.reduce((a, b) => a.result.hz < b.result.hz ? a : b, first) : undefined
}

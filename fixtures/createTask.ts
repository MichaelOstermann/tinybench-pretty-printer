import type { Task } from 'tinybench'
import type { TaskWithResult } from '../src/types.js'
import type { TaskOptions } from './types.js'

export function createTask({
    name = '',
    time = 0,
    margin = 0,
    samples = 0,
}: TaskOptions) {
    return {
        name,
        result: {
            hz: 1000 / time,
            mean: time,
            rme: margin,
            samples: { length: samples },
        },
    } as TaskWithResult
}

export function createInvalidTask() {
    return { name: '', result: undefined } as Task
}

export function createFailedTask() {
    return { name: '', result: { error: new Error('Whoops') } } as Task
}

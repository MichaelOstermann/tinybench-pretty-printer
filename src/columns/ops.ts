import type { Column, OpsOptions } from '../types.js'

export function ops(options: OpsOptions = {}): Column {
    return {
        header: options?.header ?? 'ops/sec',
        headerStyle: options?.headerStyle ?? ['bold'],
        headerAlignment: options?.headerAlignment ?? 'center',
        rowAlignment: options?.rowAlignment ?? 'right',
        rowStyle: options?.rowStyle ?? ['blue'],
        content({ task, tasks, formatCount }) {
            return formatCount(
                options.method ?? 'shortest',
                task.result.hz,
                tasks.map(task => task.result.hz),
            )
        },
    }
}

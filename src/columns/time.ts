import type { Column, TimeOptions } from '../types.js'

export function time(options: TimeOptions = {}): Column {
    return {
        header: options?.header ?? 'time/op',
        headerStyle: options?.headerStyle ?? ['bold'],
        headerAlignment: options?.headerAlignment ?? 'center',
        rowAlignment: options?.rowAlignment ?? 'right',
        rowStyle: options?.rowStyle ?? ['yellow'],
        content({ task, tasks, formatDuration }) {
            return formatDuration(
                options.method ?? 'shortest',
                task.result.mean,
                tasks.map(task => task.result.mean),
            )
        },
    }
}

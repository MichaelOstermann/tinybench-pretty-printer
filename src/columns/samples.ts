import type { Column, SamplesOptions } from '../types.js'

export function samples(options: SamplesOptions = {}): Column {
    return {
        header: options?.header ?? 'samples',
        headerStyle: options?.headerStyle ?? ['bold'],
        headerAlignment: options?.headerAlignment ?? 'center',
        rowAlignment: options?.rowAlignment ?? 'right',
        rowStyle: options?.rowStyle ?? ['magenta'],
        content({ task, tasks, formatCount }) {
            return formatCount(
                options.method ?? 'shortest',
                task.result.samples.length,
                tasks.map(task => task.result.samples.length),
            )
        },
    }
}

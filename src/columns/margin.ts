import type { Column, MarginOptions } from '../types.js'

export function margin(options: MarginOptions = {}): Column {
    return {
        header: options?.header ?? 'margin',
        headerStyle: options?.headerStyle ?? ['bold'],
        headerAlignment: options?.headerAlignment ?? 'center',
        rowAlignment: options?.rowAlignment ?? 'center',
        rowStyle: options?.rowStyle ?? ['magenta'],
        content({ task, locales }) {
            return `±${task.result.rme.toLocaleString(locales, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
        },
    }
}

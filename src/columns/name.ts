import type { Column, NameOptions } from '../types.js'

export function name(options: NameOptions = {}): Column {
    return {
        header: options?.header ?? 'name',
        headerStyle: options?.headerStyle ?? ['bold'],
        headerAlignment: options?.headerAlignment ?? 'center',
        rowAlignment: options?.rowAlignment ?? 'left',
        rowStyle: options?.rowStyle ?? [],
        content({ task }) {
            return task.name
        },
    }
}

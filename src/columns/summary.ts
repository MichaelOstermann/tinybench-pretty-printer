import type { Column, SummaryOptions } from '../types.js'

export function summary(options: SummaryOptions = {}): Column {
    const method = options.method ?? '%'
    const fastestTitle = options.fastestTitle || '🥇'

    return {
        header: options?.header ?? 'summary',
        headerStyle: options?.headerStyle ?? ['bold'],
        headerAlignment: options?.headerAlignment ?? 'center',
        rowAlignment: options?.rowAlignment ?? (method === '%' ? 'center' : 'right'),
        rowStyle: options?.rowStyle ?? [],
        content({ task, fastestTask, formatNumber }) {
            const fastestHz = fastestTask.result.hz
            const hz = task.result.hz

            if (hz === fastestHz) return fastestTitle

            switch (method) {
                case 'x': return `${formatNumber(fastestHz / hz)}x slower`
                case '%': return `${formatNumber(((hz - fastestHz) / fastestHz) * 100)}%`
                default: return ''
            }
        },
    }
}

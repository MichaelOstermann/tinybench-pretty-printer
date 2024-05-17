import { formatNumber } from '../helpers/formatNumber.js'
import { mean } from '../helpers/mean.js'
import type { DurationMethod } from '../types.js'

export function createDurationFormatter(locales: Intl.LocalesArgument) {
    return function formatDuration(
        method: DurationMethod,
        value: number,
        values: number[],
    ): string {
        switch (method) {
            case 'shortest': return formatDuration(resolveMethod(value), value, values)
            case 'highest': return formatDuration(resolveMethod(Math.max(...values)), value, values)
            case 'lowest': return formatDuration(resolveMethod(Math.min(...values)), value, values)
            case 'mean': return formatDuration(resolveMethod(mean(values)), value, values)
            case 'nanoseconds': return `${formatNumber(value * 1e6, locales)}ns`
            case 'microseconds': return `${formatNumber(value * 1e3, locales)}µs`
            case 'milliseconds': return `${formatNumber(value, locales)}ms`
            case 'seconds': return `${formatNumber(value / 1e3, locales)}s `
        }
    }
}

function resolveMethod(ms: number): DurationMethod {
    if ((ms / 1e3) >= 1) return 'seconds'
    if (ms >= 1) return 'milliseconds'
    if ((ms * 1e3) >= 1) return 'microseconds'
    return 'nanoseconds'
}

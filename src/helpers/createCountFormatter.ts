import type { CountMethod } from "../types.js"
import { formatNumber } from "../helpers/formatNumber.js"
import { mean } from "../helpers/mean.js"

export function createCountFormatter(locales: Intl.LocalesArgument) {
    return function formatCount(
        method: CountMethod,
        value: number,
        values: number[],
    ): string {
        switch (method) {
            case "none": return `${formatNumber(value, locales)} `
            case "shortest": return formatCount(resolveMethod(value), value, values)
            case "highest": return formatCount(resolveMethod(Math.max(...values)), value, values)
            case "lowest": return formatCount(resolveMethod(Math.min(...values)), value, values)
            case "mean": return formatCount(resolveMethod(mean(values)), value, values)
            case "thousands": return `${formatNumber(value / 1e3, locales)}K`
            case "millions": return `${formatNumber(value / 1e6, locales)}M`
            case "billions": return `${formatNumber(value / 1e9, locales)}B`
        }
    }
}

function resolveMethod(value: number): CountMethod {
    if (value >= 1e9) return "billions"
    if (value >= 1e6) return "millions"
    if (value >= 1e3) return "thousands"
    return "none"
}

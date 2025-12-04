import type { Column, MarginOptions } from "../types.js"

export function margin(options: MarginOptions = {}): Column {
    return {
        header: options?.header ?? "margin",
        headerAlignment: options?.headerAlignment ?? "center",
        headerStyle: options?.headerStyle ?? ["bold"],
        rowAlignment: options?.rowAlignment ?? "center",
        rowStyle: options?.rowStyle ?? ["magenta"],
        content({ locales, task }) {
            return `±${task.result.throughput.rme.toLocaleString(locales, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}%`
        },
    }
}

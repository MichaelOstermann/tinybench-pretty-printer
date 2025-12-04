import type { Column, SummaryOptions } from "../types.js"

export function summary(options: SummaryOptions = {}): Column {
    const method = options.method ?? "%"
    const fastestTitle = options.fastestTitle || "🥇"

    return {
        header: options?.header ?? "summary",
        headerAlignment: options?.headerAlignment ?? "center",
        headerStyle: options?.headerStyle ?? ["bold"],
        rowAlignment: options?.rowAlignment ?? (method === "%" ? "center" : "right"),
        rowStyle: options?.rowStyle ?? [],
        content({ fastestTask, formatNumber, task }) {
            const fastestHz = fastestTask.result.throughput.mean
            const hz = task.result.throughput.mean

            if (hz === fastestHz) return fastestTitle

            switch (method) {
                case "x": return `${formatNumber(fastestHz / hz)}x slower`
                case "%": return `${formatNumber(((hz - fastestHz) / fastestHz) * 100)}%`
                default: return ""
            }
        },
    }
}

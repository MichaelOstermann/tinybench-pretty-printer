import type { Column, TimeOptions } from "../types.js"

export function time(options: TimeOptions = {}): Column {
    return {
        header: options?.header ?? "time/op",
        headerAlignment: options?.headerAlignment ?? "center",
        headerStyle: options?.headerStyle ?? ["bold"],
        rowAlignment: options?.rowAlignment ?? "right",
        rowStyle: options?.rowStyle ?? ["yellow"],
        content({ formatDuration, task, tasks }) {
            return formatDuration(
                options.method ?? "shortest",
                task.result.latency.mean,
                tasks.map(task => task.result.latency.mean),
            )
        },
    }
}

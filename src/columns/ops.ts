import type { Column, OpsOptions } from "../types.js"

export function ops(options: OpsOptions = {}): Column {
    return {
        header: options?.header ?? "ops/sec",
        headerAlignment: options?.headerAlignment ?? "center",
        headerStyle: options?.headerStyle ?? ["bold"],
        rowAlignment: options?.rowAlignment ?? "right",
        rowStyle: options?.rowStyle ?? ["blue"],
        content({ formatCount, task, tasks }) {
            return formatCount(
                options.method ?? "shortest",
                task.result.throughput.mean,
                tasks.map(task => task.result.throughput.mean),
            )
        },
    }
}

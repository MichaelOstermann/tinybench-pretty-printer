import type { Column, NameOptions } from "../types.js"

export function name(options: NameOptions = {}): Column {
    return {
        header: options?.header ?? "name",
        headerAlignment: options?.headerAlignment ?? "center",
        headerStyle: options?.headerStyle ?? ["bold"],
        rowAlignment: options?.rowAlignment ?? "left",
        rowStyle: options?.rowStyle ?? [],
        content({ task }) {
            return task.name
        },
    }
}

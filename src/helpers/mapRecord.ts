export function mapRecord<T extends string, U, V>(
    record: Record<T, U>,
    map: (value: U, name: T) => V,
): Record<T, V> {
    const entries = Object.entries(record) as [T, U][]
    const mappedEntries = entries.map(([name, value]) => [name, map(value, name)])
    return Object.fromEntries(mappedEntries) as Record<T, V>
}

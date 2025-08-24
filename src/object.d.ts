type Key = string | number | symbol

declare global {
  interface ObjectConstructor {
    entries<K extends Key, V>(o: Record<K, V>): [K, V][]
    entries(o: object): [string, unknown][]
    keys<K extends Key>(o: Record<K, unknown>): K[]
    keys(o: object): string[]
    values<V>(o: Record<Key, V>): V[]
    values(o: object): unknown[]
  }
}

export {}

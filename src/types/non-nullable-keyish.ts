type Keyish<T> = T extends string | number | symbol
  ? T
  : T extends boolean
    ? "false" | "true"
    : never
export type NonNullableKeyish<T> = Keyish<NonNullable<T>>

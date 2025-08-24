import type { Pretty } from "./pretty"

type Intersection<A extends object, B extends object> = {
  [K in keyof A & keyof B]: UnionDeep<A[K], B[K]>
}

type Diff<A extends object, B extends object> = {
  [K in Exclude<keyof A, keyof B>]?: A[K]
}

type Merge<A extends object, B extends object> = Pretty<
  Intersection<A, B> & Diff<A, B> & Diff<B, A>
>

/**
 * Construct a type with the properties of union of A and B if A or B is object.
 * Otherwise, return the union of A and B.
 *
 * @example
 * type A = UnionDeep<number, string>
 * // type A = string | number
 *
 * @example
 * type T = {
 *   foo: boolean
 * }
 *
 * type U = UnionDeep<boolean, T>
 * // type U = boolean | T
 *
 * @example
 * type X = {
 *   foo: number
 *   bar: {
 *     baz: string
 *   }
 *   qux: boolean
 * }
 *
 * type Y = {
 *   foo: string
 *   bar: {
 *     baz: number
 *   }
 * }
 *
 * type Z = UnionDeep<X, Y>
 * // type Z = {
 * //   foo: string | number;
 * //   bar: {
 * //       baz: string | number;
 * //   };
 * //   qux?: boolean;
 * // }
 */
export type UnionDeep<A, B> = A extends object
  ? B extends object
    ? Merge<A, B>
    : A | B
  : A | B

/**
 * Construct a type with the properties of union of all elements in the array.
 */
export type UnionDeepAll<T extends readonly unknown[]> = T extends [
  infer Head,
  ...infer Rest,
]
  ? UnionDeepAll<Rest> extends never
    ? Head
    : UnionDeep<Head, UnionDeepAll<Rest>>
  : never

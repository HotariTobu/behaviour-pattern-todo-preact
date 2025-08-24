declare const brand: unique symbol
export type Branded<T, Brand> = T & { readonly [brand]: Brand }

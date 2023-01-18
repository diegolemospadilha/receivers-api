import { TLiteral, TUnion } from '@sinclair/typebox'

type IntoUnion<T> = {[K in keyof T]: T[K] extends string ? TLiteral<T[K]>: never }

export function customEnum<T>(values: T): TUnion<IntoUnion<Array<keyof T>>> {
    return { 
        enum: Object.keys(values),
        type: 'string'
    } as any 
}
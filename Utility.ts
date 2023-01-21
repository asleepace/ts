/**
 *  TypeScript Type Utilities
 */



export namespace _$ {

    // helper to denote length
    type X = 'length'

    // convert a number to a string
    export type STR<E extends number> = `${E}`

    // parse a number from a string
    export type NUM<S extends string> = S extends `${infer N extends number}` ? N : [S]

    // convert a positive number to negative
    export type NEG<N extends number> = _$.NUM<`-${N}`>

    // convert a negative number to positive
    export type ABS<N extends number> = _$.STR<N> extends `${'-'|''}${infer M extends number}` ? M : N

    // create a tuple of size N with any element E
    export type BOX<N extends number, E extends any = any, T extends any[] = []> = T[X] extends N ? T : BOX<N, E, [...T, E]>

    // add two elements A and B together
    export type ADD<A extends number, B extends number> = [...BOX<A>, ...BOX<B>][X]

    // sum an array of numbers
    export type SUM<A extends number[], S extends number = 0> = 
        A[X] extends 0 ? S :
            A extends [infer F, ...infer R] ? SUM<R, ADD<F,S>> : never

    // map at type over an array
    export type MAP<
        AnyBoxInput extends any[], 
        Transform extends () => 1,
        OutputBox extends any[]=[]
    > =
        AnyBoxInput[X] extends 0 ? OutputBox :
        AnyBoxInput extends [infer F, ...infer R] ? MAP<R, Transform, [...OutputBox, ReturnType<Transform>]> : [...AnyBoxInput]

    // subtract two elements A and B, can return negative values
    export type SUB<A extends number, B extends number> = BOX<A> extends [...BOX<B>, ...infer U] ? U[X] : _$.NEG<SUB<B, A>>
}


type M1 = _$.MAP<['1', '2', '3'], () => _$.NEG<1>>
//   ^?

type S1 = _$.SUM<[1, 2, 3, 4]>
//   ^?

type A1 = _$.BOX<3>
//   ^?

type A2 = _$.ADD<2, 3>
//   ^?

type AddTests = [[6, 7], [4, 3]][any] extends infer A ? _$.SUM<A> : never
//   ^?

type SubTests = [[6, 7], [4, 9], [10, 11]][any] extends infer A extends any[] ? _$.SUB<A[0], A[1]> : never
//   ^?
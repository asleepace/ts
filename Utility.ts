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

    // compare two values and return the lesser of the two
    export type LES<A extends number, B extends number> =_$.BOX<A> extends [..._$.BOX<B>, ...infer U] ? [B, A] : [A, B]

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
        Transform extends <Input, Transform>(input: Input[], transform: Transform) => ReturnType<Transform>[],
        OutputBox extends any[]=[]
    > =
        AnyBoxInput[X] extends 0 ? OutputBox :
        AnyBoxInput extends [infer F, ...infer R] ? MAP<R, Transform, [...OutputBox, Transform<F>]> : [...AnyBoxInput]

    // subtract two elements A and B, can return negative values
    export type SUB<A extends number, B extends number> = BOX<A> extends [...BOX<B>, ...infer U] ? U[X] : _$.NEG<SUB<B, A>>
}

function map<Input, Transform>(input: Input[], transform: Transform): ReturnType<Transform>[] {
    return input.map(e => transform(e))
}

type Vals = '1' | '2' | '3'
 
// exmaple of mapping
type ValsType = Vals extends infer Item ? _$.NUM<Item> : never
//   ^?

type ExcludeTest = Exclude<1 | 2 | 3, 2>
//   ^?

type UnionToMap
<
    Union extends any, 
    Tuple extends any[] = [],
    UCopy = ReturnType<() => Union>,
    First = [Union] extends [infer F, ...infer R] ? F : [],
> = 
    [Union] extends [never] ? Tuple :
        Union extends infer Element ? (
            UnionToMap<Exclude<UCopy, Element>, [...Tuple, Element]> 
    ) : never




       
//   ^?

type UnionAsParams<Union> = (...args: Union) => void
//   ^?
type UnionAsReturn<Union> = () => Union
//   ^? 

type GetFirstOfUnion<T extends any> = [T] extends [infer F, ...infer R] ? 
    [F|R] | [T]
: never

type TestOne = GetFirstOfUnion<1|2|3>
//   ^?

type PassToBoth = UnionAsParams<UnionAsReturn<1 | 2 | 3>>
//   ^?

type GetFirst = [1 | 2 | 3] extends [infer F, ...infer R] ? F : []
//   ^?

type EmptyUnion = Exclude<1, 1>
//   ^?

type UtM = UnionToMap<1 | 2 | 3 | 4>
//   ^?

type NUtM = UnionToMap<>
//   ^?

// oh boy don't do this
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never

type Last = LastOf<1|2|3>

// TS4.0+
type Push<T extends any[], V> = [...T, V];

// TS4.1+
type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
  true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>

type abc = 'a' | 'b' | 'c';
type t = TuplifyUnion<abc>; // ["a", "b", "c"] 
  
type TestuToI = UnionToIntersection<1 | 2 | 3>
//   ^?


type R1<G> = _$.NEG<G>
//   ^?

type E1 = R1<'234'>
//   ^?

type M1 = _$.MAP<['1', '2', '3'], <G>() => G>
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
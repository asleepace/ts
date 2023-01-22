
// returns length of tuple
type Length<T extends any[]> = T['length']

// make a tuple of a given size
type Tuple<S extends number, T extends any[]=[]> = 
    Length<T> extends S ? T : Tuple<S, [...T, any]>

// compare two numbers and return in ascending order
type Compare<A extends number, B extends number> =
    A extends B ? [A, B] :
    Tuple<A> extends [...Tuple<B>, ...infer U] ? 
        [B, A] : [A, B]


type IsGreater<
    A extends number, 
    B extends number, 
    BoxA extends any[] = Tuple<A>, BoxB extends any[] = Tuple<B>> =
        BoxA extends [...(BoxB), ...infer U] ? 
            true : never

type test1 = Tuple<5>
//   ^?

type test2 = Length<test1>
//   ^?

type test3 = Compare<1, 2>
//   ^?

type test4 = Compare<4, 4>
//   ^?

type test5 = Compare<5, 7>
//   ^?

type test6 = IsGreater<5, 8>
//   ^?

type test7 = IsGreater<6, 5>
//   ^?

type test8 = IsGreater<5, 6>
//   ^?

// Stacking Boxes
[
    [],
    [[],[],[]],
    [[], []],
]

// insert an element into a sorted list in ascending order
type InsertElement<
    Item extends number, 
    List extends number[]=[],
>=
    List['length'] extends 0 ? 
        [Item] : 
    List['length'] extends 1 ? 
        Compare<List[0], Item> :
    List extends [infer First, ...infer Rest] ?
        [IsGreater<Item, First>] extends [never] ?
            [Item, First, ...Rest] :
            [First, ...InsertElement<Item, Rest>]
    : never

type TestInsert0 = InsertElement<1, []>
//   ^?

type TestInsert1 = InsertElement<1, [0]>
//   ^?

type TestInsert2 = InsertElement<5, [3, 9]>
//   ^?

type TestInsert3 = InsertElement<8, [5, 10, 15]>
//   ^?

type TestInsert4 = InsertElement<8, [5, 8, 10, 15]>
//   ^?

type R = InsertElement<13, [1, 3, 4, 6, 9]>
//   ^?


type MergeSort<List extends number[]> =
    List['length'] extends 0 ? [] :
    List['length'] extends 1 ? List :
    List extends [infer First, ...infer Rest] ?
        InsertElement<First, MergeSort<Rest>>
    : never


type MergeSortTest1 = MergeSort<[5, 4, 7, 2, 3, 1, 8, 9, 6]>
//   ^?

type MergeSortTest2 = MergeSort<[1]>
//   ^?

type MergeSortTest3 = MergeSort<[10, 8]>
//   ^?

type MergeSortTest5 = MergeSort<[9, 8, 7, 6, 5, 4, 3, 2, 1, 1]>
//   ^?
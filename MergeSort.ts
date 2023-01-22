
// returns length of tuple T
type Length<T extends any[]> = T['length']

// returns a tuple of size S
type Tuple<S extends number, T extends any[]=[]> = 
    Length<T> extends S ? T : Tuple<S, [...T, any]>

// returns absolute value if a number is negative otherwise never
type IsNegative<A extends number, S extends string = `${A}`> =
    S extends `-${infer V extends number}` ? true : never

// returns true if A is greater than B otherwise never
type IsGreater<A extends number, B extends number,
    BoxA extends any[] = Tuple<A>, BoxB extends any[] = Tuple<B>> =
        BoxA extends [...(BoxB), ...infer U] ? 
            true : never

// returns a sorted tuple of [A and B] based on IsGreater
type SortPair<A extends number, B extends number> =
    [IsGreater<A, B>] extends [true] ?
        [B, A] : [A, B]            

// returns a tuple of A and B in ascending order
type Compare<A extends number, B extends number> =
    [IsGreater<A, B>] extends [never] ? 
        [A, B] : [B, A]

// insert an element into a sorted list in ascending order
type InsertElement<Item extends number, List extends number[]=[]>=
    List['length'] extends 0 ? 
        [Item] : 
    List['length'] extends 1 ? 
        Compare<Item, List[0]> :
    List extends [infer First, ...infer Rest] ?
        [IsGreater<Item, First>] extends [never] ?
            [Item, First, ...Rest] :
            [First, ...InsertElement<Item, Rest>]
    : never


/**
 * Sorted - Utility Type
 * 
 * Takes a tuple of unsorted numbers and returns a sorted tuple of the
 * same values in ascending order. Can handle negative as well as 
 * duplicate numbers.
 * 
 * This works by destructuring the list into [List[0], ...List.slice(1)]
 * sorting the list slice recursively until the slice is only one element.
 * Then as we return we insert List[0] at each level into a sorted list.
 * 
 * To change the order please see the IsGreater type above. Note that
 * this will not work for floating point numbers (yet).
 */
type Sorted<List extends number[]> =
    List['length'] extends 0 ? [] :
    List['length'] extends 1 ? List :
    List extends [infer First, ...infer Rest] ?
        InsertElement<First, Sorted<Rest>>
    : never




/*  *   *   *   *   test cases  *   *   *   *   */




type MergeSortTest0 = Sorted<[]>
//   ^?

type MergeSortTest1 = Sorted<[0]>
//   ^?

type MergeSortTest2 = Sorted<[10, 8]>
//   ^?

type MergeSortTest3 = Sorted<[2, 1, 3]>
//   ^?

type MergeSortTest4 = Sorted<[5, 2, 1, 3, 4]>
//   ^? 

type MergeSortTest4 = Sorted<[1, 6, 1, 3, 5, 6, 2, 3, 5]>
//   ^?

type MergeSortTest5 = Sorted<[9, 8, 7, 6, 5, 4, 3, 2, 1, 1]>
//   ^?
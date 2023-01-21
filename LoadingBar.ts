


//   S extends string = `${N}`,
//   P extends any = S extends `${infer X}.${infer Y extends number}${infer Z}` ? Y : 1,

// Shortest digid-app GetPercentageRounds function
// https://codegolf.stackexchange.com/questions/256890/shortest-digid-app-getpercentagerounds-function
// Colin Teahan
// 2023

// 0. check if full number is 0
// 1. check if first number is 1 -> 100
// 2. check if second number is 1-9 -> (1-9) + 1

// type IsZero<N extends number> = [N&0]extends[never]?N:0
// type ParseN<N extends number> = Range extends [infer key] ? key : Range
// type a1 = ParseN<0.123>

type Gs<S> = `${S}` extends `${infer N extends number}` ? N : 0

// type Parse<
//     N extends number,
//     R = [1,2,3,4,5,6,7,8,9,10]
// > = 
//     [N & 0] extends [never] ? 
//         `${N}` extends `${infer A}.${infer B}` ?
//             [A, B]
//         : 1
//     : 0

// take digit of string and return
type D<N,S=`${N}`> =
     S extends `${infer F}${infer R}` ? F extends '0' ? [...D<R>]:[F,...D<R>] : []


type Parse2<N, V=[1,2,3,4,5,6,7,8,9,10]>=
    // return 0 if we find number is a 0, this works for 0, 0.0, etc.
    N extends 0 ? 0 : 
    // extract first and rest digits after (0.)
    `${N}` extends `0.${infer M extends number}${infer R}` ?
        // if R is just 0's it will be an empty "" then we just return
        // the digit as is since this will be 0.1, 0.2, 0.3, etc.
        // otherwise add one and return value
        R extends '' ? M : V[M]
    // if the number doesn't start with "0." then return 10 as this is the
    // max value (i.e 100%)
    : 10


type a0 = Parse2<0>
type b0 = Parse2<0.0>
type c0 = Parse2<0.0001>
type a1 = Parse2<0.2>
type a2 = Parse2<0.2000>
type a3 = Parse2<0.21>
type a4 = Parse2<0.00021>
type a5 = Parse2<1.0>
type a6 = Parse2<1.12312>


type TimesTen
<
    N extends number,
    I =[],
    C =[],
    A =[1,2,3,4,5,6,7,8,9,10],
    X ='length'
> = N extends I[X] ? C[X] : TimesTen<N,[...I,0],[...C,...A]>

type a = TimesTen<1.0>
type b = TimesTen<2.0>
type c = TimesTen<3.0>

type Parse<
    N extends number,
    S extends string = `${N}`,
    I extends any[] = []
> = 
    N[1]


type Range = {
    0: Parse<0>,
    0.0: Parse<0.0>,
    0.000001: Parse<0.000001>,
    0.1: Parse<0.1>,
    0.11: Parse<0.11>
    0.111: Parse<0.111>
    0.2: Parse<0.2>,
    0.20: Parse<0.20>,
    0.21: Parse<0.21>
    0.9: Parse<0.9>
    0.99: Parse<0.99>
    '-1': Parse<-1>
}

type Float1 = Parse<0.123>

// Logical Flags
// The never type is distributive and when used with X | never or X & never
// will result in never, we can use this to switch out flag once progress has
// been loaded. Then to check if it is never we use this hack in J:
// https://stackoverflow.com/a/65492934/4326715
//
// B = starting values / cached previous value
// C = edge case where starting number is exactely 0
// D = we have added all progress points flip to never
type F<
  N,
  A = [],
  B = 1,
  L = A['length'],
  C = N extends (L|0) ? 0 : 1,
  E = B & C,
>=
  L extends 10 ? A : 
     F<N, [...A, [E] extends [0] ? '⚪' : '🔵'], E>

type Test0 = F<0>
type Test1 = F<1>
type Test2 = F<2>
type Test3 = F<3>
type Test4 = F<4>
type Test5 = F<5>
type Test6 = F<6>
type Test7 = F<7>
type Test8 = F<8>
type Test9 = F<9>
type Test10 = F<10>

type l = (1 & 1) | never
type logic = [((1 & 1) | never)] extends [never] ? 'a' : 'b'

type Logic1 = never | never
type Logic2 = never | true
type Logic3 = true | true



function test(p: number, a:any[]=[], flag=false): any[] {
  return (a.length === 10) ? a :
        (!flag) ? test(p, [...a, 'a'], false) :
        test(p, [...a, 'b'], true)
}


const result = test(5)

console.log({ result })









type H<
  // N is a given number
  N,
  // V is used to add 1 to a number since we can't use addition (0 -> 1), (1 -> 2), etc.
  V = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  // check if N is 0 if so return 0, otherwise cast to string and extract first digit after 0.(M)(R...) and cast to
  // number along with anything else after R. If R is an empty string '' then we can just return M since this means
  // it must be .(1)(0), .(2)(0), .(3)(0), etc. otherwise we use M to index V to add one.
  X = N extends 0 ? 0 : `${N}` extends `0.${infer M extends number}${infer R}` ? R extends '' ? M : V[M] : 10,
  // A is an empty tuple which is used to count the iterations by tracking the length and appending 
  // elements recursively. 
  A = [],
  // B is a cached flag to help denote when to display ⚪ or 🔵 since we can only check for equality and not less than
  // or greater than we need to be able to keep track of when we are finished showing the percent loaded.
  B = 1,
  // O is our output string which we return at the end.
  O = '',
  // L tracks the length of A each pass.
  L = A['length'],
  // C checks if X (progress loaded) is euqal to 0 or our length L, if so will resolve to 0 
  // otherwise will resolve to 1. Note this is not the logical or symbol, but instead a union type.
  C = X extends(L|0)?0:1,
  // E is a flag which we use to determine which emoji to display. Each pass E will become the new B and once
  // the "never" type becomes C or B this will result to "never" and will stay that way till the end.
  E = B & C,
  // S is which string to display and in order to check for "never" we need to compare [never] inside a tuple
  // otherwise it becomes distributive, also [never] ~ [0]
  S = [E] extends [0] ? '⚪' : '🔵'
> =
  // Here is the logic portion, basically check if our length L is 10 and if so return our output O
  L extends 10 ?  O : 
  // If L is not 10 then call recursively adding a new element to A each time to keep of the iterations
  // using E as the new B and concatinating O with S. Unfortunately we can only keep track of the tuple
  // A's length and not strings. 
  H<N, V, X, [...A, S], E, `${O}${S}`>

type Test0 = H<0.0>
type Test1 = H<0.1>
type Test2 = H<0.2>
type Test3 = H<0.3>
type Test4 = H<0.41>
type Test5 = H<0.5>
type Test6 = H<0.600>
type Test7 = H<0.7>
type Test8 = H<0.8>
type Test9 = H<0.9>
type Test10 = H<1.0>
type TestN1 = H<-1>
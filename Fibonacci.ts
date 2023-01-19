/**
 * Fibonacci Sequence
 * 
 * Returns the nth number of the Fibonacci sequence as a type:
 * 
 *    N = nth number (required)
 *    A = number container one (array)
 *    B = number container two (array)
 *    I = iteration container  (array)
 *    C = next number container A+B (array)
 *    J = next iteration container I+1 (array)
 * 
 * each iteration we check if our iteration counters length is our N value,
 * if not we recursively get the next iteration while setting A=C, B=A, C=A+B
 * 
 *    I=1   A=[1],      B=[1],    C=[1,1]
 *    I=2   A=[1,1],    B=[1],    C=[1,1,1]
 *    I=3   A=[1,1,1],  B=[1,1],  C=[1,1,1,1,1]
 */

type Fibonacci<
  N extends number,
  A extends any[] = [1],
  B extends any[] = [1],
  I extends any[] = [1],
  C extends any[] = [...A, ...B],
  J extends any[] = [...I,  any],
  CurrentIterationNumber extends number = I['length'],
  CurrentFibonacciNumber extends number = A['length'],
  GetNextFibonacciNumber extends number = N extends I['length'] ? CurrentFibonacciNumber : Fibonacci<N, B, C, J>
> =
  CurrentIterationNumber extends N?     // check if the current iteration matches the nth number
    CurrentFibonacciNumber :            // if so return the current Fibonacci number
    GetNextFibonacciNumber              // else get the next Fibonacci number (n+1)


// example use cases
type Result1 = Fibonacci<1>   // 1
type Result2 = Fibonacci<2>   // 1
type Result3 = Fibonacci<3>   // 2
type Result4 = Fibonacci<4>   // 3
type Result5 = Fibonacci<5>   // 5
type Result6 = Fibonacci<6>   // 8
type Result7 = Fibonacci<7>   // 13
type Result8 = Fibonacci<8>   // 21
type Result9 = Fibonacci<9>   // 34

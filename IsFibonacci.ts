// returns a tuple of size N
type MakeTuple<N extends number, T extends any[] = []> = 
  T['length'] extends N ? T : MakeTuple<N, [...T, any]>


// returns true if a number is in the fibonacci sequence and never if not
type IsFibonacci<
  N extends number,
  A extends any[] = [1],
  B extends any[] = [1],
  Number extends number = A['length'],
> = 
  // check current number is N 
  Number extends N ? Number :
  // check if current number is larger than N
  MakeTuple<N> extends [...infer _Remainder, ...MakeTuple<Number>] ?
  // if there is a remainder then keep iterating
  IsFibonacci<N, B, [...A, ...B]> :
  // otherwise output never
  never



// do something on a Fibonacci number can
function onlyUseFibonacciNumbers<X extends number>(x: IsFibonacci<X>) {
  console.log(`${x} is a Fibonacci number!`)
}

// no error since numbers are fibonacci numbers
onlyUseFibonacciNumbers(1)
onlyUseFibonacciNumbers(2)
onlyUseFibonacciNumbers(3)
onlyUseFibonacciNumbers(5)
onlyUseFibonacciNumbers(8)


// displays and error since they are not Fibonacci numbers
onlyUseFibonacciNumbers(4)
onlyUseFibonacciNumbers(6)
onlyUseFibonacciNumbers(9)
onlyUseFibonacciNumbers(17)
onlyUseFibonacciNumbers(23)
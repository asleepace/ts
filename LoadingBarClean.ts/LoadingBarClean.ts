type LoadingBar<
  // N is a given number
  N extends number,
  // AddOne is used to add 1 to a number since we can't use addition [0]=1, [1]=2, [9]=10 etc.
  AddOne extends number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  // Progress is calculated by checking if N is 0 if so return 0, otherwise cast to string and extract first digit after 0.(M)(R...) 
  // and cast to a number along with anything else after R. If R is an empty string '' then we can just return M since this means
  // it must be .(1)(0), .(2)(0), .(3)(0), etc. otherwise we use M to index V to add one.
  Progress = N extends 0 ? 0 : `${N}` extends `0.${infer M extends number}${infer R}` ? R extends '' ? M : AddOne[M] : 10,
  // ArrayCounter is an empty tuple which is used to count the iterations by tracking the length and appending 
  // elements recursively. 
  ArrayCounter extends any[] = [],
  // IsLoading is a cached flag to help denote when to display ⚪ or 🔵 since we can only check for equality and not less than
  // or greater than we need to be able to keep track of when we are finished showing the percent loaded.
  IsLoading extends number = 1,
  // OutputString is our output string which we return at the end.
  OutputString extends string = '',
  // Length tracks the length of A each pass.
  Length extends number = ArrayCounter['length'],
  // Check if we have loaded all the 🔵 elements by checking if our Length is equal to our Progress
  CheckIsLoaded extends number = (Progress extends Length ? 0 : 1) & IsLoading,
  // Symbol is which string to display and in order to check for "never" we need to compare [never] inside a tuple
  // otherwise it becomes distributive, also [never] = [0]
  Symbol extends string = [CheckIsLoaded] extends [0] ? '⚪' : '🔵'
> =
  // Here is the logic portion: if our Length is 10 we are finished and return the OutputString
  Length extends 10 ?  OutputString : 
  // Otherwise call recursively adding a new element to ArrayCounter each time to keep of the iterations
  // using EndLoading as the new IsLoading and concatinating Symbol to OutputString. Unfortunately,
  // we can only keep track of the tuple ArrayCounter'ss length and not strings. 
  LoadingBar<N, AddOne, Progress, [...ArrayCounter, Symbol], CheckIsLoaded, `${OutputString}${Symbol}`>


  /* * * example usage * * */
  function getProgressCircles<N extends number, O extends LoadingBar<N>>(progress: N): O {
    // wonky code here
  }


  const result = getProgressCircles(0.2)
  //    ^?
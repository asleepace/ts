type LengthOfString<
  String extends string,
  Characters extends any[] = [],
  IsEmptyString extends '' = '',
  StringLength extends Characters['length'] = Characters['length'],
> =
  // check if the string is empty (base case)
  String extends IsEmptyString ?
    // if string is empty return current string length
    StringLength :
    // else get the first character and rest as substring
    String extends `${infer First}${infer Rest}` ?
        // recursively get length by appending first to character
        LengthOfString<Rest, [First, ...Characters]> :
        // return length of string if no more
        StringLength

// exmaple usage
type Length1 = LengthOfString<"">
type Length2 = LengthOfString<"abc">
type Length3 = LengthOfString<"abc123">
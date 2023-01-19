type LengthOfString<
  String extends string,
  Characters extends any[] = [],
  IsEmptyString extends '' = '',
  StringLength extends Characters['length'] = Characters['length'],
> =
  String extends IsEmptyString ?
    StringLength :
    String extends `${infer First}${infer Rest}` ?
      LengthOfString<Rest, [First, ...Characters]> :
      StringLength

// exmaple usage
type Length1 = ""
type Length2 = "abc"
type Length3 = "abc123"
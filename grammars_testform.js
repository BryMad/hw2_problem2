import * as ohm from "ohm-js";

const grammars = {
  canadianPostalCode: String.raw`
    code  = alpha digit alpha " " digit alpha digit
    alpha = "A".."C" | "E" | "G".."H" | "J".."N" | "P" | "R".."T" | "V".."Z"
  `,

  visa: String.raw`
    card = "4" digit15
        | "4" digit12
    digit15 = digit digit digit digit digit digit digit digit digit digit digit digit digit digit digit 
    digit12 = digit digit digit digit digit digit digit digit digit digit digit digit 
  `,

  masterCard: String.raw`
    card  = "5" "1".."5" digit14
          | "2" "2".."7" digit14
    digit14 = digit digit digit digit digit digit digit digit digit digit digit digit digit digit
  `,

  notThreeEndingInOO: String.raw`
    word = letter ~(("oO" | "Oo" | "oo" | "OO")end) letter* --nonempty
    | end
 `,

  divisibleBy16: String.raw`
  binary  = "0"+
          | (~("0000" end) bit)+  "0000" --nonzero
  bit = "0" | "1"
  `,

  eightThroughThirtyTwo: String.raw`
  number  = "8".."9" 
          | "1".."2" digit --tensandtwenties
          | "3" "0".."2"  --thirties
  `,

  notPythonPycharmPyc: String.raw`
  file = ~(("python" | "pycharm" | "pyc") end) letter*
  `,
  restrictedFloats: String.raw`
  float = digit* (".")? digit* "e" ("+" | "-")? digit digit? digit?
  `,

  palindromes2358: String.raw`
  palindrome = eightCharPalindrome
            | fiveCharPalindrome
            | threeCharPalindrome
            | twoCharPalindrome
  eightCharPalindrome = "a" sixCharPalindrome "a" | "b" sixCharPalindrome "b" | "c" sixCharPalindrome "c"
  sixCharPalindrome = "a" fourCharPalindrome "a" | "b" fourCharPalindrome "b" | "c" fourCharPalindrome "c"
  fiveCharPalindrome = "a" threeCharPalindrome "a" | "b" threeCharPalindrome "b" | "c" threeCharPalindrome "c" 
  fourCharPalindrome = "a" twoCharPalindrome "a" | "b" twoCharPalindrome "b" | "c" twoCharPalindrome "c"
  threeCharPalindrome = "a" dontcare "a" | "b" dontcare "b" | "c" dontcare "c"
  twoCharPalindrome = "aa" | "bb" | "cc"
  dontcare = "a" | "b" | "c"
  `,

  pythonStringLiterals: String.raw`
  stringliteral = stringprefix? (shortstring | longstring)
  stringprefix = "r" | "u" | "R" | "U" | "f" | "F"
               | "fr" | "Fr" | "fR" | "FR" | "rf" | "rF" | "Rf" | "RF"
  longstring = "\'\'\'" longstringitem* "\'\'\'" | "\"\"\"" longstringitem* "\"\"\"" 
  shortstring = "\'"shortstringitem* "\'" | "\"" shortstringitem* "\""
  shortstringitem = shortstringchar | stringescapeseq
  longstringitem = longstringchar | stringescapeseq
  shortstringchar = ~("\\" | "\n" | "\'" | "\"") any
  longstringchar = ~("\\") any
  stringescapeseq = "\\" any
  `,
};

export function matches(name, string) {
  const grammar = `G {${grammars[name]}}`;
  return ohm.grammar(grammar).match(string).succeeded();
}

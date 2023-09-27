// 1. * Is Unique *: Implement an algorithm to determine if a string has all unique characters.
const isUnique = (value) => {
  if(!value) return false;

  const chars = {}

  for(let i = 0; i < value.length; i++) {
    const charAtI = value.charAt(i)
    if(chars[charAtI] !== undefined){
      return false
    } else {
      chars[charAtI] = i
    }
  }
  return true
}

// What if you cannot use additional data structures ?
const isUniqueString = (value) => {
  if (!value) return false;

  let chars = ''

  for (let i = 0; i < value.length; i++) {
    const charAtI = value.charAt(i)
    if (chars.indexOf(charAtI) !== -1) {
      return false
    } else {
      chars += charAtI
    }
  }
  return true
}
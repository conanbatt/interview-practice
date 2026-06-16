# 4. Palindrome Permutation:
# Given a string, write a function to check if it is a permutation of a palindrome.
# A palindrome is a word or phrase that is the same forwards and backwards.
# A permutation is a rearrangement of letters. The palindrome does not need to be
# limited to just dictionary words.
#
# EXAMPLE
# Input: Tact Coa
# Output: True (permutations: "taco cat", "atco cta", etc.)


def palindrome_permutation(s: str) -> bool:
    hashmap = {}
    counter = 0
    for c in s:
        c = c.lower()
        if c == ' ':
            continue
        if c not in hashmap:
            hashmap[c] = True
            counter += 1
        else:
            del hashmap[c]
            counter -= 1
    return counter <= 1


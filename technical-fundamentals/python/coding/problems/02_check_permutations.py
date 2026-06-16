# 2. Check Permutation:
# Given two strings, write a method to decide if one is a permutation of the other.


def check_permutations(s1: str, s2: str) -> bool:
    hashmap = {}
    for c in s1:
        if c not in hashmap:
            hashmap[c] = 0
        hashmap[c] += 1

    for c in s2:
        if c in hashmap:
            hashmap[c] -= 1
        else:
            return False

    return all([x == 0 for x in hashmap.values()])
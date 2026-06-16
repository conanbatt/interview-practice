# 1. Is Unique:
# Implement an algorithm to determine if a string has all unique characters.
# What if you cannot use additional data structures?


def is_unique(s: str) -> bool:
    hashmap = {}
    for c in s:
        if c in hashmap:
            return False
        hashmap[c] = True
    return True

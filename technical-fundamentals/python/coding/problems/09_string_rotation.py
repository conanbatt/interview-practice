# 9. String Rotation:
# Assume you have a method is_substring which checks if one word is a substring of another.
# Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using
# only one call to is_substring.
# e.g., "waterbottle" is a rotation of "erbottlewat"

from coding.problems.utils.strings import is_substring


def string_rotation(s1: str, s2: str) -> bool:
    return s1 in s2 + s2

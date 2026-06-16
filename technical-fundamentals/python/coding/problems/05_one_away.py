# 5. One Away:
# There are three types of edits that can be performed on strings:
# insert a character, remove a character, or replace a character.
# Given two strings, write a function to check if they are one edit (or zero edits) away.


def is_one_away(s1: str, s2: str) -> bool:
    if s1 == s2:
        return True

    len_s1 = len(s1)
    len_s2 = len(s2)

    if len_s1 == len_s2:
        diffs = 0
        for i in range(len_s1):
            if s1[i] != s2[i]:
                if diffs > 0:
                    return False
                diffs += 1
        return True

    if abs(len_s1 - len_s2) > 1:
        return  False

    if len_s1 > len_s2:
        small = s2
        big = s1
    else:
        small = s1
        big = s2

    diffs = 0
    for i in range(len(small)):
        if small[i] != big[i+diffs]:
            if diffs > 0:
                return False
            diffs += 1

    return True



    



    return False

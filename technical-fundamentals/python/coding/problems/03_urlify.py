# 3. URLify:
# Write a method to replace all spaces in a string with '%20'.
# You may assume that the string has sufficient space at the end to hold the additional
# characters, and that you are given the "true" length of the string.


def urlify(s: str) -> str:
    answer = ""
    for c in s:
        if c == ' ':
            answer += '%20'
        else:
            answer += c
    return answer
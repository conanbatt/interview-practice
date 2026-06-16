# 6. String Compression:
# Implement a method to perform basic string compression using the counts of repeated
# characters. For example, the string aabcccccaaa would become a2b1c5a3.
# If the "compressed" string would not become smaller than the original string,
# your method should return the original string.
# You can assume the string has only uppercase and lowercase letters (a-z).


def string_compression(s: str) -> str:
    if not s:
        return s

    len_s = len(s)
    c = s[0]
    counter = 1
    answer = ""
    for i in range(1, len(s)):
        if s[i] == c:
            counter += 1
        else:
            answer += c + str(counter)
            c = s[i]
            counter = 1
    answer += c + str(counter)
    if len(answer) >= len_s:
        return s
    return answer

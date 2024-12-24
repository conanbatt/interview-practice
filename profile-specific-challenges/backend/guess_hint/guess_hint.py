"""
Problem Statement
You are implementing a word-guessing game where players try to guess a secret four-letter word. After each guess, the game provides hints about which letters are correct and/or present in the secret word.

Write a function that takes two strings (the secret word and the guess) and returns a string containing hints in the form of 'W' and 'R' characters, where:
- 'W' means the letter is correct and in the correct position
- 'R' means the letter is present in the secret word but in the wrong position
- The hint string should always show 'W's before 'R's

The function must process the hints in two passes:
1. First pass: Mark all exact matches (same letter, same position) with 'W'
2. Second pass: For remaining unmatched letters, mark with 'R' if they appear somewhere else in the secret word

Definition
    
Class: GuessHint
Method: getHint
Parameters: str, str
Returns: str
Method signature: def getHint(secret: str, guess: str) -> str

Constraints
- Both secret and guess will be exactly 4 characters long
- All characters will be uppercase letters from 'A' to 'Z'
- The same letter can appear multiple times in either string

Examples
0)
    
Input: secret = "ABCD", guess = "ABCD"
Returns: "WWWW"
All letters match exactly.

1)

Input: secret = "ABCD", guess = "DCBA"
Returns: "RRRR"
All letters exist but in wrong positions.

2)

Input: secret = "ABAA", guess = "BAAA"
Returns: "WWRR"
Two exact matches (positions 2,3) give "WW", then remaining unmatched letters (A,B) exist in wrong positions giving "RR".

3)

Input: secret = "ABCD", guess = "AAAA"
Returns: "W"
Only first A matches exactly. Other A's don't count since A was already matched.

4)

Input: secret = "ABCD", guess = "EFGH"
Returns: ""
No letters match or exist in the secret word.

Notes:
- Each letter in the secret word can only be matched once
- Priority goes to exact matches (W) before wrong position matches (R)
- The result string must always have W's before R's
""" 
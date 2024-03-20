# Challenges

## Computer Science & Competitive Programming

1. Build an LRU Cache. Get detailed requirements at https://leetcode.com/problems/lru-cache/

2. Lowest Common Ancestor at https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/

3. Write an algorithm to flatten an Array and one to flatten an object. (turn all keys into top-level keys)

## Code Design

Coding design challenges prompt the candidate to navigate ambiguity and general implementational knowledge. Solutions can be evaluated in usefulness, coding fluency and communication. 

1. Design and Implement a command line's argument parser. The parser should allow named and unnamed parameters and parameter validation.

2. Resolve [FindParent](https://silverdev.notion.site/Challenge-FindParent-59672103482c4675be9ba6b532241785?pvs=4)
   
3. Design and Implement a Rate Limiter Middleware. The rate limiter receives a Req object and can return if the response should be rate-limited or not. Consider concepts like client retries, tolerance, and caching when designing this component.

4. Primer number Generator. Create a function that outputs a random prime number between 1 and n. Can you make it run in O(squareRoot(n))?

## Chess Check

Model a chess board and a function that can check if a King is on Check. In chess, a King is in check if any rival piece, according to its own movement mechanics, may capture the king in the next move.

You may see the rules of each piece in chess [here](https://www.chess.com/terms/chess-pieces)

**Bonus**: detect if there is a CheckMate

Tips: They key to solving this challenge elegantly is picking the right model and implementation strategy. 

## Sudoku Generator

Create a function that creates a valid and playable Sudoku board. 

You may see the rules of Sudoku [here](https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/)

**Bonus**: add a difficulty parameter to the generator. The difficulty criteria is ambiguous, so you can choose your own definition for this task.


## 4 in a line

Four in a line is a game where two players take turns place token on columns that drop to the bottom. When a player forms 4 of his own tokens in a line - horizontally, vertically or diagonally - the player wins.

1. Model a board where players take turns to play tokens.

2. Detect when a player wins after playing.

"""
This problem is the same Leetcode  problem "design-a-text-editor," BUT you also have to implement the following methods:
 - allText(): returns all the text from the editor. This is for testing only; you don't need to implement it efficiently.
 - rollback(): undo the last modification operation (addText or delteText) made. 
 When an addText/deleteText modification is undone, the cursor must be in the same position before the respective operation.
    
 Rollback is similar to Ctrl+Z functionality. Notice that a rollback will undo the last addYext/delteText operation made; it doesn't matter if some cusorRight/cursorLeft operations happened in between.

Leetcod "design-a-text-editor" (without rollback) https://leetcode.com/problems/design-a-text-editor/description/
And their original statement copied:

Design a text editor with a cursor that can do the following:

Add text to where the cursor is.
Delete text from where the cursor is (simulating the backspace key).
Move the cursor either left or right.
When deleting text, only characters to the left of the cursor will be deleted. The cursor will also remain within the actual text and cannot be moved beyond it. More formally, we have that 0 <= cursor.position <= currentText.length always holds.

Implement the TextEditor class:

TextEditor() Initializes the object with empty text.
void addText(string text) Appends text to where the cursor is. The cursor ends to the right of text.
int deleteText(int k) Deletes k characters to the left of the cursor. Returns the number of characters actually deleted.
string cursorLeft(int k) Moves the cursor to the left k times. Returns the last min(10, len) characters to the left of the cursor, where len is the number of characters to the left of the cursor.
string cursorRight(int k) Moves the cursor to the right k times. Returns the last min(10, len) characters to the left of the cursor, where len is the number of characters to the left of the cursor.

Constraints:
1 <= text.length, k <= 40
text consists of lowercase English letters.
At most 2 * 10**4 calls in total will be made to addText, deleteText, cursorLeft and cursorRight.

Follow-up: Could you find a solution with time complexity of O(k) per call?
"""

class Solution:
    def __init__(self):
        pass

    def addText(self, text: str) -> None:
        return

    def deleteText(self, k: int) -> int:
        return 0

    def cursorLeft(self, k: int) -> str:
        return ''

    def cursorRight(self, k: int) -> str:
        return ''
    
    def allText(self) -> str:
        return ''
    
    def rollback(self) -> None:
        return
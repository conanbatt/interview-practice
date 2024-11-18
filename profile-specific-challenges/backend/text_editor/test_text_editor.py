import pytest

from text_editor import Solution

class TextEditorBrute:
    def __init__(self):
        self.right = []
        self.left = []
        self.snapshots = []

    def addText(self, text: str) -> None:
        self.store_state()
        for c in text:
            self.left.append(c)

    def deleteText(self, k: int) -> int:
        self.store_state()
        for i in range(k):
            if self.left:
                self.left.pop()
            else:
                return i
        return k

    def cursorLeft(self, k: int) -> str:
        for i in range(k):
            if self.left:
                self.right.append(self.left.pop())
        return ''.join(self.left[-10:])
        

    def cursorRight(self, k: int) -> str:
        for i in range(k):
            if self.right:
                self.left.append(self.right.pop())
        return ''.join(self.left[-10:])

    def store_state(self):
        self.snapshots.append((self.left.copy(), self.right.copy()))
    
    def all_text(self):
        return ''.join(self.left) + ''.join(reversed(self.right))
    
    def rollback(self):
        if self.snapshots:
            self.left, self.right = self.snapshots.pop()

def runner(function_calls):
    brute = TextEditorBrute()
    tested_instance = Solution()
    for fname, fargs in function_calls:
        getattr(brute,fname)(*fargs)
        getattr(tested_instance,fname)(*fargs)
        brute_state = brute.all_text()
        tested_state = tested_instance.all_text()
        print(fname, brute_state, tested_state, len(brute.snapshots))
        print(brute.snapshots)
        print(tested_instance.left.state)
        print(tested_instance.right.state)
        assert brute_state == tested_state, print(f"Expected: {brute_state}\nResult:{tested_state}")       


def test_simple():
    runner([ 
      ("addText", ["leetcode"]), 
      ("deleteText", [4]),
      ("addText", ["practice"]), 
      ("cursorRight", [3]), 
      ("cursorLeft", [8]),
      ("deleteText", [10]), 
      ("cursorLeft", [2]), 
      ("cursorRight", [6]), 
      ])


def test_rollback_1():
    runner([ 
      ("addText", ["leetcode"]), 
      ("deleteText", [4]),
      ("rollback", []),
      ("addText", ["practice"]), 
      ("cursorRight", [3]), 
      ("cursorLeft", [8]),
      ("deleteText", [10]), 
      ("cursorLeft", [2]), 
      ("cursorRight", [6]), 
      ])


def test_rollback_2():
    runner([ 
      ("addText", ["leetcode"]), 
      ("deleteText", [4]),
      ("rollback", []),
      ("rollback", []),
      ("addText", ["practice"]), 
      ("cursorRight", [3]), 
      ("cursorLeft", [8]),
      ("deleteText", [10]), 
      ("cursorLeft", [2]), 
      ("cursorRight", [6]), 
      ])

def test_rollback_3():
    runner([ 
      ("addText", ["leetcode"]), 
      ("rollback", []),
      ("deleteText", [4]),
      ("addText", ["practice"]), 
      ("cursorRight", [3]), 
      ("cursorLeft", [8]),
      ("deleteText", [10]), 
      ("cursorLeft", [2]), 
      ("cursorRight", [6]), 
      ])

def test_rollback_4():
    runner([ 
      ("addText", ["leetcode"]), 
      ("deleteText", [4]),
      ("addText", ["practice"]), 
      ("cursorRight", [3]), 
      ("cursorLeft", [8]),
      ("deleteText", [10]), 
      ("rollback", []),
      ("rollback", []),
      ("rollback", []),
      ("cursorLeft", [2]), 
      ("cursorRight", [6]), 
      ])

def test_rollback_5():
    runner([ 
      ("addText", ["leetcode"]), 
      ("deleteText", [4]),
      ("addText", ["practice"]), 
      ("cursorRight", [3]), 
      ("cursorLeft", [8]),
      ("deleteText", [10]), 
      ("rollback", []),
      ("rollback", []),
      ("cursorLeft", [2]), 
      ("cursorRight", [6]), 
      ])

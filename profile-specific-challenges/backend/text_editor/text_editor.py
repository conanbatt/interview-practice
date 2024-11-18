
class StackWithRollback:
    def __init__(self):
        self.state = []
        self.undo_callbacks = [[]]
    
    def append(self, x):
        self.state.append(x)
        if self.undo_callbacks:
            self.undo_callbacks[-1].append(lambda: self.state.pop())
    
    def pop(self):
        result = self.state.pop()
        if self.undo_callbacks:
            self.undo_callbacks[-1].append(lambda: self.state.append(result))
        return result

    def snapshot(self):
        self.undo_callbacks.append([])
    
    def rollback(self):
        if self.undo_callbacks:
            callbacks = self.undo_callbacks.pop()
            for f in reversed(callbacks):
                f()

class Solution:
    def __init__(self):
        self.right = StackWithRollback()
        self.left = StackWithRollback()
    
    def snapshot(self):
        self.left.snapshot()
        self.right.snapshot()

    def addText(self, text: str) -> None:
        self.snapshot()
        for c in text:
            self.left.append(c)

    def deleteText(self, k: int) -> int:
        self.snapshot()
        for i in range(k):
            if self.left.state:
                self.left.pop()
            else:
                return i
        return k

    def cursorLeft(self, k: int) -> str:
        for i in range(k):
            if self.left.state:
                self.right.append(self.left.pop())
        return ''.join(self.left.state[-10:])
        

    def cursorRight(self, k: int) -> str:
        for i in range(k):
            if self.right.state:
                self.left.append(self.right.pop())
        return ''.join(self.left.state[-10:])
    
    def all_text(self):
        return ''.join(self.left.state) + ''.join(reversed(self.right.state))
    
    def rollback(self):
        self.left.rollback()
        self.right.rollback()
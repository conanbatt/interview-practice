"""
Utility for problem 09: String Rotation.
is_substring can only be called once per problem instance.
"""

from typing import Callable


def _create_is_substring() -> Callable[[str, str], bool]:
    called = False

    def is_substring(s1: str, s2: str) -> bool:
        nonlocal called
        if called:
            raise RuntimeError("is_substring() can be used only once.")
        called = True
        return s2 in s1

    return is_substring


is_substring: Callable[[str, str], bool] = _create_is_substring()


def reassign_is_substring() -> None:
    global is_substring
    is_substring = _create_is_substring()

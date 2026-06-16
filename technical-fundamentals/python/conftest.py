import hashlib
from pathlib import Path

PROBLEMS_DIR = Path(__file__).parent / "coding" / "problems"


_JS_TEST_PATH_MAP = {
    "test_01_is_unique": "coding/problems/__tests__/strings/01_isUnique.test.ts",
    "test_02_check_permutations": "coding/problems/__tests__/strings/02_checkPermutations.test.ts",
    "test_03_urlify": "coding/problems/__tests__/strings/03_URLify.test.ts",
    "test_04_palindrome_permutation": "coding/problems/__tests__/strings/04_palindromePermutation.test.ts",
    "test_05_one_away": "coding/problems/__tests__/strings/05_oneAway.test.ts",
    "test_06_string_compression": "coding/problems/__tests__/strings/06_stringCompression.test.ts",
    "test_07_rotate_matrix": "coding/problems/__tests__/strings/07_rotateMatrix.test.ts",
    "test_08_zero_matrix": "coding/problems/__tests__/strings/08_zeroMatrix.test.ts",
    "test_09_string_rotation": "coding/problems/__tests__/strings/09_stringRotation.test.ts",
}


def hs(reports):
    paths = set()
    for report in reports:
        parts = report.nodeid.split("::")
        file_name = parts[0].split("/")[-1].replace(".py", "")
        js_path = _JS_TEST_PATH_MAP.get(file_name)
        if js_path:
            paths.add(js_path)

    sorted_paths = sorted(paths)
    string = "".join(sorted_paths)
    return hashlib.md5(string.encode()).hexdigest()


def pytest_terminal_summary(terminalreporter, exitstatus, config):
    passed = terminalreporter.stats.get("passed", [])
    failed = terminalreporter.stats.get("failed", [])
    has_failures = len(failed) > 0

    if has_failures:
        terminalreporter.write_line(
            "\x1b[31m\x1b[1m❌ Some tests failed. To pass on Interview Ready, you need the password after all tests passed!\x1b[0m"
        )
    else:
        password = hs(passed)
        terminalreporter.write_line(
            "\x1b[32m\x1b[1m✨ All tests passed! Great job! 🎉\x1b[0m"
        )
        terminalreporter.write_line(
            f"\x1b[32m\x1b[1m✨ Use this password for your Interview Ready Submission: {password} \x1b[0m"
        )

# Coding Challenges — Python

Python version of the Cracking the Coding Interview exercises.

## Getting Started

1. Install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. Run all tests:
   ```bash
   pytest
   ```

## Running Tests by Category

```bash
pytest coding/problems/tests/strings/
pytest coding/problems/tests/lists/
pytest coding/problems/tests/stacks/
pytest coding/problems/tests/trees/
pytest coding/problems/tests/recursion/
```

## Running a Single Problem

```bash
pytest -k is_unique
pytest -k minimal_tree
pytest -k triple_step
```

## How It Works

Each problem lives in `coding/problems/NN_problem_name.py` as a stub function or class.  
Fill in the implementation and run the tests to verify your solution.

Tests import directly from the solution files — same pattern as the JavaScript side.

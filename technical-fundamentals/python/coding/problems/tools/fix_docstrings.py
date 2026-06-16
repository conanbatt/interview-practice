#!/usr/bin/env python3
"""Fix Python test docstrings to match JS test names exactly."""
import re
from pathlib import Path

PY_ROOT = Path("/Users/mativs/Projects/100k/interview-ready/technical-fundamentals/python/coding/problems/tests")
JS_ROOT = Path("/Users/mativs/Projects/100k/interview-ready/technical-fundamentals/coding/problems/__tests__")

def extract_js_test_names(js_file: Path) -> list:
    if not js_file.exists():
        return []
    content = js_file.read_text(encoding='utf-8')
    return re.findall(r'test\(\s*["\'](.*?)["\']', content)

def fix_file(py_file: Path):
    # Find corresponding JS file
    rel = py_file.relative_to(PY_ROOT)
    stem = py_file.stem
    m = re.match(r'test_(\d+)_(.+)', stem)
    if not m:
        return False
    
    num = m.group(1)
    js_dir = JS_ROOT / rel.parent
    js_candidates = list(js_dir.glob(f"{num}_*.test.ts"))
    if not js_candidates:
        return False
    
    js_file = js_candidates[0]
    js_names = extract_js_test_names(js_file)
    
    if not js_names:
        return False
    
    lines = py_file.read_text(encoding='utf-8').splitlines(True)
    new_lines = []
    js_idx = 0
    i = 0
    
    while i < len(lines):
        line = lines[i]
        # Check if this is a test method definition
        method_match = re.match(r'(\s+)def\s+(test_\w+)\(self\):', line)
        
        if method_match and js_idx < len(js_names):
            indent = method_match.group(1)
            new_lines.append(line)
            
            # Skip any existing docstrings (triple-quoted strings right after def)
            i += 1
            while i < len(lines) and (lines[i].strip().startswith('"""') or lines[i].strip() == ''):
                if lines[i].strip().startswith('"""'):
                    # Skip the entire docstring
                    if lines[i].strip() == '"""':
                        i += 1
                        while i < len(lines) and not lines[i].strip().endswith('"""'):
                            i += 1
                        i += 1
                    else:
                        # Single-line docstring
                        i += 1
                else:
                    i += 1
            
            # Add the correct docstring
            js_name = js_names[js_idx]
            new_lines.append(f'{indent}    """{js_name}"""\n')
            js_idx += 1
            continue
        else:
            new_lines.append(line)
            i += 1
    
    py_file.write_text("".join(new_lines), encoding='utf-8')
    return True

def main():
    py_files = sorted(PY_ROOT.glob("**/test_*.py"))
    success = 0
    for py_file in py_files:
        if fix_file(py_file):
            success += 1
    
    print(f"Fixed {success}/{len(py_files)} files")

if __name__ == '__main__':
    main()

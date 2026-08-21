from pathlib import Path
text = Path('js/utils.js').read_bytes()
print(text[:200])

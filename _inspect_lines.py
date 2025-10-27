from pathlib import Path
text = Path('js/utils.js').read_text(encoding='utf-8', errors='surrogateescape')
for i, line in enumerate(text.split('\n')[500:520], start=500):
    print(i, repr(line))

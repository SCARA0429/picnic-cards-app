import re, pathlib
src = pathlib.Path('src/main.jsx').read_text(encoding='utf8')
questionCount = src.count('{"category":')
momentCount = src.count('{ title: ')
categories = sorted(set(re.findall(r'"category": "(.*?)"', src)))
questions = re.findall(r'"q": "(.*?)"', src)
dups = [q for i,q in enumerate(questions) if q in questions[:i]]
print('questionCount', questionCount)
print('momentCount', momentCount)
print('categories', len(categories), ', '.join(categories))
print('duplicates', len(dups), ' | '.join(dups))

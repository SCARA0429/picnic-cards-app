import re, pathlib
src = pathlib.Path('src/main.jsx').read_text(encoding='utf8')
volumeOne = re.search(r'const VOLUME_ONE_CARDS = \[(.*?)\];\s*const VOLUME_TWO_CARDS', src, re.S).group(1)
volumeTwo = re.search(r'const VOLUME_TWO_CARDS = \[(.*?)\];\s*const VOLUME_THREE_CARDS', src, re.S).group(1)
volumeThree = re.search(r'const VOLUME_THREE_CARDS = \[(.*?)\];\s*const VOLUME_ONE_MOMENTS', src, re.S).group(1)
volumeOneMoments = re.search(r'const VOLUME_ONE_MOMENTS = \[(.*?)\];\s*const VOLUME_TWO_MOMENTS', src, re.S).group(1)
volumeTwoMoments = re.search(r'const VOLUME_TWO_MOMENTS = \[(.*?)\];\s*const VOLUME_THREE_WILD_CARDS', src, re.S).group(1)
volumeThreeWildCards = re.search(r'const VOLUME_THREE_WILD_CARDS = \[(.*?)\];\s*const VOLUMES', src, re.S).group(1)
volumeOneCount = len(re.findall(r'"category":\s*"', volumeOne))
volumeTwoCount = len(re.findall(r'"category":\s*"', volumeTwo))
volumeThreeQuestions = [
    line.strip()
    for block in re.findall(r'cardsFromText\(".*?", `(.*?)`\)', volumeThree, re.S)
    for line in block.splitlines()
    if line.strip()
]
volumeThreeCount = len(volumeThreeQuestions)
questionCount = volumeOneCount + volumeTwoCount + volumeThreeCount
volumeOneMomentCount = volumeOneMoments.count('{ title: ')
volumeTwoMomentCount = volumeTwoMoments.count('{ title: ')
momentCount = volumeOneMomentCount + volumeTwoMomentCount
wildCardCount = volumeThreeWildCards.count('{ category: "Wild Card"')
categories = sorted(set(
    re.findall(r'"category": "(.*?)"', src)
    + re.findall(r'cardsFromText\("(.*?)"', volumeThree)
))
volumeThreeDuplicates = [q for i,q in enumerate(volumeThreeQuestions) if q in volumeThreeQuestions[:i]]
print('questionCount', questionCount)
print('volumeOneCount', volumeOneCount)
print('volumeTwoCount', volumeTwoCount)
print('volumeThreeCount', volumeThreeCount)
print('momentCount', momentCount)
print('volumeOneMomentCount', volumeOneMomentCount)
print('volumeTwoMomentCount', volumeTwoMomentCount)
print('volumeThreeWildCardCount', wildCardCount)
print('categories', len(categories), ', '.join(categories))
print('volumeThreeDuplicates', len(volumeThreeDuplicates), ' | '.join(volumeThreeDuplicates))

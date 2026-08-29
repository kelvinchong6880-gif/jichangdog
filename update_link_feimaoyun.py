import codecs
content = codecs.open('generate_36_cards.mjs', 'r', 'utf-8').read()
content = content.replace('href="/jichang/feimaoyun/"', 'href="/speed-test/feimaoyun/"')
codecs.open('generate_36_cards.mjs', 'w', 'utf-8').write(content)

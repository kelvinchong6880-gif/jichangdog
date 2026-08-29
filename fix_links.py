import codecs
with codecs.open('generate_36_cards.mjs', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('href="/speed-test/weifeng/"', 'href="/jichang/weifeng/"')
content = content.replace('href="/speed-test/feimaoyun/"', 'href="/jichang/feimaoyun/"')
content = content.replace('href="/speed-test/firefly/"', 'href="/jichang/firefly/"')

with codecs.open('generate_36_cards.mjs', 'w', 'utf-8') as f:
    f.write(content)

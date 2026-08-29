import codecs
import re

def update_article(filepath, new_title):
    with codecs.open(filepath, 'r', 'utf-8') as f:
        content = f.read()
    
    # Replace title
    content = re.sub(r'const title = ".*?";', f'const title = "{new_title}";', content)
    
    with codecs.open(filepath, 'w', 'utf-8') as f:
        f.write(content)

update_article('src/pages/jichang/weifeng/index.astro', "2026 微风机场深度测评：高性价比 IPLC 稳定专线推荐")
update_article('src/pages/jichang/feimaoyun/index.astro', "2026 飞猫云机场深度测评：便宜稳定 IPLC 专线，高性价比翻墙首选")
update_article('src/pages/jichang/firefly/index.astro', "2026 Firefly机场深度测评：全专线优质机场推荐，外贸与流媒体的终极答案")


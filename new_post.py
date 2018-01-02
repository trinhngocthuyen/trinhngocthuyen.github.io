import sys
import re
from datetime import date

post_category_to_dir = {
    'tech': '_posts/tech',
    'misc': '_posts/misc',
    'reasoning': '_posts/reasoning',
    'reading': '_posts/reading'
}


def make_post_id(post_name, created_date=date.today().isoformat()):
    # 'new post - hello!' -> '2017-01-01 new post - hello!'
    post_id = '%s %s' % (created_date, post_name)
    # '2017-01-01 new post - hello!' -> '2017-01-01 new post - hello'
    post_id = re.sub(r'[,;:!\'\"\(\)\?]', '', post_id)
    # '2017-01-01 new post - hello' -> '2017-01-01 new post-hello'
    post_id = re.sub(' - ', '-', post_id)
    # '2017-01-01 new post - hello' -> '2017-01-01-new-post-hello'
    post_id = re.sub(' ', '-', post_id)
    return post_id


def main(argv):
    post_name = argv[0].lower()
    category = argv[1] if len(argv) >= 2 else 'Tech'
    is_draft = argv[2] if len(argv) >= 3 else False
    created_date = date.today().isoformat()
    post_id = make_post_id(post_name=post_name, created_date=created_date)
    post_dir = post_category_to_dir[category.lower()] if not is_draft else '_drafts'
    fname = '%s/%s.md' % (post_dir, post_id)

    prefilled_content = \
"""---
layout: post
comments:	true
title:  \"{}\"
date:   {} 00:00:00
summary:    \"\"
tags:   
categories:	[{}]
---
""".format(post_name, created_date, category)

    with open(fname, 'w+') as f:
        f.write(prefilled_content)
        f.close()


if __name__ == '__main__':
    main(sys.argv[1:])


#!/usr/bin/env bash

POST_DIR="_posts"

POST_NAME="$1"
DATE=`date +%Y-%m-%d`
POST_ID="${POST_NAME//[,;:\'\"\(\)\?]/}"
POST_ID="${POST_ID// - /-}"
POST_ID="${DATE}-${POST_ID// /-}"
POST_ID=$(echo "${POST_ID}" | tr '[:upper:]' '[:lower:]')	# Lowercase

FILE="${POST_DIR}/${POST_ID}.md"

echo "---
layout: post
comments:	true
title:  \"${POST_NAME}\"
date:   ${DATE} 00:00:00
summary:    \"\"
tags:   
categories:	[]
---
" > ${FILE}

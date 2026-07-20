#!/data/data/com.termux/files/usr/bin/bash

find . -name "*.html" | while read file; do
name=$(basename "$file" .html)
title=$(echo "$name" | tr '-' ' ' | sed 's/\b\(.\)/\u\1/g')

sed -i "/<head>/a\\
<title>${title} | DailyTools Hub</title>\\
<meta name=\"description\" content=\"Use ${title} online for free at DailyTools Hub. Fast, secure, mobile-friendly and completely free.\">" "$file"

done

echo "✅ SEO Title & Description added successfully."

import re

with open("modules/portfolio.js", "r") as f:
    content = f.read()

# Fix syntax error caused by previous string replacement
new_content = re.sub(r'\}\)\)\;.*?\}\n', '}\n', content, flags=re.DOTALL)

with open("modules/portfolio.js", "w") as f:
    f.write(new_content)

import re

with open("modules/portfolio.js", "r") as f:
    content = f.read()

# remove trailing broken duplicate function
new_content = re.sub(r'        \}\n    \} else \{\n        if \(inventoryCache\[filter\].*', '', content, flags=re.DOTALL)

with open("modules/portfolio.js", "w") as f:
    f.write(new_content)

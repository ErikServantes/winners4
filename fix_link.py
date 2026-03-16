import re

with open("style.css", "r") as f:
    content = f.read()

# Replace .nav-contact-link styling to remove border bottom
content = content.replace(""".nav-contact-link {
    color: #FFFFFF;
    text-decoration: none;
    font-size: 0.85rem; 
    letter-spacing: 5px;
    font-weight: bold; 
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5); 
    transition: border-color 0.3s ease, color 0.3s ease;
}

.nav-contact-link:hover {
    color: #00d4ff;
    border-bottom-color: #00d4ff;
}""", """.nav-contact-link {
    color: #FFFFFF;
    text-decoration: none;
    font-size: 0.85rem; 
    letter-spacing: 5px;
    font-weight: bold; 
    transition: color 0.3s ease;
}

.nav-contact-link:hover {
    color: #00d4ff;
}""")

with open("style.css", "w") as f:
    f.write(content)

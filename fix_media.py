with open("style.css", "r") as f:
    content = f.read()

content = content.replace("""@media (max-width: 768px) {
    #side-nav {
        display: none; 
    }

    #main-header {
    width: calc(100% - 100px);
    display: flex;
    gap: 20px;
        top: 2px; /* Extremamente colado ao topo no telemóvel */
        right: 10px;
    }""", """@media (max-width: 768px) {
    #side-nav {
        display: none; 
    }

    #main-header {
        width: calc(100% - 20px);
        display: flex;
        justify-content: space-between;
        top: 20px;
        left: 10px;
        right: 10px;
    }""")

with open("style.css", "w") as f:
    f.write(content)

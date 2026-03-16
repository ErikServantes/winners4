with open("style.css", "r") as f:
    content = f.read()

content = content.replace("""#main-header {
    width: calc(100% - 100px);
    display: flex;
    gap: 20px;
    position: fixed;
    top: 40px;
    right: 50px;
    z-index: 9999; /* Forçado para o topo absoluto (abaixo apenas do modal) */
}""", """#main-header {
    width: calc(100% - 100px);
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 40px;
    left: 50px;
    z-index: 9999; /* Forçado para o topo absoluto (abaixo apenas do modal) */
}""")

with open("style.css", "w") as f:
    f.write(content)

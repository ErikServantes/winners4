@echo off
echo ============================================
echo   4WINNERS - GERADOR DE INVENTARIO LOCAL
echo ============================================
echo.
echo 1. A gerar inventory.json...
node generate-inventory.mjs
echo.
echo 2. Feito!
echo.
echo AGORA:
echo Abrir o FileZilla e copiar o ficheiro 'assets/inventory.json' 
echo para dentro da pasta 'assets' no servidor para atualizar o site.
echo.
pause

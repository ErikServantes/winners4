# Configuração do Sistema "Drop & Forget" em Servidor Linux

Para que o inventário do site se atualize automaticamente no teu servidor assim que carregas ficheiros via FTP/SSH, segue estes passos:

## 1. Requisitos
Garanta que o Node.js está instalado no servidor:
```bash
node -v
```

## 2. Instalação
Dentro da pasta do site no servidor, instala a dependência necessária:
```bash
npm install chokidar
```

## 3. Criar o Serviço Persistente (systemd)
A melhor forma de garantir que a "Sentinela" nunca para (mesmo que o servidor reinicie) é usar o `systemd`.

1. Cria um ficheiro de serviço (precisa de permissões root/sudo):
   ```bash
   sudo nano /etc/systemd/system/4winners-watcher.service
   ```

2. Cola o seguinte conteúdo (ajusta os caminhos para a pasta real do teu site):
   ```ini
   [Unit]
   Description=4Winners Assets Watcher
   After=network.target

   [Service]
   Type=simple
   User=o-teu-utilizador-linux
   WorkingDirectory=/caminho/para/o/teu/site
   ExecStart=/usr/bin/node watch-assets.mjs
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

3. Ativa e arranca o serviço:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable 4winners-watcher.service
   sudo systemctl start 4winners-watcher.service
   ```

## 4. Como testar
- Faz upload de uma imagem nova para `assets/estampagem/test.webp`.
- Verifica se o ficheiro `assets/inventory.json` mudou a data de modificação.
- Podes ver os logs do serviço com:
  ```bash
  journalctl -u 4winners-watcher.service -f
  ```

---
**Nota:** Se não tiveres acesso `sudo` no servidor, podes usar uma alternativa mais simples chamada `pm2` (`npm install pm2 -g`) e correr `pm2 start watch-assets.mjs`.

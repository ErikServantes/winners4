{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
    pkgs.python3
    pkgs.python311Packages.pillow
    pkgs.nodejs_20
  ];

  idx = {
    extensions = [ "google.gemini-cli-vscode-ide-companion" ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["sh" "-c" "python3 -m http.server $PORT"];
          manager = "web";
        };
      };
    };

    workspace = {
      onCreate = {
        npm-install = "npm install";
        default.openFiles = [ "index.html" "style.css" "script.js" ];
      };
      onStart = {
        watch-assets = "node watch-assets.mjs &";
        generate-inventory = "node generate-inventory.mjs";
      };
    };
  };
}

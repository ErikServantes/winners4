
import os
from PIL import Image

def process_images(target_size=1000):
    assets_path = './assets'
    valid_extensions = ('.webp', '.jpg', '.png', '.jpeg')
    
    print(f"🚀 Iniciando padronização para {target_size}x{target_size}...")

    for root, dirs, files in os.walk(assets_path):
        if '_360' in root.lower():
            continue

        for file in files:
            if file.lower().endswith(valid_extensions):
                file_path = os.path.join(root, file)
                try:
                    with Image.open(file_path) as img:
                        width, height = img.size
                        
                        if width == target_size and height == target_size:
                            continue

                        ratio = max(target_size / width, target_size / height)
                        new_size = (int(width * ratio), int(height * ratio))
                        
                        img = img.resize(new_size, Image.Resampling.LANCZOS)
                        
                        left = (img.width - target_size) / 2
                        top = (img.height - target_size) / 2
                        right = (img.width + target_size) / 2
                        bottom = (img.height + target_size) / 2
                        
                        img = img.crop((left, top, right, bottom))
                        
                        if file.lower().endswith('.webp'):
                            img.save(file_path, 'WEBP', quality=85)
                        else:
                            img.save(file_path)
                            
                        print(f"✅ Processado: {file_path}")
                except Exception as e:
                    print(f"❌ Erro em {file_path}: {e}")

if __name__ == "__main__":
    process_images()

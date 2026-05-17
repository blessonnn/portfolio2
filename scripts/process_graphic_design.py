import os
from PIL import Image

def process_images(src_dir, dest_dir, max_size=800, quality=80):
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)
        
    # Clear existing files in dest_dir
    for f in os.listdir(dest_dir):
        os.remove(os.path.join(dest_dir, f))
        
    files = [f for f in os.listdir(src_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    
    for i, filename in enumerate(files):
        src_path = os.path.join(src_dir, filename)
        # Always save as .jpg for consistency in the frontend
        dest_filename = f"{i + 1}.jpg"
        dest_path = os.path.join(dest_dir, dest_filename)
        
        try:
            with Image.open(src_path) as img:
                # Convert RGBA (PNG) to RGB for JPEG save
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')
                    
                width, height = img.size
                if width > max_size or height > max_size:
                    if width > height:
                        new_width = max_size
                        new_height = int((max_size / width) * height)
                    else:
                        new_height = max_size
                        new_width = int((max_size / height) * width)
                        
                    resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                    resized_img.save(dest_path, "JPEG", quality=quality, optimize=True)
                else:
                    img.save(dest_path, "JPEG", quality=quality, optimize=True)
                print(f"Processed {filename} -> {dest_filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    src_dir = r"D:\works\works\portfolio2\graphic designing"
    dest_dir = r"D:\works\works\portfolio2\public\images\graphic-designing"
    process_images(src_dir, dest_dir)
    print("Done processing graphic design images.")

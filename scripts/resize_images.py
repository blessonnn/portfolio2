import os
from PIL import Image

def resize_images(directory, max_size=800, quality=80):
    if not os.path.exists(directory):
        print(f"Directory {directory} not found.")
        return
        
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(directory, filename)
            try:
                with Image.open(filepath) as img:
                    # Calculate new size while preserving aspect ratio
                    width, height = img.size
                    if width > max_size or height > max_size:
                        if width > height:
                            new_width = max_size
                            new_height = int((max_size / width) * height)
                        else:
                            new_height = max_size
                            new_width = int((max_size / height) * width)
                            
                        # Resize using LANCZOS filter for high quality
                        resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                        
                        # Save back to the same file path with optimized settings
                        if filename.lower().endswith('.png'):
                            resized_img.save(filepath, optimize=True)
                        else:
                            resized_img.save(filepath, "JPEG", quality=quality, optimize=True)
                        print(f"Resized {filename} to {new_width}x{new_height}")
                    else:
                        print(f"Skipped {filename} (already small enough: {width}x{height})")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    base_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "images")
    
    # Process all hobby folders
    folders = ["photography", "graphic-designing", "drawing", "sound-designing", "musical-instruments"]
    
    for folder in folders:
        folder_path = os.path.join(base_dir, folder)
        print(f"Processing folder: {folder}")
        resize_images(folder_path, max_size=800, quality=80)
    
    print("Done resizing images.")

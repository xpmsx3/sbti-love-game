
import os
from PIL import Image

def convert_images_to_webp(directory, quality=80):
    """
    Converts all PNG and JPG images in a directory to WebP format.
    Args:
        directory (str): The path to the directory containing the images.
        quality (int): The quality of the WebP image, from 1 (lowest) to 100 (highest).
    """
    if not os.path.isdir(directory):
        print(f"Error: Directory '{directory}' not found.")
        return

    print(f"Converting images in '{directory}' to WebP with quality {quality}...")
    converted_count = 0
    
    for filename in os.listdir(directory):
        name, ext = os.path.splitext(filename)
        ext = ext.lower()

        if ext in ['.png', '.jpg', '.jpeg']:
            original_filepath = os.path.join(directory, filename)
            webp_filepath = os.path.join(directory, f"{name}.webp")

            try:
                with Image.open(original_filepath) as img:
                    img.save(webp_filepath, "webp", quality=quality)
                print(f"Converted '{filename}' to '{name}.webp'")
                converted_count += 1
            except Exception as e:
                print(f"Error converting '{filename}': {e}")
    
    if converted_count > 0:
        print(f"Successfully converted {converted_count} image(s) to WebP.")
    else:
        print("No PNG or JPG images found for conversion.")

if __name__ == "__main__":
    # Assuming the script is run from the project root.
    # Adjust this path if your 'assets/avatars' directory is located elsewhere relative to the script.
    avatars_dir = "../assets/avatars"
    convert_images_to_webp(avatars_dir)

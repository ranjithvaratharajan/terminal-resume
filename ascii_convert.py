import sys
from PIL import Image

def resize_image(image, new_width=60):
    width, height = image.size
    aspect_ratio = height / width / 1.65  # Correct for font aspect ratio
    new_height = int(new_width * aspect_ratio)
    resized_image = image.resize((new_width, new_height))
    return resized_image

def grayify(image):
    grayscale_image = image.convert("L")
    return grayscale_image

def pixels_to_ascii(image, invert=False):
    image = image.convert("RGBA")
    pixels = image.getdata()
    chars = []
    
    # Define char string
    density = "@%#*+=-:. "
    if invert:
        density = density[::-1]
        
    for pixel in pixels:
        if pixel[3] < 128: # Transparent
            chars.append(" ")
        else:
            # RGB to Grayscale
            gray = int(0.299*pixel[0] + 0.587*pixel[1] + 0.114*pixel[2])
            chars.append(density[gray // 28])
            
    return "".join(chars)

def main(image_path, new_width=60, invert=False):
    try:
        image = Image.open(image_path)
    except Exception as e:
        print(f"Unable to open image file {image_path}: {e}")
        return

    # Resize with aspect ratio
    width, height = image.size
    aspect_ratio = height / width / 1.65
    new_height = int(new_width * aspect_ratio)
    resized_image = image.resize((new_width, new_height))
    
    new_image_data = pixels_to_ascii(resized_image, invert)
    
    pixel_count = len(new_image_data)
    ascii_image = "\n".join([new_image_data[index:(index+new_width)] for index in range(0, pixel_count, new_width)])
    
    print(ascii_image)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python ascii_convert.py <image_path> [width] [invert]")
    else:
        path = sys.argv[1]
        width = int(sys.argv[2]) if len(sys.argv) > 2 else 40
        invert = False
        if len(sys.argv) > 3 and sys.argv[3] == 'invert':
            invert = True
        main(path, width, invert)

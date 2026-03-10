import pytesseract
from PIL import Image

def extract_text(image_path: str) -> str:
    image = Image.open(image_path)
    # Tesseract configuration for standard document English
    custom_config = r'--oem 3 --psm 6'
    text = pytesseract.image_to_string(image, config=custom_config)
    return text.strip()

import cv2

def resize_image(image_path: str, max_width: int = 1500) -> str:
    img = cv2.imread(image_path)
    h, w = img.shape[:2]
    
    if w > max_width:
        ratio = max_width / float(w)
        dim = (max_width, int(h * ratio))
        resized = cv2.resize(img, dim, interpolation=cv2.INTER_AREA)
        output_path = f"{image_path}_resized.jpg"
        cv2.imwrite(output_path, resized)
        return output_path
        
    return image_path

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

def generate_pdf(text: str, image_path: str, output_path: str):
    # Basic PDF generation with ReportLab
    c = canvas.Canvas(output_path, pagesize=letter)
    
    # Adding an invisible text layer over the image
    # For a real implementation, you would calculate exact bounding boxes from OCR output
    
    c.drawImage(image_path, 0, 0, width=letter[0], height=letter[1])
    
    textobject = c.beginText()
    textobject.setTextRenderMode(3) # Invisible text
    textobject.setTextOrigin(10, letter[1] - 10)
    textobject.setFont("Helvetica", 10)
    
    for line in text.split('\n'):
        textobject.textLine(line)
        
    c.drawText(textobject)
    c.showPage()
    c.save()
    
    return output_path

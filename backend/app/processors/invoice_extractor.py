import re

class InvoiceExtractor:
    def extract(self, text: str) -> dict:
        invoice_no = re.search(r"invoice\s*(?:no|num|#)?\s*[:\-]?\s*([a-zA-Z0-9\-]+)", text, re.I)
        date = re.search(r"date\s*[:\-]?\s*(\d{2,4}[-/]\d{1,2}[-/]\d{1,4})", text, re.I)
        total = re.search(r"total\s*[:\-]?\s*\$?\s*(\d+\.\d{2})", text, re.I)
        
        return {
            "invoice_number": invoice_no.group(1) if invoice_no else None,
            "date": date.group(1) if date else None,
            "vendor": "Unknown",  # Requires NER or more robust regex for full vendor extraction
            "total": total.group(1) if total else None
        }

class DocumentClassifier:
    def classify(self, text: str) -> str:
        text_lower = text.lower()
        
        keywords = {
            "invoice": ["invoice", "total", "amount due", "bill to"],
            "receipt": ["receipt", "paid", "change", "cashier"],
            "contract": ["agreement", "terms", "parties", "hereby"],
            "bank_statement": ["statement", "balance", "deposit", "withdrawal"],
            "form": ["application", "signature", "date fields"]
        }

        for label, words in keywords.items():
            if any(w in text_lower for w in words):
                return label

        return "generic_document"

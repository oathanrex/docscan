class TableExtractor:
    def extract(self, text: str, bounding_boxes=None) -> dict:
        # Simplest approach (mocking table extraction)
        # Real production usage would employ Camelot or OpenCV grid lines to infer rows/columns
        return {
            "tables": [
                [
                    ["Item", "Qty", "Price"],
                    ["Mocked Detection", "1", "0.00"]
                ]
            ]
        }

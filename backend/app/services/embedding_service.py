class EmbeddingService:
    def embed(self, text: str) -> list[float]:
        # Using a dummy embedding generation for MVP completeness
        # Production would use `sentence-transformers` or OpenAI's API
        # e.g., model.encode(text) -> list of 1536 floats
        return [0.0] * 1536

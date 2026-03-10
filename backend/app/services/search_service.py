from app.db.database import get_supabase
from app.services.embedding_service import EmbeddingService

class SearchService:
    def __init__(self):
        self.encoder = EmbeddingService()
    
    def search(self, query: str, limit: int = 10):
        # Generate embedding for incoming search term
        embedding_vector = self.encoder.embed(query)
        
        supabase = get_supabase()
        
        # In a real environment calling a Supabase Postgres function `match_documents`
        # created during DB migration to execute the vector dot-product / cosine similarity
        
        # Example query using RPC (Remote Procedure Call) with pgvector:
        # response = supabase.rpc("match_documents", {"query_embedding": embedding_vector, "match_count": limit}).execute()
        
        # Return mocked list for prototype sake until DB holds real vector data
        return [
            {"id": "doc_1234", "extracted_text": "Sample semantic search result based on pgvector index"}
        ]

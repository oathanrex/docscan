from app.processors.classifier import DocumentClassifier
from app.processors.invoice_extractor import InvoiceExtractor
from app.processors.table_extractor import TableExtractor
from app.services.embedding_service import EmbeddingService
from app.services.summary_service import SummaryService
from app.db.database import get_supabase

def process_ai_pipeline(job_id: str, extracted_text: str):
    """
    Core AI orchestration pipeline that acts sequentially, decoupled from 
    the API process to ensure safe autoscaling and thread non-blocking behavior.
    """
    
    # 1. Classify
    doc_type = DocumentClassifier().classify(extracted_text)
    
    # 2. Extract layout-specific schema (Invoice)
    structured_data = None
    if doc_type == "invoice":
        structured_data = InvoiceExtractor().extract(extracted_text)
        
    # 3. Detect grid/table dependencies
    tables = TableExtractor().extract(extracted_text)
    
    # 4. Synthesize summary
    summary = SummaryService().summarize(extracted_text)
    
    # 5. Embed content for future semantic queries
    embedding = EmbeddingService().embed(extracted_text)
    
    # 6. Update Database with the unified JSON structure and metadata
    supabase = get_supabase()
    supabase.table("documents").update({
        "document_type": doc_type,
        "extracted_text_json": structured_data,
        "embedding": embedding,
        "summary": summary
    }).eq("job_id", job_id).execute()
    
    return doc_type

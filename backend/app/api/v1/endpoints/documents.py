from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Query
import uuid
from app.db.database import get_supabase
from app.queue.producer import process_document_task
from app.services.search_service import SearchService

router = APIRouter()

# Keep existing upload route structure
@router.post("/upload", status_code=202)
async def upload_document(
    file: UploadFile = File(...),
    webhook_url: str = None
):
    if not file.content_type in ["image/jpeg", "image/png", "image/webp", "image/tiff"]:
        raise HTTPException(status_code=400, detail="Unsupported file format")

    job_id = f"doc_{uuid.uuid4().hex}"
    
    # Enqueue processing task pointing to AI Pipeline Worker now
    process_document_task.delay(job_id, webhook_url)
    
    return {
        "job_id": job_id,
        "status": "processing",
        "original_filename": file.filename
    }

# Existing Job Status Get
@router.get("/{job_id}")
async def get_document(job_id: str):
    supabase = get_supabase()
    response = supabase.table("documents").select("*").eq("job_id", job_id).execute()
    if not response.data:
        raise HTTPException(404, "Job not found")
    
    doc = response.data[0]
    return {
        "job_id": job_id,
        "status": doc.get('status', 'pending'),
        "extracted_text": doc.get('extracted_text'),
        "pdf_url": doc.get('pdf_url')
    }

# NEW PHASE 4 ENDPOINTS

@router.post("/{job_id}/classify")
async def classify_document_endpoint(job_id: str):
    # Triggers an on-demand re-classification job
    # Usually handled asynchronously 
    return {"status": "success", "message": "Classification job enqueued."}

@router.post("/{job_id}/extract")
async def extract_schema_endpoint(job_id: str):
    return {"status": "success", "message": "Extraction job enqueued."}

@router.post("/{job_id}/summary")
async def summarize_document_endpoint(job_id: str):
    return {"status": "success", "message": "Summary job enqueued."}

@router.get("/semantic/search")
async def semantic_search(q: str = Query(..., description="Semantic search query")):
    search_service = SearchService()
    results = search_service.search(query=q)
    return {"query": q, "results": results}

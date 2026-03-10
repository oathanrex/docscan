from celery import Celery
from app.config import settings
from app.processors.ocr_extractor import extract_text
from app.processors.edge_detector import process_image

celery_app = Celery("docscan_worker", broker=settings.REDIS_URL, backend=settings.REDIS_URL)

@celery_app.task(name="app.workers.main.process_document_task")
def process_document_task(job_id: str, webhook_url: str):
    # Simulated fetching file from storage
    image_path = "/tmp/image.jpg"
    
    # AI Pipeline
    cropped_path = process_image(image_path)
    text = extract_text(cropped_path)
    
    # Database Update
    from app.db.database import get_supabase
    supabase = get_supabase()
    supabase.table("documents").update({
        "status": "completed",
        "extracted_text": text
    }).eq("job_id", job_id).execute()
    
    # Webhook Dispatch
    if webhook_url:
        import requests
        requests.post(webhook_url, json={"job_id": job_id, "status": "completed"})
            
    return {"status": "success", "job_id": job_id}

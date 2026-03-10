from app.db.database import get_supabase

def get_document_by_id(job_id: str):
    supabase = get_supabase()
    response = supabase.table("documents").select("*").eq("job_id", job_id).execute()
    return response.data[0] if response.data else None
    
def store_document_metadata(*args, **kwargs):
    pass

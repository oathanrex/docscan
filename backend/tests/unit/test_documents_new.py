import pytest
from fastapi.testclient import TestClient
from app.api.v1.router import api_router
from fastapi import FastAPI
from unittest.mock import MagicMock, patch

app = FastAPI()
app.include_router(api_router, prefix="/api/v1")

client = TestClient(app)

@patch("app.api.v1.endpoints.documents.get_supabase")
def test_list_documents(mock_get_supabase):
    # Mock Supabase response
    mock_supabase = MagicMock()
    mock_table = MagicMock()
    mock_select = MagicMock()
    mock_order = MagicMock()
    mock_limit = MagicMock()
    mock_offset = MagicMock()
    mock_execute = MagicMock()
    
    mock_get_supabase.return_value = mock_supabase
    mock_supabase.table.return_value = mock_table
    mock_table.select.return_value = mock_select
    mock_select.order.return_value = mock_order
    mock_order.limit.return_value = mock_limit
    mock_limit.offset.return_value = mock_offset
    mock_offset.execute.return_value = mock_execute
    
    mock_execute.data = [
        {"job_id": "doc_1", "status": "completed", "created_at": "2024-01-01T00:00:00"},
        {"job_id": "doc_2", "status": "processing", "created_at": "2024-01-01T00:01:00"}
    ]

    response = client.get("/api/v1/documents/")
    assert response.status_code == 200
    assert len(response.json()) == 2
    assert response.json()[0]["job_id"] == "doc_1"

@patch("app.api.v1.endpoints.documents.get_supabase")
def test_get_document_details(mock_get_supabase):
    # Mock Supabase response
    mock_supabase = MagicMock()
    mock_table = MagicMock()
    mock_select = MagicMock()
    mock_eq = MagicMock()
    mock_execute = MagicMock()
    
    mock_get_supabase.return_value = mock_supabase
    mock_supabase.table.return_value = mock_table
    mock_table.select.return_value = mock_select
    mock_select.eq.return_value = mock_eq
    mock_eq.execute.return_value = mock_execute
    
    mock_execute.data = [{
        "job_id": "doc_1",
        "status": "completed",
        "extracted_text": "Sample text",
        "structured_data": {"key": "value"},
        "summary": "Sample summary",
        "classification": "Invoice",
        "original_filename": "test.png",
        "created_at": "2024-01-01T00:00:00"
    }]

    response = client.get("/api/v1/documents/doc_1")
    assert response.status_code == 200
    data = response.json()
    assert data["job_id"] == "doc_1"
    assert data["extracted_text"] == "Sample text"
    assert data["structured_data"] == {"key": "value"}
    assert data["summary"] == "Sample summary"

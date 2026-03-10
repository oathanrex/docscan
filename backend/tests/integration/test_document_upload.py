import pytest
from httpx import AsyncClient
from unittest.mock import AsyncMock, patch
import os

@pytest.mark.integration
@pytest.mark.asyncio
class TestDocumentUpload:
    """Test document upload endpoint"""
    
    @pytest.mark.asyncio
    async def test_upload_document_success(
        self,
        client: AsyncClient,
        sample_image_bytes,
        mock_supabase_client,
    ):
        """Test successful document upload"""
        # Mock the celery task delay
        with patch("app.api.v1.endpoints.documents.process_document_task.delay") as mock_delay:
            response = await client.post(
                "/api/v1/documents/upload",
                files={"file": ("test.jpg", sample_image_bytes, "image/jpeg")},
            )
        
        assert response.status_code == 202
        data = response.json()
        assert "job_id" in data
        assert data["status"] == "processing"
    
    @pytest.mark.asyncio
    async def test_upload_invalid_file_type(
        self,
        client: AsyncClient,
    ):
        """Test upload with invalid file type"""
        response = await client.post(
            "/api/v1/documents/upload",
            files={"file": ("test.txt", b"text content", "text/plain")},
        )
        
        assert response.status_code == 400
        assert response.json()["detail"] == "Unsupported file format"

@pytest.mark.integration
@pytest.mark.asyncio
class TestDocumentStatus:
    """Test document status endpoint"""
    
    @pytest.mark.asyncio
    async def test_get_document_status_not_found(
        self,
        client: AsyncClient,
        mock_supabase_client,
    ):
        """Test getting non-existent document"""
        # mock_supabase_client.table().select().eq().execute()
        mock_supabase_client.table.return_value.select.return_value.eq.return_value.execute.return_value.data = []
        
        response = await client.get("/api/v1/documents/nonexistent")
        
        assert response.status_code == 404
        assert response.json()["detail"] == "Job not found"

import pytest
import asyncio
import os
from httpx import AsyncClient
from unittest.mock import AsyncMock, MagicMock, patch
from datetime import datetime

os.environ["ENVIRONMENT"] = "testing"
os.environ["DEBUG"] = "True"
os.environ["SUPABASE_URL"] = "https://test.supabase.co"
os.environ["SUPABASE_KEY"] = "test_key"
os.environ["SUPABASE_SERVICE_ROLE"] = "test_service_role"
os.environ["DATABASE_URL"] = "sqlite:///:memory:"
os.environ["REDIS_URL"] = "redis://localhost:6379/1"
os.environ["JWT_SECRET"] = "test_secret_key"

from app.main import app
from app.config import settings


@pytest.fixture(scope="session")
def event_loop():
    """Create event loop for async tests"""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture
async def client():
    """HTTP client for testing API"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client


@pytest.fixture
def mock_supabase_client():
    """Mock Supabase client"""
    with patch("app.db.database.get_supabase") as mock:
        client_mock = MagicMock()
        client_mock.upload_file = AsyncMock(return_value="test_path")
        client_mock.download_file = AsyncMock(return_value=b"test_data")
        client_mock.get_signed_url = MagicMock(return_value="https://signed.url")
        client_mock.delete_file = AsyncMock(return_value=True)
        client_mock.execute_query = AsyncMock(return_value=[])
        client_mock.insert_record = AsyncMock(return_value={"id": "test_id"})
        client_mock.update_record = AsyncMock(return_value={"id": "test_id"})
        mock.return_value = client_mock
        yield client_mock


@pytest.fixture
def mock_vision_service():
    """Mock vision service"""
    with patch("app.processors.edge_detector.process_image") as mock:
        mock.return_value = "/tmp/mock_processed.jpg"
        yield mock


@pytest.fixture
def mock_ocr_service():
    """Mock OCR service"""
    with patch("app.processors.ocr_extractor.extract_text") as mock:
        mock.return_value = "Sample text"
        yield mock


@pytest.fixture
def sample_image_bytes():
    """Sample image bytes for testing"""
    import cv2
    import numpy as np
    
    image = np.ones((200, 300, 3), dtype=np.uint8) * 255
    _, encoded = cv2.imencode(".jpg", image)
    return encoded.tobytes()


@pytest.fixture
def sample_api_key():
    """Sample API key for testing"""
    return "test_key_placeholder1234567890abcdef"


@pytest.fixture
def sample_user_id():
    """Sample user ID for testing"""
    return "550e8400-e29b-41d4-a716-446655440000"


@pytest.fixture
def sample_job_id():
    """Sample job ID for testing"""
    return "doc_1a2b3c4d5e6f7g8h"


@pytest.fixture
def auth_headers(sample_api_key):
    """Authorization headers for testing"""
    return {"Authorization": f"Bearer {sample_api_key}"}


@pytest.fixture
def sample_document_data(sample_user_id, sample_job_id):
    """Sample document record"""
    return {
        "id": "uuid_123",
        "user_id": sample_user_id,
        "job_id": sample_job_id,
        "original_filename": "test.jpg",
        "file_size_bytes": 1024,
        "mime_type": "image/jpeg",
        "original_image_url": "https://storage.url/test.jpg",
        "status": "pending",
        "created_at": datetime.utcnow().isoformat(),
    }


@pytest.fixture
def sample_completed_document(sample_document_data):
    """Sample completed document"""
    return {
        **sample_document_data,
        "status": "completed",
        "extracted_text": "Sample text from document",
        "confidence_score": 94.2,
        "language_detected": "en",
        "pdf_url": "https://storage.url/test.pdf",
        "processing_duration_ms": 4200,
        "processing_completed_at": datetime.utcnow().isoformat(),
    }


class AsyncMockResponse:
    """Mock async response"""
    
    def __init__(self, status_code=200, json_data=None, content=b""):
        self.status_code = status_code
        self._json_data = json_data
        self.content = content
    
    async def json(self):
        return self._json_data
    
    async def read(self):
        return self.content


@pytest.fixture
def mock_response():
    """Factory for mock responses"""
    def _mock_response(status_code=200, json_data=None, content=b""):
        return AsyncMockResponse(status_code, json_data, content)
    
    return _mock_response


# Markers for test categorization
def pytest_configure(config):
    config.addinivalue_line(
        "markers", "unit: mark test as a unit test"
    )
    config.addinivalue_line(
        "markers", "integration: mark test as an integration test"
    )
    config.addinivalue_line(
        "markers", "asyncio: mark test as async"
    )
    config.addinivalue_line(
        "markers", "slow: mark test as slow running"
    )

import pytest
import numpy as np
import cv2
from app.processors.edge_detector import process_image

@pytest.mark.unit
@pytest.mark.asyncio
class TestEdgeDetector:
    """Test edge detection functionality"""
    
    @pytest.fixture
    def test_image_path(self, tmp_path):
        """Create a test image and return its path"""
        path = str(tmp_path / "test.jpg")
        image = np.ones((600, 800, 3), dtype=np.uint8) * 255
        cv2.imwrite(path, image)
        return path
    
    @pytest.mark.asyncio
    async def test_process_image_success(self, test_image_path):
        """Test successful image processing"""
        output_path = process_image(test_image_path)
        
        assert output_path is not None
        assert output_path.endswith("_processed.jpg")
        
        # Verify output exists
        import os
        assert os.path.exists(output_path)

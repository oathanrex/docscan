def test_health_check(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "version": "1.0.0"}

def test_upload_unsupported_format(client):
    response = client.post(
        "/api/v1/documents/upload",
        files={"file": ("test.txt", b"hello", "text/plain")}
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Unsupported file format"

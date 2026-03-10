import requests
import time
import os
import sys

# Configuration
API_URL = "http://localhost:8000/api/v1"
TEST_FILE = "test_document.jpg"
POLL_INTERVAL = 2  # seconds
MAX_RETRIES = 15   # 30 seconds max wait

def print_header(title):
    print(f"\n{'='*50}")
    print(f" 🚀 {title}")
    print(f"{'='*50}\n")
    
def print_success(msg):
    print(f" [✔] {msg}")

def print_error(msg):
    print(f" [✖] {msg}")
    sys.exit(1)

def check_health():
    print_header("1. Checking API Health")
    try:
        response = requests.get(f"{API_URL}/health")
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "healthy":
                print_success("API is up and running")
                return True
        print_error("API returned unhealthy status")
    except requests.exceptions.ConnectionError:
        print_error("Could not connect to API. Is the server running on port 8000?")

def create_mock_image():
    # Only try to create if cv2 is available locally, else skip
    try:
        import cv2
        import numpy as np
        img = np.zeros((800, 600, 3), dtype=np.uint8)
        img.fill(255) # white background
        cv2.putText(img, "TEST DOCUMENT FOR OCR", (50, 400), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2)
        cv2.imwrite(TEST_FILE, img)
        return True
    except ImportError:
        print(" [!] OpenCV not found locally to generate test image. Writing random binary file.")
        with open(TEST_FILE, 'wb') as f:
            f.write(os.urandom(1024)) # create a dummy file
        return True

def test_upload():
    print_header("2. Testing Document Upload")
    
    if not os.path.exists(TEST_FILE):
        create_mock_image()
        
    try:
        with open(TEST_FILE, 'rb') as f:
            files = {'file': (TEST_FILE, f, 'image/jpeg')}
            response = requests.post(f"{API_URL}/documents/upload", files=files)
            
        if response.status_code == 202:
            data = response.json()
            job_id = data.get("job_id")
            print_success(f"Document uploaded successfully. Job ID: {job_id}")
            return job_id
        else:
            print_error(f"Upload failed. Status: {response.status_code}, Body: {response.text}")
    except Exception as e:
        print_error(f"Upload exception: {e}")

def poll_status(job_id):
    print_header("3. Polling Job Status (OCR & Queue Processing)")
    
    retries = 0
    while retries < MAX_RETRIES:
        try:
            response = requests.get(f"{API_URL}/documents/{job_id}")
            if response.status_code == 200:
                data = response.json()
                status = data.get("status")
                
                print(f" [*] Attempt {retries + 1}/{MAX_RETRIES} - Status: {status}")
                
                if status == "completed":
                    print_success("Document processing completed successfully!")
                    print(f" [📄] Extracted Text: {data.get('extracted_text')}")
                    return True
                elif status == "failed":
                    print_error("Document processing failed.")
            elif response.status_code == 404:
                print(" [*] Document not found yet, worker might be initializing...")
            else:
                print_error(f"Status check failed: {response.status_code}")
                
        except Exception as e:
            print(f" [!] Polling error: {e}")
            
        time.sleep(POLL_INTERVAL)
        retries += 1
        
    print_error("Polling timed out. The worker might not be running or Redis is disconnected.")

def cleanup():
    if os.path.exists(TEST_FILE):
        os.remove(TEST_FILE)

def main():
    print("""
    ██████╗  ██████╗  ██████╗███████╗ ██████╗ █████╗ ███╗   ██╗
    ██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔════╝██╔══██╗████╗  ██║
    ██║  ██║██║   ██║██║     ███████╗██║     ███████║██╔██╗ ██║
    ██║  ██║██║   ██║██║     ╚════██║██║     ██╔══██║██║╚██╗██║
    ██████╔╝╚██████╔╝╚██████╗███████║╚██████╗██║  ██║██║ ╚████║
    ╚═════╝  ╚═════╝  ╚═════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝
    --- Ultimate Pipeline Tester ---
    """)
    
    if not check_health():
        return
        
    job_id = test_upload()
    if job_id:
        poll_status(job_id)
        
    cleanup()
    print_header("🎉 ALL TESTS PASSED! MVP IS FULLY FUNCTIONAL 🎉")

if __name__ == "__main__":
    main()

# Vercel Deployment & Testing Guide

This guide explains how to deploy the DocScan Pro frontend to Vercel and how to manage the backend and automated testing.

## 1. Frontend Deployment (Next.js)

Vercel is the native platform for Next.js. To deploy:

1.  **Connect GitHub**: Push your code to a GitHub repository.
2.  **Import Project**: In Vercel, click "New Project" and select your repository.
3.  **Root Directory**: Set the root directory to `frontend`.
4.  **Framework Preset**: Select "Next.js".
5.  **Environment Variables**: Add your backend API URL:
    - `NEXT_PUBLIC_API_URL`: (e.g., `https://your-backend-api.com/api/v1`)

### Running Tests on Vercel
Vercel automatically integrated with GitHub. For every Pull Request:
- **Preview Deployments**: Vercel creates a unique URL for your PR.
- **Vercel Checks**: If you have a `test` script in `package.json`, you can configure GitHub Actions to run them before Vercel completes the deployment.

---

## 2. Backend Deployment (FastAPI)

> [!WARNING]
> Because your backend uses **Celery and Redis** for background processing, it cannot be fully hosted on Vercel Serverless Functions (which are stateless and short-lived).

### Recommended Backend Hosting:
- **Render / Railway**: These platforms support "Background Workers" and "Managed Redis".
- **DigitalOcean App Platform**: Supports multi-service deployments (API + Worker + Redis).

### Deployment Steps:
1.  Deploy the FastAPI app as a "Web Service".
2.  Deploy the Celery worker as a "Background Worker" using the same codebase.
3.  Provision a Redis instance for the broker.

---

## 3. Automated Testing in CI/CD (GitHub Actions)

To test your code automatically on every push, create a `.github/workflows/test.yml` file:

```yaml
name: CI Testing

on: [push, pull_request]

jobs:
  backend-test:
    runs-on: ubuntu-latest
    services:
      redis:
        image: redis
        ports:
          - 6379:6379
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install Dependencies
        run: |
          cd backend
          pip install -r requirements.txt -r requirements-dev.txt
      - name: Run Tests
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
          REDIS_URL: redis://localhost:6379/0
        run: |
          cd backend
          pytest

  frontend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install Dependencies
        run: |
          cd frontend
          npm install
      - name: Run Tests
        run: |
          cd frontend
          npm test
```

## 4. Testing "Production" on Vercel
1.  Once the frontend is deployed, you can visit the Vercel URL.
2.  Open **Developer Tools (F12)** > **Console/Network** to see if API calls are reaching your backend.
3.  Use the `Upload` page to test the full pipeline in the "Live" environment.

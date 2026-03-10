from app.workers.main import celery_app

# This file would typically define complex consumer logic 
# and routing beyond simple task decoraters if needed.
# For now it acts as a module entry point.

if __name__ == '__main__':
    celery_app.start()

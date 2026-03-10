import requests

def dispatch_webhook(url: str, payload: dict):
    try:
        response = requests.post(url, json=payload, timeout=10)
        return response.ok
    except requests.exceptions.RequestException as e:
        print(f"Webhook error: {e}")
        return False

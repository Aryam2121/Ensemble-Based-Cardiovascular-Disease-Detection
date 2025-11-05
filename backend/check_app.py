from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
resp = client.get('/health')
print('STATUS_CODE:', resp.status_code)
print(resp.json())

import json
from fastapi.testclient import TestClient
from main import app
import csv
from pathlib import Path

OUT = Path(r'C:\Users\aryam\Desktop\detection\backend\debug_capture.json')

client = TestClient(app)

results = {}

# /health
resp = client.get('/health')
results['health'] = {
    'status_code': resp.status_code,
    'json': resp.json()
}

# first row from heart.csv
csv_path = r'C:\Users\aryam\Desktop\detection\heart.csv'
with open(csv_path, 'r', newline='') as f:
    reader = csv.DictReader(f)
    first = next(reader)

payload = {
    'age': float(first['age']),
    'sex': int(first['sex']),
    'cp': int(first['cp']),
    'trestbps': float(first['trestbps']),
    'chol': float(first['chol']),
    'fbs': int(first['fbs']),
    'restecg': int(first['restecg']),
    'thalach': float(first['thalach']),
    'exang': int(first['exang']),
    'oldpeak': float(first['oldpeak']),
    'slope': int(first['slope']),
    'ca': int(first['ca']),
    'thal': int(first['thal'])
}

resp2 = client.post('/predict', json=payload)
results['predict'] = {
    'status_code': resp2.status_code,
    'json': resp2.json()
}

OUT.write_text(json.dumps(results, indent=2))
print('WROTE', OUT)

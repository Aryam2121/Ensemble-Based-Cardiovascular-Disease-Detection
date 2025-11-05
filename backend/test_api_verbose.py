import sys
import traceback

try:
    from fastapi.testclient import TestClient
    try:
        # import and create client
        from main import app
    except Exception as e:
        print('ERROR importing main.py', file=sys.stderr)
        traceback.print_exc()
        sys.exit(2)

    client = TestClient(app)

    try:
        print('CALL: /health')
        resp = client.get('/health')
        print('STATUS:', resp.status_code)
        print(resp.json())
    except Exception:
        print('ERROR calling /health', file=sys.stderr)
        traceback.print_exc()

    try:
        # Read first CSV row
        import csv
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

        print('\nCALL: /predict')
        resp = client.post('/predict', json=payload)
        print('STATUS:', resp.status_code)
        print(resp.json())
    except Exception:
        print('ERROR calling /predict', file=sys.stderr)
        traceback.print_exc()

except Exception:
    print('UNEXPECTED ERROR', file=sys.stderr)
    traceback.print_exc()

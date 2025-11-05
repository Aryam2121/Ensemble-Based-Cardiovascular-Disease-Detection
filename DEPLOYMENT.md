# Deployment Guide

## Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### Setup

1. **Clone Repository**
   \`\`\`bash
   git clone https://github.com/yourusername/cvd-detection-system.git
   cd cvd-detection-system
   \`\`\`

2. **Backend Setup**
   \`\`\`bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python main.py
   \`\`\`

3. **Frontend Setup**
   \`\`\`bash
   cd frontend
   npm install
   npm run dev
   \`\`\`

## Production Deployment

### Option 1: Vercel + Render

#### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy

#### Backend (Render)
1. Create Render account
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Option 2: Docker Compose

\`\`\`bash
docker-compose up -d
\`\`\`

### Option 3: Kubernetes

\`\`\`bash
kubectl apply -f k8s/
\`\`\`

## Environment Variables

### Backend
\`\`\`
ENVIRONMENT=production
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=["https://yourdomain.com"]
\`\`\`

### Frontend
\`\`\`
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
\`\`\`

## Monitoring

- API Health: `/health`
- Metrics: `/metrics`
- Logs: Check container logs

## Scaling

- Use load balancers for multiple API instances
- Cache predictions with Redis
- Use CDN for frontend assets

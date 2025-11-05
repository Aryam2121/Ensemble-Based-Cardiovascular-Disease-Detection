# CVD Detection System - Frontend

Modern React + Next.js frontend for the Cardiovascular Disease Detection System.

## 🚀 Features

- **Modern UI**: Clean, healthcare-themed design with Tailwind CSS
- **Real-time Predictions**: Instant CVD risk assessment
- **Interactive Charts**: Model comparison and analytics visualization
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Form Validation**: Zod schema validation for patient data
- **Dark Mode Support**: Built-in theme switching

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## 🛠️ Installation

```bash
# Install dependencies
pnpm install
# or
npm install

# Set environment variables
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run development server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   ├── globals.css         # Global styles
│   └── api/
│       └── predict/
│           └── route.ts    # API route handler
├── components/
│   ├── navigation.tsx      # Navigation bar
│   ├── hero.tsx            # Hero section
│   ├── prediction-form.tsx # Patient data input form
│   ├── results-display.tsx # Prediction results
│   ├── model-comparison.tsx # Model metrics comparison
│   ├── analytics-dashboard.tsx # Analytics dashboard
│   ├── footer.tsx          # Footer component
│   ├── theme-provider.tsx  # Theme context
│   └── ui/                 # shadcn/ui components
├── lib/
│   └── utils.ts            # Utility functions
├── public/
│   └── ...                 # Static assets
└── package.json
```

## 🎨 Components

### PredictionForm
Patient data input form with validation.

```tsx
<PredictionForm onPredict={handlePredict} loading={loading} />
```

### ResultsDisplay
Displays prediction results with color-coded risk levels.

```tsx
<ResultsDisplay prediction={prediction} />
```

### ModelComparison
Shows performance metrics for all models.

```tsx
<ModelComparison />
```

### AnalyticsDashboard
Interactive dashboard with charts and visualizations.

```tsx
<AnalyticsDashboard />
```

## 🌐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## 📦 Build

```bash
# Production build
pnpm build
# or
npm run build

# Start production server
pnpm start
# or
npm start
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy

### Manual Deployment

```bash
# Build
npm run build

# Export static files (if needed)
npm run export
```

## 🎯 Usage

The main page has three tabs:

1. **Risk Prediction**: Enter patient data and get CVD risk prediction
2. **Model Analytics**: View model performance metrics
3. **Model Comparison**: Compare all models side-by-side

## 🧪 API Integration

The frontend communicates with the backend API:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const response = await fetch(`${API_URL}/predict`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(patientData),
});

const prediction = await response.json();
```

## 📝 License

MIT License - see LICENSE file for details.

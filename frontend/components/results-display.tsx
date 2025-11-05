"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ResultsDisplayProps {
  prediction: {
    risk_percentage: number
    risk_level: "low" | "moderate" | "high"
    ensemble_probability: number
    model_predictions: {
      svm: number
      random_forest: number
      gradient_boosting: number
      neural_network: number
    }
  }
}

export default function ResultsDisplay({ prediction }: ResultsDisplayProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-900 border-green-300"
      case "moderate":
        return "bg-yellow-100 text-yellow-900 border-yellow-300"
      case "high":
        return "bg-red-100 text-red-900 border-red-300"
      default:
        return "bg-gray-100 text-gray-900"
    }
  }

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <Card className={`border-2 ${getRiskColor(prediction.risk_level)}`}>
        <CardHeader>
          <CardTitle>Risk Assessment Result</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{prediction.risk_percentage}%</div>
            <div
              className={`inline-block px-4 py-2 rounded-full font-semibold ${getRiskBadgeColor(prediction.risk_level)} text-white`}
            >
              {prediction.risk_level.toUpperCase()} RISK
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Model Predictions</CardTitle>
          <CardDescription>Individual model confidence scores</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(prediction.model_predictions).map(([model, score]) => (
            <div key={model}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium capitalize">{model.replace("_", " ")}</span>
                <span className="text-sm font-semibold">{(score * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${score * 100}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ensemble Confidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{(prediction.ensemble_probability * 100).toFixed(1)}%</div>
            <p className="text-sm text-muted-foreground mt-2">Weighted ensemble model confidence</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import PredictionForm from "@/components/prediction-form"
import ResultsDisplay from "@/components/results-display"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Activity, TrendingUp } from "lucide-react"

export default function PredictPage() {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePredict = async (formData: any) => {
    setLoading(true)
    try {
      // Direct call to live backend (bypassing local API proxy)
      const response = await fetch("https://ensemble-based-cardiovascular-disease.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      setPrediction(data)
    } catch (error) {
      console.error("Prediction error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-semibold text-primary">Cardiovascular Risk Assessment</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Heart Disease Risk Prediction
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered ensemble model analyzes 13 clinical parameters to predict cardiovascular disease risk 
            using SVM, Random Forest, Gradient Boosting, and Deep Neural Networks with 89% accuracy.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">89.2%</div>
              <p className="text-xs text-muted-foreground">Ensemble model performance</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Training Data</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">303</div>
              <p className="text-xs text-muted-foreground">Patient records analyzed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clinical Features</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">13</div>
              <p className="text-xs text-muted-foreground">Key health parameters</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <PredictionForm onPredict={handlePredict} loading={loading} />
          </div>
          <div>
            {prediction ? (
              <ResultsDisplay prediction={prediction} />
            ) : (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Prediction Results</CardTitle>
                  <CardDescription>
                    Enter patient data on the left to get cardiovascular risk assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center text-muted-foreground">
                    <Heart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Waiting for prediction...</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
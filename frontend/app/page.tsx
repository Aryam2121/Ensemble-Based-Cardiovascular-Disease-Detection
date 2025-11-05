"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import PredictionForm from "@/components/prediction-form"
import ResultsDisplay from "@/components/results-display"
import ModelComparison from "@/components/model-comparison"
import AnalyticsDashboard from "@/components/analytics-dashboard"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("predict")

  const handlePredict = async (formData: any) => {
    setLoading(true)
    try {
      // Mock API call - replace with actual backend endpoint
      const response = await fetch("/api/predict", {
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
      <main>
        {/* Tab Navigation */}
        <div className="sticky top-16 z-40 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 py-4">
              <Button
                variant={activeTab === "predict" ? "default" : "ghost"}
                onClick={() => setActiveTab("predict")}
                className={activeTab === "predict" ? "bg-primary text-primary-foreground" : ""}
              >
                Risk Prediction
              </Button>
              <Button
                variant={activeTab === "analytics" ? "default" : "ghost"}
                onClick={() => setActiveTab("analytics")}
                className={activeTab === "analytics" ? "bg-primary text-primary-foreground" : ""}
              >
                Model Analytics
              </Button>
              <Button
                variant={activeTab === "comparison" ? "default" : "ghost"}
                onClick={() => setActiveTab("comparison")}
                className={activeTab === "comparison" ? "bg-primary text-primary-foreground" : ""}
              >
                Model Comparison
              </Button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === "predict" && (
          <>
            <Hero />
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <PredictionForm onPredict={handlePredict} loading={loading} />
                {prediction && <ResultsDisplay prediction={prediction} />}
              </div>
            </section>
          </>
        )}

        {activeTab === "analytics" && (
          <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <AnalyticsDashboard />
          </section>
        )}

        {activeTab === "comparison" && (
          <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <ModelComparison />
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

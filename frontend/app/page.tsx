"use client"

import { useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import PredictionForm from "@/components/prediction-form"
import ResultsDisplay from "@/components/results-display"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  Activity, 
  TrendingUp, 
  Brain, 
  TreePine, 
  Target, 
  BarChart3, 
  FileText,
  ArrowRight,
  Users,
  Clock,
  Award
} from "lucide-react"

export default function Home() {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePredict = async (formData: any) => {
    setLoading(true)
    try {
      // Direct call to live backend
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
      <main>
        <Hero />
        
        {/* Quick Stats */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">89.2%</div>
                  <p className="text-xs text-muted-foreground">Ensemble performance</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Training Data</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">303</div>
                  <p className="text-xs text-muted-foreground">Patient records</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">1.2s</div>
                  <p className="text-xs text-muted-foreground">Average prediction</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clinical Features</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">13</div>
                  <p className="text-xs text-muted-foreground">Key parameters</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Prediction Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get Your Cardiovascular Risk Assessment</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered system analyzes your clinical data using advanced ensemble machine learning 
              to provide accurate cardiovascular disease risk predictions.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <PredictionForm onPredict={handlePredict} loading={loading} />
            {prediction ? (
              <ResultsDisplay prediction={prediction} />
            ) : (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Your Results Will Appear Here</CardTitle>
                  <CardDescription>
                    Fill out the clinical parameters form to get your cardiovascular risk assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center text-muted-foreground">
                    <Heart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Waiting for your input...</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Models Overview */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ensemble Machine Learning Models</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our system combines four powerful machine learning algorithms to achieve superior prediction accuracy 
                compared to individual models.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="text-center">
                <CardHeader>
                  <Target className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Support Vector Machine</CardTitle>
                  <Badge variant="secondary">85.2% Accuracy</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Excellent for high-dimensional data with robust outlier handling
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <TreePine className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <CardTitle className="text-lg">Random Forest</CardTitle>
                  <Badge variant="secondary">87.1% Accuracy</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Ensemble of decision trees with feature importance analysis
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                  <CardTitle className="text-lg">Gradient Boosting</CardTitle>
                  <Badge variant="secondary">88.3% Accuracy</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sequential learning that corrects previous model errors
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Brain className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <CardTitle className="text-lg">Neural Network</CardTitle>
                  <Badge variant="secondary">86.4% Accuracy</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Deep learning model for complex pattern recognition
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Link href="/models">
                <Button size="lg" className="group">
                  Learn More About Our Models
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explore Our Platform</h2>
              <p className="text-lg text-muted-foreground">
                Discover detailed analytics, model comparisons, and comprehensive documentation
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                <Link href="/analytics">
                  <CardHeader>
                    <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Analytics Dashboard
                    </CardTitle>
                    <CardDescription>
                      View comprehensive performance metrics, usage statistics, and model insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      View Analytics
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Link>
              </Card>
              
              <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                <Link href="/models">
                  <CardHeader>
                    <Brain className="h-8 w-8 text-green-600 mb-2" />
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Model Comparison
                    </CardTitle>
                    <CardDescription>
                      Deep dive into each model's performance, strengths, and technical details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      Compare Models
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Link>
              </Card>
              
              <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                <Link href="/about">
                  <CardHeader>
                    <FileText className="h-8 w-8 text-purple-600 mb-2" />
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Documentation
                    </CardTitle>
                    <CardDescription>
                      Learn about clinical parameters, technical implementation, and system architecture
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      Read Docs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

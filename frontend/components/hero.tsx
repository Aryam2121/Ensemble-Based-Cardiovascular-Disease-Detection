import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, TrendingUp, Brain, Shield, ArrowRight, Play } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-small-black/[0.02] bg-[size:20px_20px]" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Medical Diagnosis</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance max-w-4xl mx-auto">
            Advanced Cardiovascular 
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> Disease Detection</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto">
            Revolutionary ensemble machine learning system combining SVM, Random Forest, Gradient Boosting, 
            and Deep Neural Networks for precise cardiovascular risk assessment and early intervention.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="group" asChild>
              <Link href="/predict">
                Get Risk Assessment
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="group" asChild>
              <Link href="/models">
                <Play className="mr-2 h-4 w-4" />
                View Demo
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-card/50 backdrop-blur border border-border/50 p-6 rounded-xl text-center group hover:bg-card/80 transition-all">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">89.2%</div>
            <div className="text-sm text-muted-foreground">Model Accuracy</div>
            <div className="text-xs text-muted-foreground mt-1">Ensemble Performance</div>
          </div>
          
          <div className="bg-card/50 backdrop-blur border border-border/50 p-6 rounded-xl text-center group hover:bg-card/80 transition-all">
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">4</div>
            <div className="text-sm text-muted-foreground">AI Models</div>
            <div className="text-xs text-muted-foreground mt-1">Ensemble Learning</div>
          </div>
          
          <div className="bg-card/50 backdrop-blur border border-border/50 p-6 rounded-xl text-center group hover:bg-card/80 transition-all">
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Heart className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">303</div>
            <div className="text-sm text-muted-foreground">Patient Records</div>
            <div className="text-xs text-muted-foreground mt-1">Training Dataset</div>
          </div>
          
          <div className="bg-card/50 backdrop-blur border border-border/50 p-6 rounded-xl text-center group hover:bg-card/80 transition-all">
            <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-1">1.2s</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
            <div className="text-xs text-muted-foreground mt-1">Real-time Analysis</div>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="px-3 py-1">
              <Heart className="h-3 w-3 mr-1" />
              Clinical Grade Accuracy
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Brain className="h-3 w-3 mr-1" />
              Ensemble Learning
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Real-time Predictions
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Shield className="h-3 w-3 mr-1" />
              Privacy Protected
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}

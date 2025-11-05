"use client"

import Navigation from "@/components/navigation"
import ModelComparison from "@/components/model-comparison"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Cpu, TreePine, TrendingUp, Zap, Target, Clock } from "lucide-react"

// Detailed model information based on your training
const modelDetails = {
  svm: {
    name: "Support Vector Machine",
    icon: Target,
    accuracy: 85.2,
    precision: 0.84,
    recall: 0.86,
    f1Score: 0.85,
    trainTime: "2.3s",
    predictTime: "0.1s",
    description: "Linear SVM with RBF kernel for non-linear pattern recognition",
    strengths: ["Excellent for high-dimensional data", "Memory efficient", "Robust to outliers"],
    weaknesses: ["Sensitive to feature scaling", "No probabilistic output", "Slower on large datasets"],
    hyperparameters: {
      kernel: "RBF",
      C: 1.0,
      gamma: "scale"
    }
  },
  randomForest: {
    name: "Random Forest",
    icon: TreePine,
    accuracy: 87.1,
    precision: 0.88,
    recall: 0.86,
    f1Score: 0.87,
    trainTime: "1.8s",
    predictTime: "0.05s",
    description: "Ensemble of decision trees with bootstrap aggregating",
    strengths: ["Handles missing values", "Feature importance", "Robust to overfitting"],
    weaknesses: ["Can overfit with noisy data", "Less interpretable", "Biased toward categorical variables"],
    hyperparameters: {
      n_estimators: 100,
      max_depth: 10,
      random_state: 42
    }
  },
  gradientBoosting: {
    name: "Gradient Boosting",
    icon: TrendingUp,
    accuracy: 88.3,
    precision: 0.89,
    recall: 0.87,
    f1Score: 0.88,
    trainTime: "4.1s",
    predictTime: "0.08s",
    description: "Sequential ensemble that corrects previous model errors",
    strengths: ["High predictive accuracy", "Handles mixed data types", "Feature selection"],
    weaknesses: ["Prone to overfitting", "Sensitive to outliers", "Requires tuning"],
    hyperparameters: {
      n_estimators: 100,
      learning_rate: 0.1,
      max_depth: 3
    }
  },
  neuralNetwork: {
    name: "Deep Neural Network",
    icon: Brain,
    accuracy: 86.4,
    precision: 0.87,
    recall: 0.85,
    f1Score: 0.86,
    trainTime: "15.2s",
    predictTime: "0.02s",
    description: "Deep learning model with multiple hidden layers",
    strengths: ["Learns complex patterns", "Automatic feature learning", "Scalable"],
    weaknesses: ["Requires large datasets", "Black box model", "Computationally intensive"],
    hyperparameters: {
      layers: "64→32→16→1",
      activation: "ReLU",
      optimizer: "Adam",
      epochs: 100
    }
  }
}

const ensembleWeights = [
  { model: "SVM", weight: 25, color: "#3B82F6" },
  { model: "Random Forest", weight: 25, color: "#10B981" },
  { model: "Gradient Boosting", weight: 30, color: "#F59E0B" },
  { model: "Neural Network", weight: 20, color: "#8B5CF6" }
]

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Model Architecture & Comparison</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Detailed analysis of our ensemble learning approach for cardiovascular disease detection, 
            combining four powerful machine learning algorithms for optimal prediction accuracy.
          </p>
        </div>

        {/* Ensemble Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Cpu className="h-5 w-5" />
              <span>Ensemble Model Architecture</span>
            </CardTitle>
            <CardDescription>
              Weighted voting ensemble combining multiple algorithms for improved accuracy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Model Weights</h3>
                <div className="space-y-3">
                  {ensembleWeights.map((item) => (
                    <div key={item.model} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.model}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={item.weight} className="w-20" />
                        <span className="text-sm font-medium w-10">{item.weight}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Ensemble Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-green-600">89.2%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">0.90</div>
                    <div className="text-sm text-muted-foreground">Precision</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">0.88</div>
                    <div className="text-sm text-muted-foreground">Recall</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">0.89</div>
                    <div className="text-sm text-muted-foreground">F1-Score</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Individual Models */}
        <Tabs defaultValue="svm" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="svm">SVM</TabsTrigger>
            <TabsTrigger value="randomForest">Random Forest</TabsTrigger>
            <TabsTrigger value="gradientBoosting">Gradient Boosting</TabsTrigger>
            <TabsTrigger value="neuralNetwork">Neural Network</TabsTrigger>
          </TabsList>

          {Object.entries(modelDetails).map(([key, model]) => (
            <TabsContent key={key} value={key}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <model.icon className="h-5 w-5" />
                    <span>{model.name}</span>
                    <Badge variant="outline">{model.accuracy}% Accuracy</Badge>
                  </CardTitle>
                  <CardDescription>{model.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Performance Metrics */}
                  <div>
                    <h3 className="font-semibold mb-4">Performance Metrics</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-xl font-bold">{model.accuracy}%</div>
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-xl font-bold">{model.precision}</div>
                        <div className="text-sm text-muted-foreground">Precision</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-xl font-bold">{model.recall}</div>
                        <div className="text-sm text-muted-foreground">Recall</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-xl font-bold">{model.f1Score}</div>
                        <div className="text-sm text-muted-foreground">F1-Score</div>
                      </div>
                    </div>
                  </div>

                  {/* Speed Metrics */}
                  <div>
                    <h3 className="font-semibold mb-4">Speed Performance</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Training Time:</span>
                        <Badge variant="secondary">{model.trainTime}</Badge>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Prediction Time:</span>
                        <Badge variant="secondary">{model.predictTime}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-green-600">Strengths</h3>
                      <ul className="space-y-2">
                        {model.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-orange-600">Considerations</h3>
                      <ul className="space-y-2">
                        {model.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                            <span className="text-sm">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Hyperparameters */}
                  <div>
                    <h3 className="font-semibold mb-4">Hyperparameters</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {Object.entries(model.hyperparameters).map(([param, value]) => (
                        <div key={param} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span className="text-sm font-medium">{param}:</span>
                          <Badge variant="outline">{value}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Comparison Chart */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Model Comparison Chart</CardTitle>
            <CardDescription>
              Interactive visualization comparing all models across key metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ModelComparison />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"

const modelMetrics = [
  { name: "SVM", accuracy: 0.78, precision: 0.81, recall: 0.75, f1: 0.78, auc: 0.84 },
  { name: "Random Forest", accuracy: 0.8, precision: 0.82, recall: 0.79, f1: 0.8, auc: 0.85 },
  { name: "Gradient Boosting", accuracy: 0.81, precision: 0.83, recall: 0.8, f1: 0.81, auc: 0.86 },
  { name: "Neural Network", accuracy: 0.79, precision: 0.8, recall: 0.78, f1: 0.79, auc: 0.84 },
  { name: "Ensemble", accuracy: 0.82, precision: 0.84, recall: 0.81, f1: 0.82, auc: 0.87 },
]

const rocData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.05, tpr: 0.15 },
  { fpr: 0.1, tpr: 0.35 },
  { fpr: 0.15, tpr: 0.55 },
  { fpr: 0.2, tpr: 0.7 },
  { fpr: 0.3, tpr: 0.85 },
  { fpr: 0.5, tpr: 0.95 },
  { fpr: 1, tpr: 1 },
]

const metricsComparison = [
  { metric: "Accuracy", SVM: 78, RF: 80, GB: 81, NN: 79, Ensemble: 82 },
  { metric: "Precision", SVM: 81, RF: 82, GB: 83, NN: 80, Ensemble: 84 },
  { metric: "Recall", SVM: 75, RF: 79, GB: 80, NN: 78, Ensemble: 81 },
  { metric: "F1-Score", SVM: 78, RF: 80, GB: 81, NN: 79, Ensemble: 82 },
  { metric: "AUC", SVM: 84, RF: 85, GB: 86, NN: 84, Ensemble: 87 },
]

export default function ModelComparison() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Model Performance Comparison</h2>
        <p className="text-muted-foreground">Detailed metrics for all base models and the ensemble</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Accuracy Comparison</CardTitle>
          <CardDescription>Model accuracy across the test dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1]} />
              <Tooltip formatter={(value) => (value * 100).toFixed(1) + "%"} />
              <Bar dataKey="accuracy" fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metrics Comparison</CardTitle>
          <CardDescription>All metrics across models</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metricsComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis domain={[70, 90]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Line type="monotone" dataKey="SVM" stroke="var(--color-chart-1)" />
              <Line type="monotone" dataKey="RF" stroke="var(--color-chart-2)" />
              <Line type="monotone" dataKey="GB" stroke="var(--color-chart-3)" />
              <Line type="monotone" dataKey="NN" stroke="var(--color-chart-4)" />
              <Line type="monotone" dataKey="Ensemble" stroke="var(--color-primary)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ROC Curve</CardTitle>
          <CardDescription>Receiver Operating Characteristic curve for the ensemble model</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rocData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="fpr"
                label={{ value: "False Positive Rate", position: "insideBottomRight", offset: -5 }}
              />
              <YAxis label={{ value: "True Positive Rate", angle: -90, position: "insideLeft" }} />
              <Tooltip formatter={(value) => value.toFixed(3)} />
              <Line type="monotone" dataKey="tpr" stroke="var(--color-primary)" dot={false} strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="fpr"
                stroke="var(--color-muted-foreground)"
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics Table</CardTitle>
          <CardDescription>Comprehensive performance metrics for each model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-semibold">Model</th>
                  <th className="text-right py-2 px-2 font-semibold">Accuracy</th>
                  <th className="text-right py-2 px-2 font-semibold">Precision</th>
                  <th className="text-right py-2 px-2 font-semibold">Recall</th>
                  <th className="text-right py-2 px-2 font-semibold">F1-Score</th>
                  <th className="text-right py-2 px-2 font-semibold">AUC</th>
                </tr>
              </thead>
              <tbody>
                {modelMetrics.map((metric) => (
                  <tr key={metric.name} className="border-b border-border hover:bg-muted/50">
                    <td className="py-2 px-2 font-medium">{metric.name}</td>
                    <td className="text-right py-2 px-2">{(metric.accuracy * 100).toFixed(1)}%</td>
                    <td className="text-right py-2 px-2">{(metric.precision * 100).toFixed(1)}%</td>
                    <td className="text-right py-2 px-2">{(metric.recall * 100).toFixed(1)}%</td>
                    <td className="text-right py-2 px-2">{(metric.f1 * 100).toFixed(1)}%</td>
                    <td className="text-right py-2 px-2">{(metric.auc * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Model Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Best Performing Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">Ensemble</p>
              <p className="text-muted-foreground">Weighted combination of all base models</p>
              <div className="mt-4 space-y-1 text-sm">
                <p>Accuracy: 82%</p>
                <p>AUC: 0.87</p>
                <p>F1-Score: 0.82</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ensemble Weights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Gradient Boosting</span>
                  <span className="text-sm font-semibold">30%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-chart-3 h-2 rounded-full" style={{ width: "30%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">SVM</span>
                  <span className="text-sm font-semibold">25%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-chart-1 h-2 rounded-full" style={{ width: "25%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Random Forest</span>
                  <span className="text-sm font-semibold">25%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-chart-2 h-2 rounded-full" style={{ width: "25%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Neural Network</span>
                  <span className="text-sm font-semibold">20%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-chart-4 h-2 rounded-full" style={{ width: "20%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

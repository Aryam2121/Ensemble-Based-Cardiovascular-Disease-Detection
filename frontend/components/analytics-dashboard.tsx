"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

const performanceData = [
  { metric: "Accuracy", value: 82 },
  { metric: "Precision", value: 84 },
  { metric: "Recall", value: 81 },
  { metric: "F1-Score", value: 82 },
]

const riskDistribution = [
  { name: "Low Risk", value: 45, fill: "#10b981" },
  { name: "Moderate Risk", value: 35, fill: "#f59e0b" },
  { name: "High Risk", value: 20, fill: "#ef4444" },
]

const predictionTrend = [
  { month: "Jan", predictions: 120, positive: 35 },
  { month: "Feb", predictions: 150, positive: 42 },
  { month: "Mar", predictions: 180, positive: 55 },
  { month: "Apr", predictions: 200, positive: 62 },
  { month: "May", predictions: 220, positive: 68 },
  { month: "Jun", predictions: 250, positive: 78 },
]

const modelRadarData = [
  { metric: "Accuracy", SVM: 78, RF: 80, GB: 81, NN: 79 },
  { metric: "Precision", SVM: 81, RF: 82, GB: 83, NN: 80 },
  { metric: "Recall", SVM: 75, RF: 79, GB: 80, NN: 78 },
  { metric: "F1-Score", SVM: 78, RF: 80, GB: 81, NN: 79 },
  { metric: "AUC", SVM: 84, RF: 85, GB: 86, NN: 84 },
]

const statisticsCards = [
  { label: "Total Predictions", value: "1,120", change: "+12.5%" },
  { label: "Positive Cases", value: "340", change: "+8.2%" },
  { label: "Accuracy Rate", value: "82%", change: "+2.1%" },
  { label: "Avg Confidence", value: "87.3%", change: "+1.5%" },
]

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">System performance metrics and prediction statistics</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statisticsCards.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-green-600 mt-2">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Ensemble Model Performance</CardTitle>
          <CardDescription>Key metrics for the ensemble model</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="value" fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Prediction Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Prediction Trend</CardTitle>
          <CardDescription>Monthly prediction volume and positive cases</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={predictionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="predictions" stroke="var(--color-primary)" />
              <Line type="monotone" dataKey="positive" stroke="var(--color-destructive)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Distribution and Model Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>Distribution of predictions by risk level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Model Comparison Radar</CardTitle>
            <CardDescription>Performance metrics across all models</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={modelRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="SVM"
                  dataKey="SVM"
                  stroke="var(--color-chart-1)"
                  fill="var(--color-chart-1)"
                  fillOpacity={0.25}
                />
                <Radar
                  name="RF"
                  dataKey="RF"
                  stroke="var(--color-chart-2)"
                  fill="var(--color-chart-2)"
                  fillOpacity={0.25}
                />
                <Radar
                  name="GB"
                  dataKey="GB"
                  stroke="var(--color-chart-3)"
                  fill="var(--color-chart-3)"
                  fillOpacity={0.25}
                />
                <Radar
                  name="NN"
                  dataKey="NN"
                  stroke="var(--color-chart-4)"
                  fill="var(--color-chart-4)"
                  fillOpacity={0.25}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>API and model status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-semibold">API Status</p>
                <p className="text-sm text-muted-foreground">Backend service</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-semibold">Model Status</p>
                <p className="text-sm text-muted-foreground">All models loaded</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Ready</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-semibold">Average Response Time</p>
                <p className="text-sm text-muted-foreground">Prediction latency</p>
              </div>
              <span className="text-sm font-medium">245ms</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

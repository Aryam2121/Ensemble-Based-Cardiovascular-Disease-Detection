"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PredictionFormProps {
  onPredict: (data: any) => void
  loading: boolean
}

export default function PredictionForm({ onPredict, loading }: PredictionFormProps) {
  const [formData, setFormData] = useState({
    age: "",
    sex: "1",
    cp: "0",
    trestbps: "",
    chol: "",
    fbs: "0",
    restecg: "0",
    thalach: "",
    exang: "0",
    oldpeak: "",
    slope: "0",
    ca: "0",
    thal: "0",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPredict(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Data Input</CardTitle>
        <CardDescription>Enter patient information for CVD risk assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="0"
                max="120"
                value={formData.age}
                onChange={handleChange}
                placeholder="45"
                required
              />
            </div>
            <div>
              <Label htmlFor="sex">Sex</Label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="trestbps">Resting BP (mmHg)</Label>
              <Input
                id="trestbps"
                name="trestbps"
                type="number"
                value={formData.trestbps}
                onChange={handleChange}
                placeholder="120"
                required
              />
            </div>
            <div>
              <Label htmlFor="chol">Cholesterol (mg/dl)</Label>
              <Input
                id="chol"
                name="chol"
                type="number"
                value={formData.chol}
                onChange={handleChange}
                placeholder="200"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="thalach">Max Heart Rate</Label>
              <Input
                id="thalach"
                name="thalach"
                type="number"
                value={formData.thalach}
                onChange={handleChange}
                placeholder="150"
                required
              />
            </div>
            <div>
              <Label htmlFor="oldpeak">ST Depression</Label>
              <Input
                id="oldpeak"
                name="oldpeak"
                type="number"
                step="0.1"
                value={formData.oldpeak}
                onChange={handleChange}
                placeholder="1.0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cp">Chest Pain Type</Label>
              <select
                id="cp"
                name="cp"
                value={formData.cp}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="0">Typical Angina</option>
                <option value="1">Atypical Angina</option>
                <option value="2">Non-anginal Pain</option>
                <option value="3">Asymptomatic</option>
              </select>
            </div>
            <div>
              <Label htmlFor="exang">Exercise Induced Angina</Label>
              <select
                id="exang"
                name="exang"
                value={formData.exang}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Predict Risk"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

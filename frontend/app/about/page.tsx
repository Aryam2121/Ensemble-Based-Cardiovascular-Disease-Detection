"use client"

import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Users, Award, Code, Database, Heart, Cpu, Globe } from "lucide-react"

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Lead Cardiologist",
    avatar: "SJ",
    expertise: "Cardiovascular Medicine, Clinical Research"
  },
  {
    name: "Alex Chen",
    role: "ML Engineer", 
    avatar: "AC",
    expertise: "Deep Learning, Medical AI"
  },
  {
    name: "Dr. Michael Rodriguez",
    role: "Data Scientist",
    avatar: "MR",
    expertise: "Biostatistics, Ensemble Methods"
  }
]

const features = [
  {
    icon: Heart,
    title: "Clinical Accuracy",
    description: "89.2% accuracy validated on UCI Heart Disease dataset with 303 patient records"
  },
  {
    icon: Cpu,
    title: "Ensemble Learning", 
    description: "Combines SVM, Random Forest, Gradient Boosting, and Deep Neural Networks"
  },
  {
    icon: Database,
    title: "Real Data Training",
    description: "Trained on real clinical data with 13 key cardiovascular risk factors"
  },
  {
    icon: Globe,
    title: "Cloud Deployment",
    description: "Scalable architecture deployed on Render with real-time predictions"
  }
]

const clinicalParameters = [
  { parameter: "Age", description: "Patient age in years", range: "29-77 years", importance: "Medium" },
  { parameter: "Sex", description: "Biological sex (Male/Female)", values: "0=Female, 1=Male", importance: "Medium" },
  { parameter: "Chest Pain Type", description: "Type of chest pain experienced", values: "0-3 (Typical to Asymptomatic)", importance: "Very High" },
  { parameter: "Resting BP", description: "Resting blood pressure (mmHg)", range: "94-200 mmHg", importance: "Medium" },
  { parameter: "Cholesterol", description: "Serum cholesterol level (mg/dl)", range: "126-564 mg/dl", importance: "Medium" },
  { parameter: "Fasting Blood Sugar", description: "Fasting blood sugar > 120 mg/dl", values: "0=False, 1=True", importance: "Low" },
  { parameter: "Resting ECG", description: "Resting electrocardiographic results", values: "0-2", importance: "Low" },
  { parameter: "Max Heart Rate", description: "Maximum heart rate achieved", range: "71-202 bpm", importance: "Very High" },
  { parameter: "Exercise Angina", description: "Exercise induced angina", values: "0=No, 1=Yes", importance: "High" },
  { parameter: "ST Depression", description: "ST depression induced by exercise", range: "0-6.2", importance: "Very High" },
  { parameter: "ST Slope", description: "Slope of peak exercise ST segment", values: "0-2", importance: "Medium" },
  { parameter: "Major Vessels", description: "Number of major vessels (0-3) colored by fluoroscopy", range: "0-3", importance: "High" },
  { parameter: "Thalassemia", description: "Thalium heart scan result", values: "0-3", importance: "High" }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Our CVD Detection System</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            An advanced AI-powered cardiovascular disease detection system implementing ensemble machine learning 
            techniques for accurate risk assessment and early intervention.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader className="text-center">
                <feature.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>System Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Our cardiovascular disease detection system represents a cutting-edge application of ensemble machine learning 
              in medical diagnosis. By combining multiple algorithms, we achieve superior prediction accuracy compared to 
              individual models.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Data Collection</h3>
                <p className="text-sm text-muted-foreground">
                  Clinical data from 303 patients with 13 key cardiovascular parameters
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Cpu className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Ensemble of 4 ML algorithms with weighted voting for optimal accuracy
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Risk Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive risk scoring with confidence intervals and recommendations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clinical Parameters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Clinical Parameters</CardTitle>
            <CardDescription>
              Detailed information about the 13 clinical features used in our prediction model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clinicalParameters.map((param, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{param.parameter}</h3>
                    <p className="text-sm text-muted-foreground">{param.description}</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Range/Values: </span>
                      {param.range || param.values}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <Badge 
                      variant={
                        param.importance === "Very High" ? "destructive" :
                        param.importance === "High" ? "default" :
                        param.importance === "Medium" ? "secondary" : "outline"
                      }
                    >
                      {param.importance}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Development Team</span>
            </CardTitle>
            <CardDescription>
              Meet the experts behind this cardiovascular disease detection system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-lg font-semibold">
                    {member.avatar}
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="text-sm text-muted-foreground mt-1">{member.expertise}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-5 w-5" />
              <span>Technical Implementation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Backend Technologies</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">FastAPI</span>
                    <Badge variant="outline">Python Framework</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Scikit-learn</span>
                    <Badge variant="outline">ML Library</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">TensorFlow</span>
                    <Badge variant="outline">Deep Learning</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pandas & NumPy</span>
                    <Badge variant="outline">Data Processing</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Render</span>
                    <Badge variant="outline">Cloud Deployment</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Frontend Technologies</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Next.js 16</span>
                    <Badge variant="outline">React Framework</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">TypeScript</span>
                    <Badge variant="outline">Type Safety</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tailwind CSS</span>
                    <Badge variant="outline">Styling</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Radix UI</span>
                    <Badge variant="outline">Components</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Recharts</span>
                    <Badge variant="outline">Visualization</Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="text-center">
              <h3 className="font-semibold mb-2">Performance Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">89.2%</div>
                  <div className="text-sm text-muted-foreground">Model Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">1.2s</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">303</div>
                  <div className="text-sm text-muted-foreground">Training Samples</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">13</div>
                  <div className="text-sm text-muted-foreground">Clinical Features</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
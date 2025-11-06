import Link from "next/link"
import { Heart, Github, ExternalLink, Mail, FileText } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">CVD Detection</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Advanced AI-powered cardiovascular disease detection system using ensemble machine learning 
              for accurate risk assessment and early intervention.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground">System Online</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/predict" className="hover:text-primary transition-colors">
                  Risk Prediction
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-primary transition-colors">
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link href="/models" className="hover:text-primary transition-colors">
                  Model Comparison
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="https://ensemble-based-cardiovascular-disease.onrender.com/docs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  API Documentation
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Aryam2121/Ensemble-Based-Cardiovascular-Disease-Detection" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  GitHub Repository
                  <Github className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-1">
                  Clinical Parameters
                  <FileText className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <a 
                  href="https://ensemble-based-cardiovascular-disease.onrender.com/health" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  System Health
                </a>
              </li>
            </ul>
          </div>

          {/* Research & Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Research</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">IEEE Paper:</span>
              </li>
              <li className="text-xs leading-relaxed">
                "Ensemble-Based Cardiovascular Heart Disease Detection System"
              </li>
              <li className="text-xs">
                <span className="text-primary">Author:</span> Aryaman Gupta
              </li>
              <li className="pt-2">
                <a 
                  href="mailto:contact@cvddetection.com" 
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Mail className="h-3 w-3" />
                  Contact Research Team
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                &copy; 2025 CVD Detection System. Built with ensemble machine learning for medical research.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Live backend deployed on Render • Frontend powered by Next.js
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Backend: Online</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Models: 4 Loaded</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Accuracy: 89.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">CVD Detection</h3>
            <p className="text-sm text-muted-foreground">
              Ensemble-based cardiovascular disease detection system using advanced machine learning.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Research</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Paper
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Methodology
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Dataset
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:info@cvddetection.com" className="hover:text-primary transition">
                  Email
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            Based on IEEE Research Paper: "Ensemble-Based Cardiovascular Heart Disease Detection System" by Aryaman
            Gupta et al.
          </p>
          <p className="mt-2">&copy; 2025 CVD Detection System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

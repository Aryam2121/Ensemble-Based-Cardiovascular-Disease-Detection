export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
          Ensemble-Based Cardiovascular Disease Detection
        </h1>
        <p className="text-lg text-muted-foreground mb-8 text-balance">
          Advanced machine learning system combining SVM, Random Forest, Gradient Boosting, and Deep Neural Networks for
          accurate CVD risk prediction.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="text-2xl font-bold text-primary">87%</div>
            <div className="text-sm text-muted-foreground">AUC Score</div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="text-2xl font-bold text-secondary">82%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="text-2xl font-bold text-accent">4</div>
            <div className="text-sm text-muted-foreground">Base Models</div>
          </div>
        </div>
      </div>
    </section>
  )
}

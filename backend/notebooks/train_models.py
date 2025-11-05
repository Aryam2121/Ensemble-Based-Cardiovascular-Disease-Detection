"""
Complete ML model training pipeline for CVD Detection
Trains SVM, Random Forest, Gradient Boosting, and Deep Neural Network models
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, confusion_matrix, roc_curve, auc
)
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Set random seeds for reproducibility
np.random.seed(42)
tf.random.set_seed(42)

class CVDModelTrainer:
    """Train and evaluate ensemble models for CVD detection"""
    
    def __init__(self, data_path=None):
        self.data_path = data_path
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        self.scaler = None
        self.models = {}
        self.metrics = {}
        
    def load_data(self):
        """Load and prepare CVD dataset"""
        logger.info("Loading CVD dataset...")
        
        # If no path provided, create synthetic dataset
        if self.data_path is None or not Path(self.data_path).exists():
            logger.info("Creating synthetic CVD dataset...")
            self.X, self.y = self._create_synthetic_data()
        else:
            # Load from CSV
            df = pd.read_csv(self.data_path)
            self.X = df.drop('target', axis=1)
            self.y = df['target']
        
        logger.info(f"Dataset shape: {self.X.shape}")
        logger.info(f"Class distribution: {np.bincount(self.y)}")
        
        # Split data
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            self.X, self.y, test_size=0.2, random_state=42, stratify=self.y
        )
        
        # Scale features
        self.scaler = StandardScaler()
        self.X_train = self.scaler.fit_transform(self.X_train)
        self.X_test = self.scaler.transform(self.X_test)
        
        logger.info(f"Training set size: {self.X_train.shape[0]}")
        logger.info(f"Test set size: {self.X_test.shape[0]}")
    
    def _create_synthetic_data(self, n_samples=300):
        """Create synthetic CVD dataset for demonstration"""
        np.random.seed(42)
        
        # Generate features
        age = np.random.randint(30, 80, n_samples)
        sex = np.random.randint(0, 2, n_samples)
        cp = np.random.randint(0, 4, n_samples)
        trestbps = np.random.randint(90, 200, n_samples)
        chol = np.random.randint(100, 400, n_samples)
        fbs = np.random.randint(0, 2, n_samples)
        restecg = np.random.randint(0, 3, n_samples)
        thalach = np.random.randint(60, 200, n_samples)
        exang = np.random.randint(0, 2, n_samples)
        oldpeak = np.random.uniform(0, 6, n_samples)
        slope = np.random.randint(0, 3, n_samples)
        ca = np.random.randint(0, 4, n_samples)
        thal = np.random.randint(0, 4, n_samples)
        
        X = np.column_stack([
            age, sex, cp, trestbps, chol, fbs, restecg,
            thalach, exang, oldpeak, slope, ca, thal
        ])
        
        # Generate target based on risk factors
        y = (
            (age > 55) * 0.3 +
            (chol > 240) * 0.2 +
            (trestbps > 140) * 0.2 +
            (thalach < 100) * 0.15 +
            (oldpeak > 2) * 0.15
        ) > 0.5
        
        return X.astype(float), y.astype(int)
    
    def train_svm(self):
        """Train Support Vector Machine model"""
        logger.info("Training SVM model...")
        svm = SVC(kernel='rbf', C=1.0, gamma='scale', probability=True, random_state=42)
        svm.fit(self.X_train, self.y_train)
        self.models['svm'] = svm
        logger.info("SVM training completed")
    
    def train_random_forest(self):
        """Train Random Forest model"""
        logger.info("Training Random Forest model...")
        rf = RandomForestClassifier(
            n_estimators=100,
            max_depth=15,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42,
            n_jobs=-1
        )
        rf.fit(self.X_train, self.y_train)
        self.models['random_forest'] = rf
        logger.info("Random Forest training completed")
    
    def train_gradient_boosting(self):
        """Train Gradient Boosting model"""
        logger.info("Training Gradient Boosting model...")
        gb = GradientBoostingClassifier(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=5,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42
        )
        gb.fit(self.X_train, self.y_train)
        self.models['gradient_boosting'] = gb
        logger.info("Gradient Boosting training completed")
    
    def train_neural_network(self):
        """Train Deep Neural Network model"""
        logger.info("Training Neural Network model...")
        
        model = keras.Sequential([
            layers.Dense(64, activation='relu', input_shape=(self.X_train.shape[1],)),
            layers.Dropout(0.3),
            layers.Dense(32, activation='relu'),
            layers.Dropout(0.3),
            layers.Dense(16, activation='relu'),
            layers.Dropout(0.2),
            layers.Dense(1, activation='sigmoid')
        ])
        
        model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=0.001),
            loss='binary_crossentropy',
            metrics=['accuracy', keras.metrics.AUC()]
        )
        
        # Train with early stopping
        early_stop = keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=10,
            restore_best_weights=True
        )
        
        model.fit(
            self.X_train, self.y_train,
            epochs=100,
            batch_size=16,
            validation_split=0.2,
            callbacks=[early_stop],
            verbose=0
        )
        
        self.models['neural_network'] = model
        logger.info("Neural Network training completed")
    
    def evaluate_models(self):
        """Evaluate all trained models"""
        logger.info("Evaluating models...")
        
        for model_name, model in self.models.items():
            logger.info(f"\nEvaluating {model_name}...")
            
            # Get predictions
            if model_name == 'neural_network':
                y_pred_proba = model.predict(self.X_test, verbose=0).flatten()
                y_pred = (y_pred_proba > 0.5).astype(int)
            else:
                y_pred_proba = model.predict_proba(self.X_test)[:, 1]
                y_pred = model.predict(self.X_test)
            
            # Calculate metrics
            accuracy = accuracy_score(self.y_test, y_pred)
            precision = precision_score(self.y_test, y_pred)
            recall = recall_score(self.y_test, y_pred)
            f1 = f1_score(self.y_test, y_pred)
            auc_score = roc_auc_score(self.y_test, y_pred_proba)
            
            self.metrics[model_name] = {
                'accuracy': accuracy,
                'precision': precision,
                'recall': recall,
                'f1_score': f1,
                'auc': auc_score
            }
            
            logger.info(f"  Accuracy: {accuracy:.4f}")
            logger.info(f"  Precision: {precision:.4f}")
            logger.info(f"  Recall: {recall:.4f}")
            logger.info(f"  F1-Score: {f1:.4f}")
            logger.info(f"  AUC: {auc_score:.4f}")
    
    def ensemble_predict(self, X):
        """Make ensemble predictions"""
        weights = {
            'svm': 0.25,
            'random_forest': 0.25,
            'gradient_boosting': 0.30,
            'neural_network': 0.20
        }
        
        ensemble_proba = np.zeros(X.shape[0])
        
        for model_name, model in self.models.items():
            if model_name == 'neural_network':
                proba = model.predict(X, verbose=0).flatten()
            else:
                proba = model.predict_proba(X)[:, 1]
            
            ensemble_proba += proba * weights[model_name]
        
        return ensemble_proba
    
    def evaluate_ensemble(self):
        """Evaluate ensemble model"""
        logger.info("\nEvaluating Ensemble Model...")
        
        y_pred_proba = self.ensemble_predict(self.X_test)
        y_pred = (y_pred_proba > 0.5).astype(int)
        
        accuracy = accuracy_score(self.y_test, y_pred)
        precision = precision_score(self.y_test, y_pred)
        recall = recall_score(self.y_test, y_pred)
        f1 = f1_score(self.y_test, y_pred)
        auc_score = roc_auc_score(self.y_test, y_pred_proba)
        
        self.metrics['ensemble'] = {
            'accuracy': accuracy,
            'precision': precision,
            'recall': recall,
            'f1_score': f1,
            'auc': auc_score
        }
        
        logger.info(f"  Accuracy: {accuracy:.4f}")
        logger.info(f"  Precision: {precision:.4f}")
        logger.info(f"  Recall: {recall:.4f}")
        logger.info(f"  F1-Score: {f1:.4f}")
        logger.info(f"  AUC: {auc_score:.4f}")
    
    def save_models(self, output_dir='../backend/models'):
        """Save trained models to disk"""
        logger.info(f"Saving models to {output_dir}...")
        
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        
        # Save sklearn models
        joblib.dump(self.models['svm'], f'{output_dir}/svm_model.pkl')
        joblib.dump(self.models['random_forest'], f'{output_dir}/rf_model.pkl')
        joblib.dump(self.models['gradient_boosting'], f'{output_dir}/gb_model.pkl')
        joblib.dump(self.scaler, f'{output_dir}/scaler.pkl')
        
        # Save neural network
        self.models['neural_network'].save(f'{output_dir}/nn_model.h5')
        
        logger.info("Models saved successfully")
    
    def plot_results(self, output_dir='../backend/models'):
        """Generate visualization plots"""
        logger.info("Generating plots...")
        
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        
        # Plot 1: Model Comparison
        fig, ax = plt.subplots(figsize=(10, 6))
        models_list = list(self.metrics.keys())
        accuracies = [self.metrics[m]['accuracy'] for m in models_list]
        colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
        
        ax.bar(models_list, accuracies, color=colors[:len(models_list)])
        ax.set_ylabel('Accuracy')
        ax.set_title('Model Accuracy Comparison')
        ax.set_ylim([0.7, 0.85])
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(f'{output_dir}/model_comparison.png', dpi=300)
        logger.info("Saved model_comparison.png")
        
        # Plot 2: ROC Curves
        fig, ax = plt.subplots(figsize=(10, 8))
        
        for model_name, model in self.models.items():
            if model_name == 'neural_network':
                y_pred_proba = model.predict(self.X_test, verbose=0).flatten()
            else:
                y_pred_proba = model.predict_proba(self.X_test)[:, 1]
            
            fpr, tpr, _ = roc_curve(self.y_test, y_pred_proba)
            roc_auc = auc(fpr, tpr)
            ax.plot(fpr, tpr, label=f'{model_name} (AUC = {roc_auc:.3f})')
        
        # Ensemble ROC
        ensemble_proba = self.ensemble_predict(self.X_test)
        fpr, tpr, _ = roc_curve(self.y_test, ensemble_proba)
        roc_auc = auc(fpr, tpr)
        ax.plot(fpr, tpr, label=f'Ensemble (AUC = {roc_auc:.3f})', linewidth=2, linestyle='--')
        
        ax.plot([0, 1], [0, 1], 'k--', label='Random')
        ax.set_xlabel('False Positive Rate')
        ax.set_ylabel('True Positive Rate')
        ax.set_title('ROC Curves')
        ax.legend()
        plt.tight_layout()
        plt.savefig(f'{output_dir}/roc_curves.png', dpi=300)
        logger.info("Saved roc_curves.png")
        
        # Plot 3: Confusion Matrix
        fig, axes = plt.subplots(2, 3, figsize=(15, 10))
        axes = axes.flatten()
        
        for idx, (model_name, model) in enumerate(self.models.items()):
            if model_name == 'neural_network':
                y_pred = (model.predict(self.X_test, verbose=0).flatten() > 0.5).astype(int)
            else:
                y_pred = model.predict(self.X_test)
            
            cm = confusion_matrix(self.y_test, y_pred)
            sns.heatmap(cm, annot=True, fmt='d', ax=axes[idx], cmap='Blues')
            axes[idx].set_title(f'{model_name}')
        
        # Ensemble confusion matrix
        ensemble_pred = (self.ensemble_predict(self.X_test) > 0.5).astype(int)
        cm = confusion_matrix(self.y_test, ensemble_pred)
        sns.heatmap(cm, annot=True, fmt='d', ax=axes[4], cmap='Blues')
        axes[4].set_title('Ensemble')
        
        axes[5].axis('off')
        
        plt.tight_layout()
        plt.savefig(f'{output_dir}/confusion_matrices.png', dpi=300)
        logger.info("Saved confusion_matrices.png")
    
    def train_all(self):
        """Train all models"""
        self.load_data()
        self.train_svm()
        self.train_random_forest()
        self.train_gradient_boosting()
        self.train_neural_network()
        self.evaluate_models()
        self.evaluate_ensemble()
        self.save_models()
        self.plot_results()
        
        logger.info("\nTraining completed successfully!")
        return self.metrics

if __name__ == "__main__":
    trainer = CVDModelTrainer()
    metrics = trainer.train_all()
    
    # Print summary
    print("\n" + "="*50)
    print("MODEL PERFORMANCE SUMMARY")
    print("="*50)
    for model, scores in metrics.items():
        print(f"\n{model.upper()}:")
        for metric, value in scores.items():
            print(f"  {metric}: {value:.4f}")

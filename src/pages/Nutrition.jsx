import React, { useState, useMemo, useEffect } from 'react';
import { Chart as ArcChart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { calculateBMR, calculateTDEE, calculateMacros } from '../data/nutritionData';
import { generateMealPlanAI } from '../services/aiService';
import { Flame, Beef, Wheat, Droplet, UtensilsCrossed, Calculator, Target, Download, Sparkles } from 'lucide-react';

ArcChart.register(ArcElement, Tooltip, Legend);

export default function Nutrition() {
  const [phaseToggle, setPhaseToggle] = useState('Muscle Gain'); // Maintenance, Muscle Gain, Fat Loss
  
  const [profile] = useState(() => {
    const saved = localStorage.getItem('fitforge-profile');
    return saved ? JSON.parse(saved) : {
      weight: 75, height: 178, age: 28, gender: 'Male', goal: 'Muscle Gain'
    };
  });

  const [mealPlan, setMealPlan] = useState(() => {
    const saved = localStorage.getItem('fitforge-mealplan');
    return saved ? JSON.parse(saved) : null;
  });

  const [generating, setGenerating] = useState(false);

  const bmr = calculateBMR(profile.weight || 75, profile.height || 178, profile.age || 28, profile.gender || 'Male');
  const tdee = calculateTDEE(bmr, 'moderate');

  // Multi-phase target calculator
  const calorieTarget = useMemo(() => {
    if (phaseToggle === 'Fat Loss') return Math.round(tdee - 500); // Deficit / Cutting
    if (phaseToggle === 'Muscle Gain') return Math.round(tdee + 300); // Surplus / Bulking
    return Math.round(tdee); // Maintenance
  }, [tdee, phaseToggle]);

  const macros = calculateMacros(calorieTarget, phaseToggle, profile.weight || 75);

  const macroChartData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [{
      data: [macros.protein * 4, macros.carbs * 4, macros.fat * 9],
      backgroundColor: ['rgba(99,102,241,0.85)', 'rgba(6,182,212,0.85)', 'rgba(245,158,11,0.85)'],
      borderWidth: 0,
      hoverOffset: 8,
    }]
  };

  async function handleGeneratePlan() {
    setGenerating(true);
    try {
      const plan = await generateMealPlanAI(macros);
      setMealPlan(plan);
      localStorage.setItem('fitforge-mealplan', JSON.stringify(plan));
    } catch (error) {
      console.error("Failed to generate AI meal plan", error);
      alert("Failed to connect to AI Nutritionist. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  function handleClearPlan() {
    if (window.confirm("Are you sure you want to clear your meal plan?")) {
      setMealPlan(null);
      localStorage.removeItem('fitforge-mealplan');
    }
  }

  return (
    <div className="animate-fadeIn page-transition">
      <div className="section-header">
        <div>
          <h2>Nutrition & Meal Planner</h2>
          <p>Optimize your caloric and macronutrient ratios to match your targets</p>
        </div>
        <button className="btn btn-primary no-print" onClick={() => window.print()}>
          <Download size={16} /> Export Weekly Diet PDF
        </button>
      </div>

      {/* Target Toggles */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 'var(--space-6)' }} className="no-print">
        <button 
          className={`btn ${phaseToggle === 'Fat Loss' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setPhaseToggle('Fat Loss')}
        >
          🔥 Cutting (-500 kcal)
        </button>
        <button 
          className={`btn ${phaseToggle === 'General Fitness' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setPhaseToggle('General Fitness')}
        >
          ⚡ Maintenance (0 kcal)
        </button>
        <button 
          className={`btn ${phaseToggle === 'Muscle Gain' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setPhaseToggle('Muscle Gain')}
        >
          💪 Bulking (+300 kcal)
        </button>
      </div>

      {/* Calorie Stats Card */}
      <div className="card glass-premium" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)', border: '1px solid var(--border-active)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1 }}>
              <Calculator size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> BMR
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{Math.round(bmr)}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>cal/day basal needs</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1 }}>
              <Flame size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> TDEE
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{tdee}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>total energy spend</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1 }}>
              <Target size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> TARGET CALORIES
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--brand-primary-light)' }}>{calorieTarget}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>kcal/day for {phaseToggle.toLowerCase()}</div>
          </div>
        </div>
      </div>

      {/* Macros Display Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }} className="progress-grid">
        <div className="macro-grid">
          <div className="card macro-card animate-slideUp stagger-1 glass-premium">
            <Flame size={24} style={{ color: 'var(--brand-danger)', marginBottom: 4 }} />
            <div className="macro-value" style={{ color: 'var(--brand-primary-light)' }}>{macros.calories}</div>
            <div className="macro-label">Calories</div>
            <div className="macro-unit">kcal/day</div>
          </div>
          <div className="card macro-card animate-slideUp stagger-2 glass-premium">
            <Beef size={24} style={{ color: 'var(--brand-primary-light)', marginBottom: 4 }} />
            <div className="macro-value" style={{ color: 'var(--brand-primary-light)' }}>{macros.protein}g</div>
            <div className="macro-label">Protein Target</div>
            <div className="macro-unit">{Math.round(macros.protein * 4 / macros.calories * 100)}% of diet</div>
          </div>
          <div className="card macro-card animate-slideUp stagger-3 glass-premium">
            <Wheat size={24} style={{ color: 'var(--brand-secondary)', marginBottom: 4 }} />
            <div className="macro-value" style={{ color: 'var(--brand-secondary)' }}>{macros.carbs}g</div>
            <div className="macro-label">Carbs Target</div>
            <div className="macro-unit">{Math.round(macros.carbs * 4 / macros.calories * 100)}% of diet</div>
          </div>
          <div className="card macro-card animate-slideUp stagger-4 glass-premium">
            <Droplet size={24} style={{ color: 'var(--brand-warning)', marginBottom: 4 }} />
            <div className="macro-value" style={{ color: 'var(--brand-warning)' }}>{macros.fat}g</div>
            <div className="macro-label">Fat Target</div>
            <div className="macro-unit">{Math.round(macros.fat * 9 / macros.calories * 100)}% of diet</div>
          </div>
        </div>

        {/* Macro Pie Chart */}
        <div className="card glass-premium animate-slideUp stagger-5" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ fontWeight: 700, marginBottom: 'var(--space-4)' }}>Macro Ratio Breakup</h3>
          <div style={{ width: 180, height: 180 }}>
            <Doughnut
              data={macroChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: '#94a3b8', font: { size: 10 }, boxWidth: 10, padding: 8 }
                  }
                },
                cutout: '65%'
              }}
            />
          </div>
        </div>
      </div>

      {/* AI Meal Planner */}
      <div style={{ marginTop: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <UtensilsCrossed size={22} style={{ color: 'var(--brand-primary-light)' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800 }}>AI Meal Planner</h2>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {mealPlan && (
              <button className="btn btn-secondary no-print" onClick={handleClearPlan}>
                Clear Plan
              </button>
            )}
            <button className="btn btn-primary no-print" onClick={handleGeneratePlan} disabled={generating}>
              <Sparkles size={16} /> {generating ? 'Generating...' : 'Generate AI Plan'}
            </button>
          </div>
        </div>

        {!mealPlan ? (
          <div className="card glass-premium" style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-tertiary)' }}>
            <UtensilsCrossed size={48} style={{ margin: '0 auto var(--space-4)', opacity: 0.5 }} />
            <h3 style={{ marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>No Meal Plan Generated</h3>
            <p>Click the "Generate AI Plan" button above to dynamically create a customized meal plan tailored exactly to your macro targets using Groq Llama 3.</p>
          </div>
        ) : (
          <div className="meal-grid">
            {mealPlan.map((meal, i) => {
              const totalCal = (meal.items || []).reduce((s, it) => s + it.calories, 0);
              const totalPro = (meal.items || []).reduce((s, it) => s + (it.protein || 0), 0);

              return (
                <div key={i} className={`card meal-card card-interactive glass-premium animate-slideUp stagger-${i + 1}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div className="meal-card-time">{meal.name}</div>
                  </div>
                  
                  <div className="meal-card-macros" style={{ color: 'var(--text-secondary)', fontSize: 12, margin: '6px 0 12px 0' }}>
                    <span>🔥 {totalCal || meal.totalCalories} kcal</span>
                    <span style={{ margin: '0 8px' }}>•</span>
                    <span>💪 {totalPro || meal.totalProtein}g protein</span>
                  </div>
                  
                  <div className="meal-card-items" style={{ borderTop: '1px solid var(--border-primary)', paddingTop: 8 }}>
                    {meal.items && meal.items.map((item, j) => (
                      <div key={j} className="meal-card-item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>
                        <span>{item.name}</span>
                        <span>{item.calories} kcal</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

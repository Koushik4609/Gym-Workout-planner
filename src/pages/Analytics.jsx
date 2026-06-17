import React, { useRef } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Flame, Dumbbell, Target, Download, Calendar } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Analytics() {
  const { workouts, prs } = useData();
  const reportRef = useRef(null);

  // PDF Export Function
  async function handlePrintPDF() {
    if (!reportRef.current) return;
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 2, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('FitForge_Analytics_Report.pdf');
    } catch (err) {
      console.error("PDF generation failed", err);
    }
  }

  // Calculate Real Metrics
  const totalWorkouts = workouts?.length || 0;
  const totalVolume = workouts?.reduce((acc, curr) => acc + (curr.volumeLifted || 0), 0) || 0;
  const totalCalories = workouts?.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0) || 0;
  const totalMinutes = workouts?.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0) || 0;

  // Group workouts by date for the timeline chart
  const timelineMap = {};
  workouts?.forEach(w => {
    if (!timelineMap[w.date]) {
      timelineMap[w.date] = { date: w.date, calories: 0, volume: 0 };
    }
    timelineMap[w.date].calories += w.caloriesBurned || 0;
    timelineMap[w.date].volume += w.volumeLifted || 0;
  });
  
  const timelineData = Object.values(timelineMap)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-14); // Last 14 active days

  // Format PR Data for Bar Chart
  const prChartData = prs ? Object.entries(prs).map(([name, data]) => ({
    name: name.toUpperCase(),
    Weight: data.current
  })) : [];

  return (
    <div className="animate-fadeIn page-transition">
      <div className="section-header">
        <div>
          <h2>Analytics Dashboard</h2>
          <p>Track your physical progress, volume lifted, and calorie metrics</p>
        </div>
        <button className="btn btn-primary no-print" onClick={handlePrintPDF}>
          <Download size={16} /> Export Progress Report PDF
        </button>
      </div>

      <div ref={reportRef} style={{ background: 'var(--bg-primary)', padding: 'var(--space-2)' }}>
        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', background: 'rgba(99,102,241,0.1)', borderRadius: 'var(--radius-md)', color: 'var(--brand-primary)' }}>
              <Calendar size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase' }}>Total Workouts</p>
              <h3 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>{totalWorkouts}</h3>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', background: 'rgba(239,68,68,0.1)', borderRadius: 'var(--radius-md)', color: 'var(--brand-danger)' }}>
              <Flame size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase' }}>Total Calories</p>
              <h3 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>{totalCalories.toLocaleString()}</h3>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', background: 'rgba(16,185,129,0.1)', borderRadius: 'var(--radius-md)', color: 'var(--brand-success)' }}>
              <Dumbbell size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase' }}>Total Volume (lbs)</p>
              <h3 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>{totalVolume.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 8 }}><TrendingUp size={18} /> Volume Lifted Over Time</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: 'var(--shadow-md)' }} />
                  <Area type="monotone" dataKey="volume" stroke="#10b981" fillOpacity={1} fill="url(#colorVolume)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 8 }}><Target size={18} /> PR Strength Profile</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prChartData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: 'var(--shadow-md)' }} />
                  <Bar dataKey="Weight" fill="#6366f1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 8 }}><Flame size={18} /> Caloric Expenditure Timeline</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Area type="monotone" dataKey="calories" stroke="#ef4444" fillOpacity={1} fill="url(#colorCalories)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

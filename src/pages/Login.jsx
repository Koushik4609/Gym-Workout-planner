import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Dumbbell, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Intercept Portfolio Demo Account
    if (email === 'demo@fitforge.ai' && password === 'demo123') {
      demoLogin();
      navigate('/dashboard');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message?.includes('invalid') ? 'Invalid email or password.' : 'Failed to sign in. Check your credentials.');
    }
    setLoading(false);
  }

  function handleDemoLogin() {
    demoLogin();
    navigate('/dashboard');
  }

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-bg-orb" />
        <div className="auth-bg-orb" />
        <div className="auth-bg-orb" />
      </div>
      <div className="auth-card glass animate-scaleIn">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="sidebar-logo-icon" style={{ width: 48, height: 48, fontSize: 24 }}>
              <Dumbbell size={26} />
            </div>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to FitForge AI and continue your fitness journey</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ paddingLeft: 42 }}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="input"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ paddingLeft: 42, paddingRight: 42 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <Link to="/forgot-password" style={{ fontSize: 'var(--text-sm)' }}>Forgot password?</Link>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', margin: 'var(--space-4) 0', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>or</div>

        <button onClick={handleDemoLogin} className="btn btn-secondary btn-lg w-full">
          🚀 Try Demo (No Account Needed)
        </button>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Create one</Link>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Dumbbell, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please check your email address.');
    }
    setLoading(false);
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
          <h1 className="auth-title">Reset Password</h1>
          <p className="auth-subtitle">
            {success
              ? 'Check your inbox for the reset link'
              : "Enter your email and we'll send you a reset link"}
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {success ? (
          <div style={{ textAlign: 'center' }}>
            <CheckCircle size={48} style={{ color: 'var(--brand-success)', marginBottom: 'var(--space-4)' }} />
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
              Password reset email sent to <strong>{email}</strong>. Check your inbox and follow the instructions.
            </p>
            <Link to="/login" className="btn btn-primary btn-lg w-full">
              <ArrowLeft size={18} /> Back to Login
            </Link>
          </div>
        ) : (
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

            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="auth-footer">
          <Link to="/login"><ArrowLeft size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup({ showToast }) {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const user = await signup(form.name, form.email, form.password);
      showToast && showToast(`Account created — welcome, ${user.name.split(' ')[0]}!`);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2>Create account</h2>
        <p>Sign up to get started.</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={onSubmit}>
          <input required placeholder="Full name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input required type="email" placeholder="Email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input required type="password" placeholder="Password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <input required type="password" placeholder="Confirm password" value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <div className="auth-switch">Already have an account? <Link to="/login">Log in</Link></div>
      </div>
    </div>
  );
}

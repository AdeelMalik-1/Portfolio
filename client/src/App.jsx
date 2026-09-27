import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Toast from './components/Toast.jsx';
import Home from './pages/Home.jsx';

// Login/Signup are code-split: most visitors only ever see the homepage,
// so this keeps their initial bundle smaller and the first paint faster.
const Login = lazy(() => import('./pages/Login.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [toast, setToast] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    document.documentElement.classList.add('theme-switching');
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
    window.setTimeout(() => {
      document.documentElement.classList.remove('theme-switching');
    }, 60);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home showToast={showToast} />} />
          <Route path="/login" element={<Login showToast={showToast} />} />
          <Route path="/signup" element={<Signup showToast={showToast} />} />
        </Routes>
      </Suspense>
      <Footer />
      <Toast message={toast} />
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  ['home', 'Home'], ['about', 'About'], ['skills', 'Skills'],
  ['projects', 'Projects'], ['services', 'Services'], ['contact', 'Contact'],
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;
    // Hysteresis (different on/off thresholds) + requestAnimationFrame so the
    // scroll state can't rapidly flip back and forth when the page sits right
    // at the boundary — that rapid flipping was replaying the nav's background
    // transition every frame, which made the icons appear to jitter/move.
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled((prev) => {
          const y = window.scrollY;
          if (prev) return y > 4; // stay "scrolled" until well back near the top
          return y > 24; // only switch to "scrolled" once clearly past the top
        });
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mobile browsers sometimes try to scroll a tapped button into view when
  // it takes focus — with a position:fixed nav this can misfire and yank
  // the whole page up/down. These buttons don't need focus styling after a
  // tap (keyboard/Tab users still get focus normally), so we stop the
  // pointer-triggered focus that causes the jump.
  const preventFocusScroll = (e) => e.preventDefault();

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="wrap navrow">
        <Link to="/" className="logo">Adeel<span>.</span>Developer</Link>
        <ul className="navlinks">
          {links.map(([id, label]) => (
            <li key={id}><a href={`/#${id}`}>{label}</a></li>
          ))}
        </ul>
        <div className="navactions">
          <button
            className="iconbtn"
            onMouseDown={preventFocusScroll}
            onTouchStart={preventFocusScroll}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4.2"/><line x1="12" y1="2.5" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21.5"/><line x1="4.2" y1="4.2" x2="6" y2="6"/><line x1="18" y1="18" x2="19.8" y2="19.8"/><line x1="2.5" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21.5" y2="12"/><line x1="4.2" y1="19.8" x2="6" y2="18"/><line x1="18" y1="6" x2="19.8" y2="4.2"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>
            )}
          </button>
          {user ? (
            <>
              <span className="user-pill">Hi, <b>{user.name.split(' ')[0]}</b></span>
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn btn-ghost btn-sm" to="/login">Login</Link>
              <Link className="btn btn-primary btn-sm" to="/signup">Sign Up</Link>
            </>
          )}
          <button
            className="hamburger"
            onMouseDown={preventFocusScroll}
            onTouchStart={preventFocusScroll}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
          </button>
        </div>
      </div>
      <div className={`mobilemenu${open ? ' open' : ''}`}>
        {links.map(([id, label]) => (
          <a key={id} href={`/#${id}`} onClick={() => setOpen(false)}>{label}</a>
        ))}
        {user ? (
          <button className="btn btn-ghost" onClick={() => { setOpen(false); handleLogout(); }}>Logout ({user.name.split(' ')[0]})</button>
        ) : (
          <>
            <Link className="btn btn-ghost" to="/login" onClick={() => setOpen(false)}>Login</Link>
            <Link className="btn btn-primary" to="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

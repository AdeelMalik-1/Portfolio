import React, { useEffect, useRef, useState } from 'react';
import useReveal from '../hooks/useReveal.js';

const stats = [
  { target: 12, suffix: '+', label: 'Projects Built' },
  { target: 10, suffix: '+', label: 'Technologies' },
  { target: 25, suffix: '+', label: 'GitHub Repos' },
  { target: 2, suffix: '+', label: 'Years Learning' },
];

export default function About() {
  const ref = useReveal();
  const statsRef = useRef(null);
  const started = useRef(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const startTime = performance.now();
            const step = (now) => {
              const p = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setCounts(stats.map((s) => Math.round(s.target * eased)));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" ref={ref}>
      <div className="wrap">
        <div className="sec-head reveal"><h2>About</h2><p>A quick look at how I think and build.</p></div>
        <div className="about-grid">
          <div className="reveal">
            <p>I specialize in the MERN stack — building responsive interfaces in React, robust REST APIs in Express and Node, and clean data models in MongoDB.</p>
            <p>My approach centers on clean, maintainable code, thoughtful API design and interfaces that stay fast and usable on any device.</p>
            <p>Currently pursuing a <b>BS in Software Engineering</b> at <b>Khwaja Fareed University of Engineering &amp; Information Technology</b> (Session 2023–2027).</p>
          </div>
          <div className="stats reveal" ref={statsRef}>
            {stats.map((s, i) => (
              <div className="stat" key={s.label}>
                <b>{counts[i]}{s.suffix}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

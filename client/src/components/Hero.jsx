import React, { useEffect, useRef, useState } from 'react';
import { techA, techB } from '../data/projectsData.js';

const roles = ['Full Stack Developer', 'AI Engineer', 'Software Engineer'];

function OrbitRing({ list, radius, reverse }) {
  return (
    <div className={`orbit${reverse ? ' rev' : ''}`}>
      {list.map(([name, deg, glyph, color]) => {
        const rad = (deg * Math.PI) / 180;
        const left = 50 + radius * Math.cos(rad);
        const top = 50 + radius * Math.sin(rad);
        return (
          <div
            key={name}
            className="node"
            style={{ left: `${left}%`, top: `${top}%`, '--nc': color, '--ncg': color + '99' }}
          >
            <span>{glyph}</span>
            <span className="tip">{name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const [text, setText] = useState('');
  const ri = useRef(0);
  const ci = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timer;
    const tick = () => {
      const word = roles[ri.current];
      ci.current += deleting.current ? -1 : 1;
      setText(word.slice(0, ci.current));
      let delay = deleting.current ? 45 : 90;
      if (!deleting.current && ci.current === word.length) { delay = 1300; deleting.current = true; }
      else if (deleting.current && ci.current === 0) { deleting.current = false; ri.current = (ri.current + 1) % roles.length; delay = 350; }
      timer = setTimeout(tick, delay);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="hero wrap" id="home">
      <div>
        <h1>Hi, I'm Muhammad Adeel</h1>
        <h2 className="role-line"><span className="type">{text}</span><span className="cursor">|</span></h2>
        <p className="desc">I design and build fast, scalable full‑stack applications with React, Node.js, Express and MongoDB — from idea to deployment.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="/#projects">View My Work</a>
          <a className="btn btn-ghost" href="/Adeel_CV.pdf" download>
            Download Resume
          </a>

          <a className="btn btn-ghost" href="/#contact">Let's Talk</a>
        </div>
        <div className="socials">
          <span className="social-ic disabled" aria-disabled="true">GH</span>
          <span className="social-ic disabled" aria-disabled="true">in</span>
          <span className="social-ic disabled" aria-disabled="true">✉</span>
          <span className="social-ic disabled" aria-disabled="true">WA</span>
        </div>
      </div>
      <div className="orbit-wrap">
        <div className="orbit-ring"></div>
        <div className="orbit-ring ring2"></div>
        <div className="center-profile">
          <picture>
            <source srcSet="/profile.webp" type="image/webp" />
            <img
              src="/profile.jpg"
              alt="Muhammad Adeel"
              width="640"
              height="853"
              fetchpriority="high"
              decoding="async"
            />
          </picture>
        </div>
        <OrbitRing list={techA} radius={50} />
        <OrbitRing list={techB} radius={35} reverse />
      </div>
    </header>
  );
}

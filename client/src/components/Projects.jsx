import React, { useState } from 'react';
import useReveal from '../hooks/useReveal.js';
import { projects, ICONS } from '../data/projectsData.js';

const filters = [
  ['all', 'All'], ['fullstack', 'Full Stack'], ['react', 'React / API'],
  ['frontend', 'Frontend'], ['ai', 'AI'],
];

export default function Projects() {
  const ref = useReveal();
  const [active, setActive] = useState('all');
  const list = projects
    .filter((p) => active === 'all' || p.c === active)
    .sort((a, b) => (b.feat ? 1 : 0) - (a.feat ? 1 : 0));

  return (
    <section id="projects" ref={ref}>
      <div className="wrap">
        <div className="sec-head reveal"><h2>Projects</h2><p>A selection of full‑stack and frontend builds.</p></div>
        <div className="filters reveal">
          {filters.map(([key, label]) => (
            <button
              key={key}
              className={`filter-btn${active === key ? ' active' : ''}`}
              onClick={() => setActive(key)}
            >{label}</button>
          ))}
        </div>
        <div className="proj-grid reveal">
          {list.map((p) => (
            <div className={`card${p.feat ? ' featured' : ''}`} key={p.t}>
              <div className="card-img" style={{ background: `linear-gradient(${p.grad})` }}>
                {p.feat && <span className="badge">Featured Project</span>}
                <span className="ico" dangerouslySetInnerHTML={{ __html: ICONS[p.ico] }} />
              </div>
              <div className="card-body">
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <div className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                <div className="card-actions">
                  <span className="disabled-link" aria-disabled="true">GitHub</span>
                  <span className="disabled-link" aria-disabled="true">View Details</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

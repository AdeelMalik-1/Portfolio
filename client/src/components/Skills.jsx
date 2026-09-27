import React from 'react';
import useReveal from '../hooks/useReveal.js';

const groups = [
  {
    title: 'Frontend',
    icon: '🎨',
    items: [
      { name: 'React.js', pct: 92, color: '#61DAFB' },
      { name: 'JavaScript', pct: 88, color: '#F7DF1E' },
      { name: 'Tailwind CSS', pct: 85, color: '#38BDF8' },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    items: [
      { name: 'Node.js', pct: 86, color: '#4ADE80' },
      { name: 'Express.js', pct: 84, color: '#A1A1AA' },
      { name: 'REST APIs', pct: 80, color: '#22D3EE' },
    ],
  },
  {
    title: 'Database',
    icon: '🗄️',
    items: [
      { name: 'MongoDB', pct: 82, color: '#47A248' },
      { name: 'Mongoose', pct: 80, color: '#C084FC' },
    ],
  },
  {
    title: 'Tools',
    icon: '🛠️',
    items: [
      { name: 'Git & GitHub', pct: 90, color: '#FB923C' },
      { name: 'Postman', pct: 78, color: '#F472B6' },
    ],
  },
];

export default function Skills() {
  const ref = useReveal();
  return (
    <section id="skills" ref={ref}>
      <div className="wrap">
        <div className="sec-head reveal"><h2>Skills</h2><p>Tools and technologies I use to ship full‑stack products.</p></div>
        <div className="skill-groups reveal">
          {groups.map((g) => (
            <div className="skill-card" key={g.title}>
              <h3><span className="skill-card-ico">{g.icon}</span>{g.title}</h3>
              {g.items.map((it, i) => (
                <div className="skill-item" key={it.name} style={{ '--delay': `${i * 0.14}s` }}>
                  <div className="skill-item-top">
                    <span className="skill-name">{it.name}</span>
                    <span className="skill-pct" style={{ color: it.color }}>{it.pct}%</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ '--pct': `${it.pct}%`, '--bc': it.color }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import useReveal from '../hooks/useReveal.js';

const services = [
  { title: 'MERN Stack Development', desc: 'End-to-end apps built on React, Node, Express and MongoDB.', icon: '🧩', color: '#3B82F6', bg: 'rgba(59,130,246,.15)' },
  { title: 'React.js Development', desc: 'Fast, component-driven interfaces with clean state management.', icon: '⚛️', color: '#22D3EE', bg: 'rgba(34,211,238,.15)' },
  { title: 'REST API Development', desc: 'Secure, documented APIs built for scale and easy integration.', icon: '🔌', color: '#8B5CF6', bg: 'rgba(139,92,246,.15)' },
  { title: 'MongoDB Database Design', desc: 'Schemas and queries designed for performance and clarity.', icon: '🗄️', color: '#22C55E', bg: 'rgba(34,197,94,.15)' },
  { title: 'Third-Party API Integration', desc: 'Connecting payments, maps, auth and other external services into your app.', icon: '🔗', color: '#F59E0B', bg: 'rgba(245,158,11,.15)' },
  { title: 'Performance Optimization', desc: 'Faster load times, cleaner rendering and better Core Web Vitals.', icon: '⚡', color: '#EAB308', bg: 'rgba(234,179,8,.15)' },
  { title: 'UI to Code Conversion', desc: 'Turning Figma or design mockups into pixel-accurate, responsive UI.', icon: '🎨', color: '#EC4899', bg: 'rgba(236,72,153,.15)' },
  { title: 'Deployment & Hosting', desc: 'Shipping your app to production with a clean, repeatable deploy setup.', icon: '🚀', color: '#06B6D4', bg: 'rgba(6,182,212,.15)' },
];

export default function Services() {
  const ref = useReveal();
  return (
    <section id="services" ref={ref}>
      <div className="wrap">
        <div className="sec-head reveal"><h2>Services</h2><p>How I can help with your next product.</p></div>
        <div className="svc-grid reveal">
          {services.map((s) => (
            <div className="svc" key={s.title} style={{ '--sc': s.color, '--sbg': s.bg }}>
              <div className="svc-ico">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

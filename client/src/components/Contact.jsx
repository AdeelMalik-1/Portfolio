import React, { useState } from 'react';
import useReveal from '../hooks/useReveal.js';
import api from '../services/api.js';

export default function Contact({ showToast }) {
  const ref = useReveal();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // { type: 'ok'|'err', msg }
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      await api.post('/contact', form);
      setStatus({ type: 'ok', msg: "Message sent — I'll get back to you soon." });
      showToast && showToast('Email sent!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not send — is the server running?';
      setStatus({ type: 'err', msg });
      showToast && showToast('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={ref}>
      <div className="wrap contact-grid">
        <div className="reveal">
          <h2>Let's talk</h2>
          <p style={{ color: 'var(--muted)', margin: '10px 0 24px' }}>Have a project in mind? Send a message and I'll get back to you.</p>
          <div className="info-item"><b>Email</b><a href="mailto:adeelfreelancer2@gmail.com">adeelfreelancer2@gmail.com</a></div>
          <div className="info-item"><b>Phone</b><a href="tel:+923253210122">0325-3210122</a></div>
          <div className="info-item"><b>Location</b><span>Sadiqabad, Punjab, Pakistan</span></div>
        </div>
        <form className="reveal" onSubmit={onSubmit}>
          <div className="row2">
            <input required name="name" placeholder="Your name" value={form.name} onChange={onChange} />
            <input required type="email" name="email" placeholder="Your email" value={form.email} onChange={onChange} />
          </div>
          <input required name="subject" placeholder="Subject" value={form.subject} onChange={onChange} />
          <textarea required name="message" placeholder="Your message" value={form.message} onChange={onChange}></textarea>
          {status && <div className={`formmsg ${status.type === 'ok' ? 'ok' : 'err'}`}>{status.msg}</div>}
          <button className="btn btn-primary" type="submit" style={{ justifySelf: 'start' }} disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}

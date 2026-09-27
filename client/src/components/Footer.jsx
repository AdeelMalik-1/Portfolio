import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="f-grid">
          <div className="f-brand">
            <div className="logo">Muhammad<span>.</span>Adeel</div>
            <p>Full Stack Developer building fast, scalable products with React, Node.js, Express and MongoDB.</p>
            <div className="f-social">
              <span className="social-ic disabled" aria-disabled="true">GH</span>
              <span className="social-ic disabled" aria-disabled="true">in</span>
              <span className="social-ic disabled" aria-disabled="true">✉</span>
              <span className="social-ic disabled" aria-disabled="true">WA</span>
            </div>
          </div>
          <div className="f-col"><h4>Navigate</h4>
            <a href="/#home">Home</a><a href="/#about">About</a><a href="/#skills">Skills</a><a href="/#projects">Projects</a>
          </div>
          <div className="f-col"><h4>More</h4>
            <a href="/#services">Services</a><a href="/#contact">Contact</a><span className="disabled-link" aria-disabled="true">Resume</span>
          </div>
          <div className="f-col"><h4>Contact</h4>
            <a href="mailto:adeelfreelancer2@gmail.com">adeelfreelancer2@gmail.com</a><span>Sadiqabad, Punjab, Pakistan</span>
          </div>
        </div>
        <div className="f-bottom">
          <span className="f-spacer" aria-hidden="true"></span>
          <div>© 2026 Muhammad Adeel. All Rights Reserved.</div>
          <a className="totop" href="/#home" aria-label="Back to top">↑</a>
        </div>
      </div>
    </footer>
  );
}

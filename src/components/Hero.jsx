import { useState, useEffect } from 'react';
import { personal } from '../data';

const roles = [
  'CSIT Student',
  'Web Developer',
  'Explorer',
  'Learner',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 80);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      }, 45);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex(r => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center grid-bg overflow-hidden"
      style={{
backgroundImage: `url(${process.env.PUBLIC_URL + "/img4.jpeg"})`,
    backgroundSize: 'cover',
      backgroundPosition: 'left',

  }}
    >
     {/* Ambient blobs */}
      <div
        className="blob1 absolute rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, #00F5A0 0%, transparent 70%)',
          top: '-100px',
          right: '-100px',
        }}
      />
       <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'rgba(8, 10, 15, 0.75)',
      zIndex: 0,
      
    }}
  />
      <div
        className="blob2 absolute rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, #0066FF 0%, transparent 70%)',
          bottom: '-80px',
          left: '-80px',
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, var(--bg) 100%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 font-mono text-xs tracking-widest border"
            style={{
              background: 'rgba(0,245,160,0.06)',
              borderColor: 'rgba(0,245,160,0.2)',
              color: 'var(--accent)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--accent)', animation: 'pulse 2s infinite' }}
            />
            Available now
          </div>

          {/* Name */}
          <h1
            className="font-mono font-bold leading-none mb-4"
            style={{
              fontSize: 'clamp(42px, 8vw, 88px)',
              letterSpacing: '-0.04em',
              color: 'var(--text)',
            }}
          >
            {personal.name.split(' ')[0]}{' '}
            <span style={{ color: 'var(--accent)' }}>
              {personal.name.split(' ')[1]}
            </span>
            <span style={{ color: 'var(--accent)' }}></span>
          </h1>

          {/* Typewriter */}
          <div className="flex items-center gap-3 mb-6" style={{ minHeight: '40px' }}>
            <span
              className="font-mono font-bold"
              style={{ fontSize: 'clamp(18px, 3vw, 26px)', color: 'var(--muted)' }}
            >
              {displayed}
              <span className="cursor" />
            </span>
          </div>

          {/* Bio snippet */}
          <p
            className="font-mono text-sm leading-relaxed mb-10 max-w-xl"
            style={{ color: 'var(--muted)', lineHeight: '1.9' }}
          >
            {personal.bio[0]}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <button
              onClick={() => scrollTo('projects')}
              className="glow-accent px-7 py-3.5 rounded-xl font-mono font-bold text-sm tracking-wider transition-all duration-200"
              style={{ background: 'var(--accent)', color: '#000' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
            >
              View Projects →
            </button>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 rounded-xl font-mono font-bold text-sm tracking-wider border transition-all duration-200"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(0,245,160,0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = '';
              }}
            >
              GitHub ↗
            </a>
          </div>
          

        </div>
      </div>


      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
      `}</style>
    </section>
  );
}

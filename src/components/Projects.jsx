import { useEffect, useRef } from 'react';
import { projects } from '../data';

const statusConfig = {
  done:    { label: 'Live',        color: '#00F5A0', bg: 'rgba(0,245,160,0.08)'  },
  wip:     { label: 'In Progress', color: '#FBBF24', bg: 'rgba(251,191,36,0.08)' },
  planned: { label: 'Planned',     color: '#6B7280', bg: 'rgba(107,114,128,0.1)' },
};

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const cfg = statusConfig[project.status];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            if (ref.current) {
              ref.current.style.opacity = '1';
              ref.current.style.transform = 'translateY(0)';
            }
          }, index * 120);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="project-card rounded-2xl border p-6 flex flex-col"
      style={{
        borderColor: 'var(--border)',
        background: 'var(--card)',
        opacity: 0,
        transform: 'translateY(28px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Status badge */}
      <div className="flex justify-between items-start mb-4">
        <span
          className="px-3 py-1 rounded-full font-mono text-xs font-bold"
          style={{ background: cfg.bg, color: cfg.color }}
        >
          ● {cfg.label}
        </span>
        <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
          {project.year}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-mono font-bold text-lg mb-2"
        style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
      >
        {project.title}
      </h3>

      {/* Desc */}
      <p
        className="font-mono text-xs leading-relaxed mb-5 flex-1"
        style={{ color: 'var(--muted)', lineHeight: '1.8' }}
      >
        {project.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map(t => (
          <span
            key={t}
            className="px-2.5 py-1 rounded-md font-mono text-xs"
            style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--muted)', border: '1px solid var(--border)' }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 rounded-xl font-mono text-xs font-bold text-center border transition-all duration-200"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,160,0.4)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
          >
            GitHub ↗
          </a>
        ) : (
          <div
            className="flex-1 py-2.5 rounded-xl font-mono text-xs text-center border"
            style={{ borderColor: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.15)' }}
          >
            — No repo yet —
          </div>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 rounded-xl font-mono text-xs font-bold text-center transition-all duration-200"
            style={{ background: 'rgba(0,245,160,0.1)', color: 'var(--accent)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,245,160,0.18)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,245,160,0.1)'}
          >
            Live Demo →
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" style={{ background: 'var(--surface)', padding: '120px 0' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal">
          {/* Label */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
              PROJECTS
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <div className="flex flex-wrap justify-between items-end gap-4 mb-16">
            <h2
              className="font-mono font-bold"
              style={{ fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.03em' }}
            >
              What I've <span style={{ color: 'var(--accent)' }}>built</span>
            </h2>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={i} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { personal, education } from '../data';

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" style={{ background: 'var(--surface)', padding: '120px 0' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
            ABOUT
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <h2
            className="font-mono font-bold mb-16"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.03em' }}
          >
            A bit about{' '}
            <span style={{ color: 'var(--accent)' }}>me</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: bio */}
            <div>
              {/* Avatar placeholder */}
              <div
                className="w-32 h-32 rounded-2xl mb-8 flex items-center justify-center font-mono font-bold text-3xl border-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,160,0.1), rgba(0,102,255,0.1))',
                  borderColor: 'rgba(0,245,160,0.2)',
                  color: 'var(--accent)',
                }}
              >
                <img src="/img3.jpeg" alt="Avatar" className="w-full h-full rounded-2xl" />
              </div>

              {personal.bio.map((p, i) => (
                <p
                  key={i}
                  className="font-mono text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--muted)', lineHeight: '1.9' }}
                >
                  {p}
                </p>
              ))}


              {/* Interests */}
              <div className="mt-6 flex flex-wrap gap-2">
                {personal.interests.map(i => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full font-mono text-xs border"
                    style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: quick facts + education */}
            <div className="flex flex-col gap-10">
              

              {/* Education */}
              <div>
                <h3
                  className="font-mono font-bold text-sm tracking-widest mb-4"
                  style={{ color: 'var(--accent)' }}
                >
                  EDUCATION
                </h3>
                <div className="flex flex-col gap-4">
                  {education.map((e, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border"
                      style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-mono font-bold text-sm" style={{ color: 'var(--text)' }}>
                          {e.degree}
                        </span>
                        <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                          {e.period}
                        </span>
                      </div>
                      <div className="font-mono text-xs mb-2" style={{ color: 'var(--accent)' }}>
                        {e.school}
                      </div>
                      <div className="font-mono text-xs" style={{ color: 'var(--muted)', lineHeight: '1.7' }}>
                        {e.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

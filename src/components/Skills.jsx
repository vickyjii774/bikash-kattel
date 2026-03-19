import { useEffect, useRef, useState } from 'react';
import { skills } from '../data';

function SkillBar({ name, level, delay, visible }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-xs" style={{ color: 'var(--text)' }}>{name}</span>
        
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: '5px', background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="h-full rounded-full skill-bar-fill"
          style={{
            width: visible ? `${level}%` : '0%',
            background: `linear-gradient(90deg, var(--accent), var(--accent2))`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

const categories = [...new Set(skills.map(s => s.category))];

const categoryIcons = {
  'Languages': '{ }',
  'Web': '</> ',
  'Database & Tools': '⚙',
};

export default function Skills() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" style={{ padding: '120px 0' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal">
          {/* Label */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
             SKILLS & Endorsements
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <h2
            className="font-mono font-bold mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.03em' }}
          >
            Tools I <span style={{ color: 'var(--accent)' }}>know</span>
          </h2>

          <p className="font-mono text-sm mb-16" style={{ color: 'var(--muted)' }}>
            Self-assessed levels — honest approximations, always growing.
          </p>

          {/* Skill categories grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {categories.map((cat, ci) => (
              <div
                key={cat}
                className="p-6 rounded-2xl border"
                style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center font-mono text-sm font-bold"
                    style={{ background: 'rgba(0,245,160,0.08)', color: 'var(--accent)' }}
                  >
                    {categoryIcons[cat] || '#'}
                  </span>
                  <span
                    className="font-mono font-bold text-xs tracking-widest uppercase"
                    style={{ color: 'var(--text)' }}
                  >
                    {cat}
                  </span>
                </div>

                {skills
                  .filter(s => s.category === cat)
                  .map((s, i) => (
                    <SkillBar
                      key={s.name}
                      name={s.name}
                      level={s.level}
                      delay={ci * 100 + i * 80}
                      visible={visible}
                    />
                  ))}
              </div>
            ))}
          </div>

          {/* Note card */}
          <div
            className="p-5 rounded-2xl border flex flex-wrap items-center gap-4"
            style={{
              borderColor: 'rgba(0,102,255,0.2)',
              background: 'rgba(0,102,255,0.04)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: 'rgba(0,102,255,0.1)' }}
            >
            📈
            </div>
            <div>
              <p className="font-mono font-bold text-sm" style={{ color: 'var(--text)' }}>
                Always leveling up
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



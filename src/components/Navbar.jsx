import { useState, useEffect } from 'react';
import { personal } from '../data';

const links = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = links.map(l => document.getElementById(l.toLowerCase()));
      const current = sections.findIndex(s => {
        if (!s) return false;
        const rect = s.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current !== -1) setActive(links[current]);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const close = (e) => {
      if (menuOpen && !e.target.closest('nav') && !e.target.closest('.mobile-nav')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth',block: 'start' });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || menuOpen ? 'rgba(8,10,15,0.95)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div
          className="mx-auto h-16 flex items-center justify-between"
          style={{ padding: '0 20px', maxWidth: '1152px' }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo('Home')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '7px',
                border: '1px solid rgba(0,245,160,0.3)',
                background: 'rgba(0,245,160,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <img
                src="/img1.jpeg"
                alt="Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </span>
            <span
              className="font-mono font-bold text-sm"
              style={{ color: 'var(--text)', whiteSpace: 'nowrap' }}
            >
              {personal.nickname}
              <span style={{ color: 'var(--accent)' }}></span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className={`nav-link font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${active === l ? 'active' : ''}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: active === l ? 'var(--accent)' : 'var(--muted)',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          
        

        <button
  onClick={() => setMenuOpen(o => !o)}
  aria-label="Menu"
  style={{
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  }}
  className="md:hidden"
>
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: 'var(--text)',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: 'var(--text)',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: 'var(--text)',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '',
              }}
            />
          </button>
        </div>
      </nav>


        
      {/* Mobile Menu — controlled purely by React state */}
<div
  style={{
    display: menuOpen ? 'block' : 'none',
    position: 'fixed',
    top: '64px',
    left: 0,
    right: 0,
    width: '100%',
    background: 'rgba(8,10,15,0.98)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border)',
    zIndex: 90,
  }}
>
  {links.map((l, i) => (
    <button
      key={l}
      onClick={() => scrollTo(l)}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '14px 24px',
        background: 'none',
        border: 'none',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: '14px',
        letterSpacing: '0.05em',
        color: active === l ? 'var(--accent)' : 'var(--text)',
      }}
    >
      <span style={{ color: 'var(--accent)', marginRight: '12px', fontSize: '11px' }}>
        
      </span>
      {l}
    </button>
  ))}
 
</div>
    </>
  );
}
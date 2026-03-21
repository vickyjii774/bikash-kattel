import { personal } from '../data';

export default function Footer() {
  return (
    <footer
      className="border-t py-8 px-6"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' ,textAlign: 'center' }}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center ">
        <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
          © {new Date().getFullYear()}{' '}
          <span style={{ color: 'var(--accent)' }}>{personal.name}</span>
          {' '}- Kathmandu , Nepal
        </span>
        
      </div>
    </footer>
  );
}

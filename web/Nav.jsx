// Field Service Nerd — Nav. Control-room dark bar: signal mark + wordmark,
// page links, theme toggle, and the Join CTA.
const { Button } = window.FSN;

function Nav({ onJoin, theme, onToggleTheme }) {
  const link = { color: 'var(--paper)', fontWeight: 500, fontSize: 14, textDecoration: 'none', fontFamily: 'var(--font-body)', opacity: 0.82 };
  const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '';
  return (
    <nav data-theme="dark" style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(24,21,16,.93)', backdropFilter: 'var(--blur-nav)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '12px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" className="fsn-brand" style={{ display: 'inline-flex', alignItems: 'center', flex: 'none', textDecoration: 'none' }}>
          <img src="assets/fsn-logo-patch.png" alt="Field Service Nerd" style={{ height: 48, width: 'auto', display: 'block' }} />
        </a>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <a href={isHome ? '#podcast' : '/#podcast'} className="navlink nav-hide" style={link}>Podcast</a>
          <a href="/consulting" className="navlink nav-hide" style={link}>Consulting</a>
          <a href="/about" className="navlink nav-hide" style={link}>About</a>

          <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle light and dark" style={{ color: 'var(--paper)' }}>
            <span style={{ fontSize: 13 }}>{theme === 'light' ? '☾' : '☀'}</span>
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <Button variant="primary" size="sm" as="a" href={isHome ? '#join' : '/#join'} onClick={isHome ? onJoin : undefined}>
            Get the Brief
          </Button>
        </div>
      </div>
    </nav>
  );
}
window.Nav = Nav;

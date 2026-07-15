// Field Service Nerd — Hero (control-room dark) + trust bar.
const { Button, Eyebrow, Pill } = window.FSN;

function Hero({ onJoin }) {
  return (
    <header id="top" data-theme="dark" style={{
      position: 'relative', overflow: 'hidden', color: 'var(--paper)',
      background: 'var(--hero-ground)', minHeight: 600,
      display: 'flex', alignItems: 'center', padding: '84px 0',
    }}>
      <div className="dot-grid" aria-hidden="true"></div>
      <div className="control-glow" aria-hidden="true"></div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--content-pad-x)' }}>
        <div style={{ maxWidth: 720 }}>
          <Eyebrow>Field Service // D365 · AI · Scheduling</Eyebrow>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-hero)',
            lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-hero)',
            margin: '18px 0 0', color: 'var(--paper)',
          }}>
            Field Service,<br />without the <span style={{ color: 'var(--orange)' }}>guesswork.</span>
          </h1>
          <div className="draw-rule" style={{ marginTop: 20 }}></div>
          <p style={{ color: 'var(--paper)', opacity: .82, fontSize: 'var(--text-lg)', margin: '24px 0 30px', maxWidth: 560, lineHeight: 1.6 }}>
            The knowledge base, podcast, and field notes for the people who run Dynamics 365
            Field Service | the AI, the scheduling, and the architecture that actually holds
            up in production. Written by a 30-year practitioner and ex-Microsoft Field Service
            Global Black Belt.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary" as="a" href="#join" onClick={onJoin}>Get the AI Primer →</Button>
            <Button variant="ghost" as="a" href="/kb">Browse the Knowledge Base →</Button>
          </div>
          <div style={{ marginTop: 26, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Pill>Ex-Microsoft GBB</Pill>
            <Pill>D365 Field Service since 2002</Pill>
            <Pill tone="signal">IoT · RSO · Copilot</Pill>
          </div>
        </div>
      </div>
    </header>
  );
}

function TrustBar() {
  const item = (n, t) => (
    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: 'var(--paper)', display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
      <b style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 15, letterSpacing: '.02em' }}>{n}</b>
      <span style={{ opacity: .82 }}>{t}</span>
    </span>
  );
  return (
    <div data-theme="dark" style={{ background: 'var(--navy-ink)', padding: '16px 0', fontSize: 14, borderBottom: '1px solid rgba(var(--cyan-rgb), .16)' }}>
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--content-pad-x)', display: 'flex', gap: 34, justifyContent: 'center', flexWrap: 'wrap' }}>
        {item('30+ yrs', 'in field service')}
        {item('Ex-Microsoft', 'Global Black Belt')}
        {item('D365 · RSO · IoT', 'production-grade')}
        {item('Since 2002', 'enterprise CRM')}
      </div>
    </div>
  );
}
window.Hero = Hero;
window.TrustBar = TrustBar;

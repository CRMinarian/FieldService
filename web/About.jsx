// Field Service Nerd — About page: Pierre Hulsebus bio + credentials.
const { Button, Eyebrow, SectionHead, Section } = window.FSN;

function AboutHero() {
  return (
    <header data-theme="dark" style={{ position: 'relative', overflow: 'hidden', background: 'var(--hero-ground)', padding: '88px 24px 78px', textAlign: 'center', color: 'var(--paper)' }}>
      <div className="dot-grid" aria-hidden="true"></div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'inline-flex' }}><Eyebrow>The Practitioner</Eyebrow></div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-4xl)', lineHeight: 1.02, letterSpacing: 'var(--tracking-hero)', color: 'var(--paper)', margin: '16px 0 0' }}>
          30 years in the field.<br /><span style={{ color: 'var(--orange)' }}>One knowledge base.</span>
        </h1>
        <p style={{ color: 'var(--text-on-dark-muted)', fontSize: 18, lineHeight: 1.6, maxWidth: 540, margin: '18px auto 0' }}>
          Pierre Hulsebus spent three decades in enterprise field service | and built Field Service
          Nerd to put the real playbook online, without the vendor gloss.
        </p>
      </div>
    </header>
  );
}

function AboutCredentials() {
  const item = (n, t) => (
    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: 'var(--paper)', display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
      <b style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 15 }}>{n}</b>
      <span style={{ opacity: .82 }}>{t}</span>
    </span>
  );
  return (
    <div data-theme="dark" style={{ background: 'var(--navy-ink)', padding: '16px 0', borderBottom: '1px solid rgba(var(--cyan-rgb), .16)' }}>
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--content-pad-x)', display: 'flex', gap: 34, justifyContent: 'center', flexWrap: 'wrap', fontSize: 14 }}>
        {item('Ex-Microsoft', 'Director & Global Black Belt')}
        {item('D365', 'Field Service')}
        {item('Power Platform · RSO · IoT', 'connected field service')}
        {item('Since 2002', 'enterprise CRM')}
      </div>
    </div>
  );
}

function AboutBio() {
  return (
    <Section>
      <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, alignItems: 'start' }}>
        <div>
          <div style={{ aspectRatio: '1 / 1', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-subtle)' }}>
            <img src="assets/pierre-headshot.jpg" alt="Pierre Hulsebus | Field Service Nerd" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          </div>
        </div>
        <div>
          <Eyebrow>Pierre Hulsebus</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text-strong)', lineHeight: 1.08, margin: '14px 0 22px' }}>
            Thirty years of scars.<br /><span style={{ color: 'var(--orange)' }}>Zero theater.</span>
          </h2>
          <div style={{ color: 'var(--text-body)', fontSize: 17, lineHeight: 1.75 }}>
            <p style={{ marginTop: 0 }}>I’ve worked in enterprise IT and sales for more than 30 years, and in CRM since 2002. As a Director and Global Black Belt at Microsoft, I owned Dynamics 365 Field Service | the deep technical seat enterprise teams called when a deployment was on the brink.</p>
            <p>Field Service is where it all converges: a pinging IoT sensor, a scheduling engine, a technician who carries more knowledge in their head than any manual holds. I’ve lived in that gap | the data model, RSO, Connected Field Service, the mobile and offline strategy, the dispatch and capacity planning that either holds up in production or quietly falls apart.</p>
            <p>Field Service Nerd exists because the knowledge you actually need is scattered across vendor decks, jargon walls, and outdated advice. So I’m putting the canonical version online | the lexicon, the frameworks, the AI reality check, the podcast | free, for the people who run this stuff.</p>
            <p>And when an implementation is broken, that’s the other half of what I do: fixed-fee engagements to diagnose it, architect it, or get it to go-live. No hourly meter. No demo theater.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <Button variant="primary" as="a" href="/kb">Open the Knowledge Base →</Button>
            <Button variant="ghost" as="a" href="/consulting">Work With Me →</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function AboutConnect() {
  const links = [
    { label: 'YouTube', href: 'https://www.youtube.com/@FieldServiceNerd', sub: '@FieldServiceNerd' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nukasoft', sub: '/in/nukasoft' },
    { label: 'Consulting', href: '/consulting', sub: 'Fixed-fee engagements' },
  ];
  return (
    <Section alt>
      <SectionHead eyebrow="Connect" title="Find Pierre" center />
      <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 40 }}>
        {links.map((l) => (
          <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '28px 20px', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--text-strong)' }}>{l.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-accent)' }}>{l.sub}</span>
          </a>
        ))}
      </div>
    </Section>
  );
}

window.AboutHero = AboutHero;
window.AboutCredentials = AboutCredentials;
window.AboutBio = AboutBio;
window.AboutConnect = AboutConnect;

// Field Service Nerd — homepage sections: pillars, lead magnet, podcast,
// consulting teaser, email capture, FAQ, footer.
const { Button, Eyebrow, Pill, SectionHead, Section } = window.FSN;

// Centralized outbound links — swap these as channels go live.
// PLAYLIST_ID drives every embed. NOTE: this id may have been clipped on paste
// (full YouTube playlist ids are ~34 chars) — if an embed shows "unavailable",
// replace it here with the full id and every embed updates.
const PLAYLIST_ID = 'PLD2JXXb9_ku0';
const LINKS = {
  playlist: `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`,
  embed: `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&rel=0&modestbranding=1`,
  linkedin: 'https://www.linkedin.com/in/nukasoft',
  // TODO: confirm the channel handle; the playlist link above is the safe fallback.
  youtube: 'https://www.youtube.com/@FieldServiceNerd',
};

// Firestore REST target — no SDK (avoids the module-timing bug).
// TODO: replace the key with the field-service-nerd Web API key from the Firebase console.
const FIRESTORE_PROJECT = 'field-service-nerd';
const FIRESTORE_KEY = 'AIzaSyDQhvniVSpGmlva9QrYKgBSOLXY-Yaq12A';

function Pillars() {
  const cols = [
    { tag: 'Signal', title: 'Podcast & Field Notes', body: 'Real deployments, the AI that actually ships, and the scheduling problems nobody warns you about. For the commute, the lab, the go-live weekend.', href: '#podcast', cta: 'Listen in' },
    { tag: 'Rescue', title: 'Consulting', body: 'When a Field Service implementation is months behind, over budget, or quietly being abandoned | the number you call. Fixed-fee, no theater.', href: '/consulting', cta: 'See engagements' },
  ];
  return (
    <Section id="learn">
      <SectionHead eyebrow="What this is" title="One site. Two signals." center
        sub="Field Service Nerd is the independent home for people who run field service operations. The audience content on one side, a hire-me path on the other." />
      <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, marginTop: 44, maxWidth: 820, marginLeft: 'auto', marginRight: 'auto' }}>
        {cols.map((c) => (
          <a key={c.tag} href={c.href} style={{
            display: 'flex', flexDirection: 'column', textDecoration: 'none',
            background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)', padding: '26px 24px 24px',
            position: 'relative', overflow: 'hidden',
          }}>
            <span className="data-mark" style={{ marginBottom: 14 }}>{c.tag}</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--text-strong)', margin: '0 0 10px', lineHeight: 1.1 }}>{c.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.6, margin: '0 0 18px', flex: 1 }}>{c.body}</p>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--color-accent)', letterSpacing: '.02em' }}>{c.cta} →</span>
          </a>
        ))}
      </div>
    </Section>
  );
}

function LeadMagnet({ onJoin }) {
  return (
    <Section alt>
      <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 48, alignItems: 'center' }}>
        <div>
          <Eyebrow>Free Download // The Primer</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-3xl)', color: 'var(--text-strong)', lineHeight: 1.08, letterSpacing: 'var(--tracking-tight)', margin: '14px 0 0' }}>
            The Field Service<br /><span style={{ color: 'var(--orange)' }}>AI Primer.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-md)', lineHeight: 1.65, margin: '18px 0 24px', maxWidth: 480 }}>
            What's real, what's hype, and where AI actually pays off in field service operations.
            Copilot, scheduling intelligence, IoT-triggered work, and the traps that burn budgets.
            A practitioner's field guide, not a vendor deck.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'grid', gap: 10 }}>
            {['Where Copilot earns its seat | and where it does not', 'Scheduling & RSO: the AI that ships vs. the demo', 'IoT-to-work-order: the pattern that actually holds', 'A buyer’s checklist you can defend to the board'].map((t) => (
              <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--text-body)', fontSize: 15 }}>
                <span style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: 14, marginTop: 1 }}>+</span>{t}
              </li>
            ))}
          </ul>
          <Button variant="primary" as="a" href="#join" onClick={onJoin}>Get the Primer →</Button>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{
            aspectRatio: '4 / 5', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(160deg, #353A32 0%, #2A2A2A 55%, #17140F 100%)',
            border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '30px 28px',
          }}>
            <div className="schematic" aria-hidden="true"></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="data-mark" style={{ color: 'var(--cyan)' }}>Field_Service_Nerd / primer.pdf</span>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 34, color: 'var(--paper)', lineHeight: 1.02, textTransform: 'none' }}>
                AI in<br />Field Service
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange)', marginTop: 12, letterSpacing: '.06em' }}>PRACTITIONER PRIMER · v1</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Podcast() {
  const bars = [10,18,30,22,44,58,40,26,52,64,46,30,20,36,54,62,48,34,24,42,56,50,38,28,16,26,40,58,46,32];
  return (
    <React.Fragment>
      <hr className="rule-divider" />
      <section id="podcast" data-theme="dark" style={{ position: 'relative', overflow: 'hidden', padding: '72px 0', background: 'var(--hero-ground)' }}>
        <div className="dot-grid" aria-hidden="true"></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--content-pad-x)', display: 'grid', gridTemplateColumns: '1fr .85fr', gap: 44, alignItems: 'center' }} className="hero-grid">
          <div>
            <Eyebrow>Listen // On Air</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-3xl)', lineHeight: 1.06, color: 'var(--paper)', margin: '14px 0 0' }}>The Field Service Nerd</h2>
            <div className="draw-rule" style={{ marginTop: 16 }}></div>
            <p style={{ color: 'var(--text-on-dark-muted)', fontSize: 17, margin: '18px 0 22px', maxWidth: 470, lineHeight: 1.6 }}>
              Real deployments, the AI that actually ships, and the scheduling problems nobody warns
              you about | plus guests from the field service trenches.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 42, marginBottom: 26 }}>
              {bars.map((h, i) => <i key={i} style={{ display: 'block', width: 4, borderRadius: 2, background: i % 3 === 0 ? 'var(--orange)' : 'var(--cyan)', opacity: .85, height: Math.round(h * 0.7) }}></i>)}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button variant="primary" as="a" href={LINKS.playlist} target="_blank" rel="noopener noreferrer">Watch Now →</Button>
              <Button variant="ghost" as="a" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">Live on LinkedIn →</Button>
            </div>
          </div>
          <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '4 / 4.2', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
            <img src="assets/pierre-headshot.jpg" alt="The Field Service Nerd | with Pierre Hulsebus" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <span style={{ position: 'absolute', left: 12, bottom: 12, display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(23,20,15,.72)', backdropFilter: 'blur(6px)', border: '1px solid rgba(var(--steel-rgb),.4)', color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 12, letterSpacing: '.06em', textTransform: 'uppercase', padding: '6px 11px', borderRadius: 'var(--radius-pill)' }}>
              <span className="status-dot"></span> On Air
            </span>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function Videos() {
  return (
    <Section id="videos">
      <SectionHead eyebrow="Watch // The Channel" title="Latest from the channel" center
        sub="Real deployments, the AI that actually ships, and the scheduling problems nobody warns you about | shown on screen." />
      <div style={{ maxWidth: 900, margin: '40px auto 0' }}>
        <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)', background: 'var(--navy-ink)' }}>
          <iframe
            src={LINKS.embed}
            title="Field Service Nerd | YouTube playlist"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
          ></iframe>
        </div>
        <p style={{ textAlign: 'center', marginTop: 28 }}>
          <Button variant="ghost" as="a" href={LINKS.playlist} target="_blank" rel="noopener noreferrer">See the Full Playlist on YouTube →</Button>
        </p>
      </div>
    </Section>
  );
}

function ConsultingTeaser() {
  return (
    <Section>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', background: 'var(--surface-card)', padding: '44px 40px' }}>
        <div className="schematic" aria-hidden="true"></div>
        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 32, alignItems: 'center' }} className="two-col">
          <div>
            <Eyebrow>Consulting // Project Rescue</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text-strong)', margin: '14px 0 12px', lineHeight: 1.1 }}>
              When the implementation is broken, this is the number you call.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: 520 }}>
              Architecture, project rescue, vendor selection, and training | fixed-fee engagements
              with a defined outcome and a defined price. No hourly meter. No scope creep.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <Button variant="primary" as="a" href="/consulting">See the Engagements →</Button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '.04em' }}>4 engagements · all fixed-fee</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function EmailSection() {
  const [firstName, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('idle'); // idle | loading | done | error
  const [msg, setMsg] = React.useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const clean = email.toLowerCase().trim();
      const name = firstName.trim();
      const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents/subscribers?key=${FIRESTORE_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              firstName: { stringValue: name },
              email:     { stringValue: clean },
              source:    { stringValue: 'website' },
              createdAt: { timestampValue: new Date().toISOString() },
            },
          }),
        }
      );
      if (!res.ok) throw new Error('Firestore write failed');
      setStatus('done');
      window.location.href = '/community';
    } catch {
      setStatus('error');
      setMsg('Something went wrong.  Try again.');
    }
  };

  const inputStyle = { flex: 1, minWidth: 200, padding: '13px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--surface-card)', color: 'var(--text-strong)', fontFamily: 'var(--font-body)', fontSize: 15, outline: 'none' };

  return (
    <section id="join" style={{ position: 'relative', overflow: 'hidden', padding: '80px 0', background: 'var(--surface-page)' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 var(--content-pad-x)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <span className="data-mark" style={{ justifyContent: 'center', display: 'inline-flex' }}>Free Access</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-3xl)', color: 'var(--text-strong)', lineHeight: 1.08, letterSpacing: 'var(--tracking-tight)', margin: '14px 0 14px' }}>
          Get the AI Primer +<br />the Field Notes
        </h2>
        <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 500, margin: '0 auto 32px' }}>
          Drop your email for the free Field Service AI Primer and the field notes list.
          No spam.  Unsubscribe anytime.
        </p>
        {status === 'done' ? (
          <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20 }}>✓ You're in | redirecting…</p>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', gap: 10, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap' }}>
            <input type="text" required placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ ...inputStyle, flex: '1 1 100%' }} />
            <input type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            <button type="submit" disabled={status === 'loading'} style={{ background: 'var(--color-accent)', color: 'var(--text-on-accent)', border: 'none', borderRadius: 'var(--radius-md)', padding: '13px 24px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: '.04em', cursor: status === 'loading' ? 'wait' : 'pointer', opacity: status === 'loading' ? .7 : 1 }}>
              {status === 'loading' ? '…' : 'Get Access →'}
            </button>
            {status === 'error' && <p style={{ width: '100%', color: 'var(--orange)', fontSize: 13, margin: '4px 0 0' }}>{msg}</p>}
          </form>
        )}
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: 'Who is Field Service Nerd for?', a: 'Field service architects, D365 practitioners, technical sellers, and operations leaders working at the intersection of AI and service operations. If you run Dynamics 365 Field Service | or you’re trying to | this is built for you.' },
    { q: 'Is the content free?', a: 'Yes. The AI primer, the podcast, and the field notes are free. The consulting track is the paid, hire-me path | separate from the audience content.' },
    { q: 'What does the consulting cover?', a: 'Four fixed-fee engagements: enterprise Field Service architecture, project rescue and recovery, RFP and vendor selection, and a leadership training program. Defined outcome, defined price, no hourly meter.' },
    { q: 'Who is behind it?', a: 'Pierre Hulsebus | 30+ years in IT and sales, former Microsoft Director and Global Black Belt for Dynamics 365 Field Service. Deep in D365 FS, Power Platform, RSO, IoT / Connected Field Service, and enterprise CRM since 2002.' },
    { q: 'Do you cover AI and Copilot specifically?', a: 'Constantly. The lead-magnet primer and the podcast dig into where Copilot and scheduling intelligence actually pay off in field service | and where they don’t.' },
  ];
  return (
    <Section alt>
      <SectionHead eyebrow="Questions" title="The short answers" center />
      <div style={{ maxWidth: 820, margin: '36px auto 0' }}>
        {items.map((it, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--border-subtle)', padding: '18px 0' }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 19, color: 'var(--text-strong)', lineHeight: 1.2 }}>
              {it.q}
              <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: 22, lineHeight: 1 }}>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <p style={{ color: 'var(--text-muted)', marginTop: 10, fontSize: 15.5, lineHeight: 1.65, maxWidth: 700 }}>{it.a}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer data-theme="dark" style={{ background: 'var(--navy-ink)', color: 'var(--text-on-dark-muted)', padding: '48px 0', textAlign: 'center', fontSize: 14, fontFamily: 'var(--font-body)', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--content-pad-x)' }}>
        <a href="#top" style={{ display: 'inline-block', marginBottom: 18, textDecoration: 'none' }}>
          <img src="assets/fsn-logo-patch.png" alt="Field Service Nerd" style={{ height: 74, width: 'auto', display: 'inline-block' }} />
        </a>
        <p style={{ margin: '0 0 8px' }}>
          <a href="/consulting" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>Consulting</a> ·{' '}
          <a href="/about" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>About</a> ·{' '}
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>YouTube</a> ·{' '}
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>LinkedIn</a>
        </p>
        <p style={{ marginTop: 8, fontSize: 12, opacity: .7, fontFamily: 'var(--font-mono)', letterSpacing: '.03em' }}>© Field Service Nerd · fieldservicenerd.com · Dynamics 365 Field Service, decoded.</p>
      </div>
    </footer>
  );
}

window.Pillars = Pillars;
window.LeadMagnet = LeadMagnet;
window.Podcast = Podcast;
window.Videos = Videos;
window.ConsultingTeaser = ConsultingTeaser;
window.EmailSection = EmailSection;
window.Faq = Faq;
window.Footer = Footer;

// Field Service Nerd — Consulting track. Ported from the retired scaffold's
// (already in-voice) copy, restyled to Signal & Grit.
const { Button, Eyebrow, Pill, SectionHead, Section } = window.FSN;

const CALENDLY = 'https://calendly.com/pierre-nukasoft';

const SERVICES = [
  {
    num: '01', tag: 'Architecture', title: 'Enterprise Field Service Architecture',
    body: 'Greenfield or replatform. I design the architecture that holds up at scale: data model, integration topology, mobile and offline strategy, dispatch and capacity planning. You get a defensible reference architecture and a sequenced roadmap.',
    price: '$18,000', label: '6 weeks · Fixed-fee',
  },
  {
    num: '02', tag: 'Project Rescue', title: 'Project Rescue & Recovery',
    body: 'When an implementation is months behind, over budget, or quietly being abandoned, I step in, diagnose what’s actually broken, and get it to go-live. Fixed fee, no surprises.',
    price: '$25,000', label: '8–12 weeks · Fixed-fee',
  },
  {
    num: '03', tag: 'Vendor Selection', title: 'RFP & Vendor Selection',
    body: 'I cut through the demo theater. Requirements built from your actual operation, a vendor shortlist that fits, scripted demos that test what matters, and a scored recommendation you can defend to the board.',
    price: '$12,000', label: '4 weeks · Fixed-fee',
  },
  {
    num: '04', tag: 'Training', title: 'Leadership Training Program',
    body: 'A working program for VPs of Service, COOs, and PMO leads who need to lead Field Service transformations without becoming an admin. Two days, no slides, hard questions.',
    price: '$9,500', label: '2 days · Fixed-fee',
  },
];

const STEPS = [
  { n: '01', title: 'Diagnose, on a call', body: 'A 60-minute working session. You walk me through what’s actually happening: the dashboards, the steering committee, the vendor emails. I tell you what I’m seeing. No deck, no follow-up sales call.' },
  { n: '02', title: 'Scope the engagement', body: 'If there’s a fit, I write a one-page engagement letter: outcome, fixed fee, dates. You sign it or you don’t. Half the time the diagnosis is the engagement.' },
  { n: '03', title: 'Get it done', body: 'I’m in your stand-ups, in your architecture sessions, in the config. At the end you have a working system, a defensible plan, or a recommendation — and no consultant retainer to unwind.' },
];

function ConsultHero() {
  return (
    <header data-theme="dark" style={{ position: 'relative', overflow: 'hidden', background: 'var(--hero-ground)', padding: '88px 0 76px', color: 'var(--paper)' }}>
      <div className="dot-grid" aria-hidden="true"></div>
      <div className="control-glow" aria-hidden="true"></div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--content-pad-x)' }}>
        <div style={{ maxWidth: 720 }}>
          <Eyebrow>Consulting // D365 Field Service</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-4xl)', lineHeight: 1.02, letterSpacing: 'var(--tracking-hero)', margin: '18px 0 0', color: 'var(--paper)' }}>
            Companies call when the implementation is <span style={{ color: 'var(--orange)' }}>broken.</span>
          </h1>
          <div className="draw-rule" style={{ marginTop: 20 }}></div>
          <p style={{ opacity: .82, fontSize: 'var(--text-lg)', margin: '24px 0 28px', maxWidth: 560, lineHeight: 1.6 }}>
            30 years in the field. Former Microsoft Global Black Belt for Dynamics 365 Field Service.
            I walk into rooms full of skeptical stakeholders, find what’s actually wrong, and get it
            to go-live. Four engagements. All fixed-fee.
          </p>
          <Button variant="primary" as="a" href="#book">Book a Diagnostic Call →</Button>
        </div>
      </div>
    </header>
  );
}

function ConsultServices() {
  return (
    <Section id="engagements">
      <SectionHead eyebrow="Services" title="Four engagements. All fixed-fee." center
        sub="No hourly rates. No scope creep. Each engagement is a defined outcome with a defined price. You know what you’re getting before we start." />
      <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, marginTop: 44 }}>
        {SERVICES.map((s) => (
          <div key={s.num} style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '26px 24px' }}>
            <span className="data-mark">{s.num} / {s.tag}</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--text-strong)', margin: '12px 0 10px', lineHeight: 1.12 }}>{s.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.6, margin: '0 0 20px', flex: 1 }}>{s.body}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--color-accent)' }}>{s.price}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '.02em' }}>{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ConsultApproach() {
  return (
    <Section alt>
      <SectionHead eyebrow="How I work" title="Three steps. No committee." center
        sub="Most consulting engagements start with a six-week discovery and end with a PDF. Mine start with a call and end with a working system." />
      <div className="step-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 44 }}>
        {STEPS.map((s) => (
          <div key={s.n} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '26px 24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 26, color: 'var(--cyan)', marginBottom: 12 }}>{s.n}</div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, color: 'var(--text-strong)', margin: '0 0 10px' }}>{s.title}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ConsultContact() {
  return (
    <section id="book" data-theme="dark" style={{ position: 'relative', overflow: 'hidden', background: 'var(--navy-ink)', padding: '80px 0', color: 'var(--paper)', textAlign: 'center' }}>
      <div className="schematic" aria-hidden="true"></div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto', padding: '0 var(--content-pad-x)' }}>
        <span className="data-mark" style={{ justifyContent: 'center', display: 'inline-flex' }}>Start Here</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-3xl)', color: 'var(--paper)', lineHeight: 1.06, margin: '14px 0 14px' }}>
          Book a diagnostic call
        </h2>
        <p style={{ color: 'var(--text-on-dark-muted)', fontSize: 17, lineHeight: 1.6, maxWidth: 520, margin: '0 auto 30px' }}>
          Sixty minutes. You walk me through what’s happening. I tell you what I’m seeing.
          No deck, no follow-up sales call. Half the time the diagnosis is the engagement.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" as="a" href={CALENDLY} target="_blank" rel="noopener noreferrer">Schedule the Call →</Button>
          <Button variant="ghost" as="a" href="mailto:infuseme@gmail.com?subject=Field%20Service%20consulting">Email Pierre</Button>
        </div>
      </div>
    </section>
  );
}

window.ConsultHero = ConsultHero;
window.ConsultServices = ConsultServices;
window.ConsultApproach = ConsultApproach;
window.ConsultContact = ConsultContact;

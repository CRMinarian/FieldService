// Field Service Nerd — Signal & Grit primitives.
// Loaded as the FIRST text/babel script on every page; exposes the shared
// component kit on window.FSN so page components can destructure it.
(function () {
  const e = React.createElement;

  // ---- Button — squared instrument control. variants: primary | ghost | data
  function Button({ variant = 'primary', size = 'md', as = 'button', children, style = {}, ...rest }) {
    const pad = size === 'sm' ? '9px 16px' : '13px 24px';
    const fs = size === 'sm' ? 13 : 14;
    const base = {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: fs,
      textTransform: 'uppercase', letterSpacing: '.04em',
      padding: pad, borderRadius: 'var(--radius-md)', cursor: 'pointer',
      textDecoration: 'none', border: '1px solid transparent', lineHeight: 1, whiteSpace: 'nowrap',
      transition: 'transform .15s var(--ease-out), background .15s var(--ease-out), box-shadow .15s var(--ease-out)',
    };
    const variants = {
      primary: { background: 'var(--color-accent)', color: 'var(--text-on-accent)', boxShadow: 'var(--shadow-glow-orange)' },
      ghost:   { background: 'transparent', color: 'var(--color-data)', borderColor: 'rgba(var(--cyan-rgb), .5)' },
      data:    { background: 'rgba(var(--cyan-rgb), .10)', color: 'var(--color-data)', borderColor: 'rgba(var(--cyan-rgb), .35)', fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase' },
      dark:    { background: 'var(--navy-ink)', color: 'var(--paper)', borderColor: 'var(--border-subtle)' },
    };
    return e(as, { style: { ...base, ...variants[variant], ...style }, ...rest }, children);
  }

  // ---- Eyebrow — monospace DATA kicker. The label arrives from the terminal.
  function Eyebrow({ children, style = {} }) {
    return e('div', {
      className: 'data-mark',
      style: { display: 'flex', alignItems: 'center', gap: 8, ...style },
    },
      e('span', { style: { width: 14, height: 1, background: 'currentColor', opacity: .7 } }),
      children
    );
  }

  // ---- Pill — small mono status pill.
  function Pill({ children, tone = 'data', style = {} }) {
    const c = tone === 'signal' ? 'var(--color-accent)' : 'var(--color-data)';
    const rgb = tone === 'signal' ? 'var(--orange-rgb)' : 'var(--cyan-rgb)';
    return e('span', {
      style: {
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
        letterSpacing: '.1em', textTransform: 'uppercase', color: c,
        border: `1px solid rgba(${rgb}, .35)`, borderRadius: 'var(--radius-pill)',
        padding: '5px 14px', ...style,
      },
    }, children);
  }

  // ---- SectionHead — eyebrow + display title + optional sub. center optional.
  function SectionHead({ eyebrow, title, sub, center = false, onDark = false }) {
    const titleColor = onDark ? 'var(--paper)' : 'var(--text-strong)';
    const subColor = onDark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)';
    return e('div', { style: { textAlign: center ? 'center' : 'left', maxWidth: center ? 720 : 'none', margin: center ? '0 auto' : 0 } },
      eyebrow && e(Eyebrow, { style: center ? { justifyContent: 'center' } : {} }, eyebrow),
      e('h2', {
        style: {
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'var(--text-3xl)', lineHeight: 'var(--leading-tight)',
          letterSpacing: 'var(--tracking-tight)', color: titleColor, margin: '14px 0 0',
        },
      }, title),
      e('div', { className: 'draw-rule' + (center ? ' center' : ''), style: { marginTop: 16 } }),
      sub && e('p', {
        style: { color: subColor, fontSize: 'var(--text-md)', lineHeight: 1.6, margin: '18px 0 0', maxWidth: 620, marginLeft: center ? 'auto' : 0, marginRight: center ? 'auto' : 0 },
      }, sub)
    );
  }

  // ---- Section — standard content container with vertical rhythm.
  function Section({ id, alt = false, children, style = {} }) {
    return e('section', {
      id,
      style: { padding: 'var(--section-pad-y) 0', background: alt ? 'var(--surface-page-alt)' : 'var(--surface-page)', ...style },
    },
      e('div', { style: { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--content-pad-x)' } }, children)
    );
  }

  window.FSN = { Button, Eyebrow, Pill, SectionHead, Section };
  // Also expose individually for convenience.
  window.SectionHead = SectionHead;
})();

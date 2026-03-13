const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "₹50L+", label: "Rewards Paid" },
  { value: "4", label: "Task Types" },
  { value: "100%", label: "Free to Join" },
];

const features = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path
          d="M2 13s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Sponsored Clicks",
    desc: "Click on advertiser links and earn per verified engagement. Simple, fast, no skills required.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
      </svg>
    ),
    title: "Watch Video Ads",
    desc: "Watch short promotional videos from brands and get credited instantly after completion.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Surveys & Campaigns",
    desc: "Share opinions, interact with brand campaigns, and earn for every verified action you take.",
  },
];

export default function Page() {
  return (
    <div style={styles.root}>
      <style>{css}</style>

      {/* Nav */}
      <nav style={styles.nav}>
        <span style={styles.logo}>Lets Click It</span>
        <div style={styles.navLinks}>
          <a href="#" style={styles.navLink}>
            How it works
          </a>
          <a href="#" style={styles.navLink}>
            Earn
          </a>
          <a href="/login" style={styles.navCta}>
            Sign in →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.badge} className="fade-up">
          <span style={styles.badgeDot} />
          Trusted by 10,000+ earners
        </div>
        <h1 style={styles.h1} className="fade-up delay-1">
          Turn your clicks
          <br />
          into real rewards.
        </h1>
        <p style={styles.sub} className="fade-up delay-2">
          Complete simple online tasks — click links, watch ads, take surveys —
          and earn money from anywhere, anytime. Free to join. Instant payouts.
        </p>
        <div style={styles.ctas} className="fade-up delay-3">
          <a href="/register" style={styles.btnPrimary}>
            Start earning free
          </a>
          <a href="#" style={styles.btnGhost}>
            See how it works
          </a>
        </div>
      </section>

      {/* Stats */}
      <div style={styles.statsRow} className="fade-up delay-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              ...styles.stat,
              borderRight: i < stats.length - 1 ? "1px solid #e8e5e0" : "none",
            }}
          >
            <span style={styles.statVal}>{s.value}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Features */}
      <section style={styles.features}>
        {features.map((f, i) => (
          <div
            key={f.title}
            style={styles.card}
            className={`fade-up delay-${i + 5}`}
          >
            <div style={styles.cardIcon}>{f.icon}</div>
            <h3 style={styles.cardTitle}>{f.title}</h3>
            <p style={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} Lets Click It ·{" "}
        <a href="/privacy" style={styles.footerLink}>
          Privacy
        </a>{" "}
        ·{" "}
        <a href="/terms" style={styles.footerLink}>
          Terms
        </a>
      </footer>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up          { animation: fadeUp 0.55s ease both; }
  .delay-1          { animation-delay: 0.08s; }
  .delay-2          { animation-delay: 0.16s; }
  .delay-3          { animation-delay: 0.24s; }
  .delay-4          { animation-delay: 0.32s; }
  .delay-5          { animation-delay: 0.40s; }
  .delay-6          { animation-delay: 0.48s; }
  .delay-7          { animation-delay: 0.56s; }

  a { text-decoration: none; }
`;

const styles = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#f9f8f6",
    color: "#1a1a1a",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nav: {
    width: "100%",
    maxWidth: 960,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "22px 24px",
  },
  logo: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 22,
    color: "#1a1a1a",
    letterSpacing: "-0.3px",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 28,
  },
  navLink: {
    fontSize: 14,
    color: "#555",
    fontWeight: 400,
    transition: "color 0.15s",
  },
  navCta: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: 500,
    borderBottom: "1px solid #1a1a1a",
    paddingBottom: 1,
  },
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "72px 24px 48px",
    maxWidth: 680,
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    fontSize: 12,
    fontWeight: 500,
    color: "#4a7c59",
    background: "#eaf3ec",
    border: "1px solid #c6dfc9",
    borderRadius: 99,
    padding: "4px 12px",
    marginBottom: 28,
    letterSpacing: "0.01em",
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#4a7c59",
  },
  h1: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(40px, 7vw, 64px)",
    lineHeight: 1.1,
    letterSpacing: "-1.5px",
    color: "#0f0f0f",
    marginBottom: 20,
  },
  sub: {
    fontSize: 17,
    color: "#666",
    lineHeight: 1.6,
    fontWeight: 300,
    maxWidth: 460,
    marginBottom: 36,
  },
  ctas: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  btnPrimary: {
    background: "#1a1a1a",
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
    padding: "11px 24px",
    borderRadius: 8,
    letterSpacing: "0.01em",
    fontFamily: "'DM Sans', sans-serif",
  },
  btnGhost: {
    background: "transparent",
    color: "#1a1a1a",
    fontSize: 14,
    fontWeight: 500,
    padding: "11px 24px",
    borderRadius: 8,
    border: "1px solid #d8d8d8",
    fontFamily: "'DM Sans', sans-serif",
  },
  statsRow: {
    display: "flex",
    gap: 0,
    background: "#fff",
    border: "1px solid #e8e5e0",
    borderRadius: 14,
    overflow: "hidden",
    margin: "8px 24px 64px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 44px",
  },
  statVal: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 28,
    color: "#0f0f0f",
    letterSpacing: "-0.5px",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
    fontWeight: 400,
  },
  features: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 920,
    padding: "0 24px",
    marginBottom: 80,
  },
  card: {
    background: "#fff",
    border: "1px solid #e8e5e0",
    borderRadius: 14,
    padding: "28px 28px 26px",
    flex: "1 1 240px",
    maxWidth: 290,
  },
  cardIcon: {
    width: 40,
    height: 40,
    background: "#f4f2ef",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    color: "#1a1a1a",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 8,
    color: "#0f0f0f",
  },
  cardDesc: {
    fontSize: 13.5,
    color: "#777",
    lineHeight: 1.6,
    fontWeight: 300,
  },
  footer: {
    fontSize: 13,
    color: "#aaa",
    paddingBottom: 32,
    marginTop: "auto",
  },
  footerLink: {
    color: "#aaa",
    borderBottom: "1px solid #ddd",
  },
};

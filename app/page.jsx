// NOTE: No "use client" here — this is a Server Component for SSR/crawlability
import React from "react";

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

const steps = [
  {
    num: "01",
    title: "Create a free account",
    desc: "Sign up in under 60 seconds with your email or Google account. No credit card or investment required.",
  },
  {
    num: "02",
    title: "Browse available tasks",
    desc: "Your personalised dashboard shows available click tasks, video ads, surveys, and brand campaigns.",
  },
  {
    num: "03",
    title: "Complete and get credited",
    desc: "Every verified task completion is credited to your Lets Click It wallet instantly.",
  },
  {
    num: "04",
    title: "Withdraw your earnings",
    desc: "Once you reach ₹100, withdraw via UPI, bank transfer, or redeem as gift cards.",
  },
];

const faqs = [
  {
    q: "Is Lets Click It free to join?",
    a: "Yes, completely free. There is no registration fee, no subscription, and no hidden charges. You earn — we never ask you to pay.",
  },
  {
    q: "How much can I earn per day?",
    a: "Earnings depend on the number and type of tasks you complete. Click tasks pay ₹0.01–₹2 per action, surveys pay ₹5–₹50, and video ads pay ₹1–₹5. Active users typically earn ₹50–₹500 per day.",
  },
  {
    q: "When and how do I get paid?",
    a: "Once your wallet balance reaches ₹100, you can withdraw anytime via UPI, direct bank transfer, or gift cards. Payouts are processed within 3–7 business days.",
  },
  {
    q: "Is this legitimate? How does it work?",
    a: "Yes. Lets Click It connects advertisers who need genuine user engagement with users who want to earn online. Advertisers pay for real human interactions — clicks, video views, survey responses — and we share that revenue with you.",
  },
  {
    q: "Are there any restrictions on who can join?",
    a: "You must be 18 or older and a resident of India. One account per person is permitted. Using bots or automation tools is strictly prohibited and will result in permanent suspension.",
  },
  {
    q: "How does Lets Click It prevent fraud?",
    a: "We use real-time behaviour analytics — monitoring click speed, rhythm, mouse movement, and engagement patterns — to ensure all credited tasks represent genuine human engagement. Suspicious sessions are automatically flagged and reviewed.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "I've been using Lets Click It for three months now. It's the most straightforward earning platform I've tried — no complicated tasks, just simple clicks and surveys. I withdraw via UPI every week.",
    earned: "₹4,200 earned",
  },
  {
    name: "Rahul Verma",
    location: "Delhi",
    text: "The click tasks are genuinely easy. I do them during my lunch break. The payout is reliable and the anti-fraud system means the platform stays clean — no bots stealing tasks from real users.",
    earned: "₹8,750 earned",
  },
  {
    name: "Anita Nair",
    location: "Bangalore",
    text: "Surveys on Lets Click It pay much better than other platforms I've used. The interface is clean, the earnings are transparent, and I've never had a withdrawal issue.",
    earned: "₹6,100 earned",
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
          <a href="#how-it-works" style={styles.navLink}>
            How it works
          </a>
          <a href="#earn" style={styles.navLink}>
            Earn
          </a>
          <a href="#faq" style={styles.navLink}>
            FAQ
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
          Trusted by 10,000+ earners across India
        </div>
        <h1 style={styles.h1} className="fade-up delay-1">
          Turn your clicks
          <br />
          into real rewards.
        </h1>
        <p style={styles.sub} className="fade-up delay-2">
          Lets Click It is India's trusted online engagement and rewards
          platform. Complete simple tasks — click sponsored links, watch
          promotional videos, take surveys — and earn real money from anywhere,
          anytime. Completely free to join. Instant wallet credits.
        </p>
        <div style={styles.ctas} className="fade-up delay-3">
          <a href="/register" style={styles.btnPrimary}>
            Start earning free
          </a>
          <a href="#how-it-works" style={styles.btnGhost}>
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

      {/* What is section */}
      <section style={styles.aboutSection}>
        <div style={styles.aboutInner}>
          <p style={styles.eyebrow}>About the platform</p>
          <h2 style={styles.sectionH2}>What is Lets Click It?</h2>
          <p style={styles.bodyText}>
            Lets Click It is an online engagement and rewards platform that
            connects everyday users with digital promotional campaigns run by
            advertisers and brands. Users earn incentives by interacting with
            sponsored content — through clicks, video views, surveys, and other
            micro-tasks — while advertisers gain verified, genuine engagement
            from real people.
          </p>
          <p style={styles.bodyText}>
            Unlike traditional ad networks that pay publishers for passive
            impressions, Lets Click It pays individual users directly for
            active, measurable engagement. Every task on the platform is tied to
            a real advertiser campaign, which means every rupee you earn
            represents genuine value delivered to a brand.
          </p>
          <p style={styles.bodyText}>
            The platform is built on three core principles:{" "}
            <strong>transparency</strong> — you always know what you're doing
            and what you'll earn before you start; <strong>trust</strong> — our
            real-time anti-fraud systems ensure only genuine human engagement is
            rewarded; and <strong>accessibility</strong> — anyone in India aged
            18 and above can sign up and start earning for free.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="earn" style={styles.features}>
        <div style={styles.featureHeader}>
          <p style={styles.eyebrow}>Task types</p>
          <h2 style={styles.sectionH2}>Four ways to earn on Lets Click It</h2>
          <p style={styles.featureSub}>
            Each task type is tied to live advertiser campaigns. No tasks are
            made up — every action you complete generates real value for a real
            brand.
          </p>
        </div>
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

      {/* How it works */}
      <section id="how-it-works" style={styles.stepsSection}>
        <p style={styles.eyebrow}>Simple process</p>
        <h2 style={styles.sectionH2}>How Lets Click It works</h2>
        <p style={styles.stepsSub}>
          Getting started takes less than two minutes. Here's the full process
          from sign-up to payout.
        </p>
        <div style={styles.stepsGrid}>
          {steps.map((s) => (
            <div key={s.num} style={styles.stepCard}>
              <span style={styles.stepNum}>{s.num}</span>
              <h3 style={styles.stepTitle}>{s.title}</h3>
              <p style={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Earning explainer */}
      <section style={styles.earningSection}>
        <div style={styles.earningInner}>
          <div style={styles.earningText}>
            <p style={styles.eyebrow}>Earning potential</p>
            <h2 style={styles.sectionH2}>How much can you earn?</h2>
            <p style={styles.bodyText}>
              Earnings on Lets Click It vary based on the tasks you choose and
              how much time you spend. Sponsored click tasks are the fastest —
              each verified click earns between ₹0.01 and ₹2.00 depending on the
              advertiser's campaign budget. These tasks take 30 seconds or less.
            </p>
            <p style={styles.bodyText}>
              Survey tasks take more time (typically 5–15 minutes) but pay
              significantly more — between ₹5 and ₹50 per completed survey.
              Video ad tasks fall in the middle, paying ₹1–₹5 for watching a
              30-second to 3-minute promotional video.
            </p>
            <p style={styles.bodyText}>
              Users who complete tasks consistently across all four categories
              typically earn ₹100–₹500 per day. Withdrawal is available any time
              your balance reaches ₹100, and payments are processed within 3–7
              business days.
            </p>
          </div>
          <div style={styles.earningRates}>
            {[
              {
                type: "Sponsored Clicks",
                rate: "₹0.01 – ₹2.00",
                per: "per click",
                color: "#eef2ff",
                text: "#4361b8",
              },
              {
                type: "Video Ads",
                rate: "₹1.00 – ₹5.00",
                per: "per video",
                color: "#fef3e2",
                text: "#b86b1a",
              },
              {
                type: "Surveys",
                rate: "₹5.00 – ₹50.00",
                per: "per survey",
                color: "#eaf3ec",
                text: "#4a7c59",
              },
              {
                type: "Campaigns",
                rate: "₹2.00 – ₹20.00",
                per: "per action",
                color: "#fce8f3",
                text: "#a03472",
              },
            ].map((r) => (
              <div
                key={r.type}
                style={{ ...styles.rateCard, background: r.color }}
              >
                <span style={{ ...styles.rateType, color: r.text }}>
                  {r.type}
                </span>
                <span style={{ ...styles.rateVal, color: r.text }}>
                  {r.rate}
                </span>
                <span style={styles.ratePer}>{r.per}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.testimonialsSection}>
        <p style={styles.eyebrow}>Real earners</p>
        <h2 style={styles.sectionH2}>What our users say</h2>
        <div style={styles.testimonialsGrid}>
          {testimonials.map((t) => (
            <div key={t.name} style={styles.testimonialCard}>
              <p style={styles.testimonialText}>"{t.text}"</p>
              <div style={styles.testimonialFooter}>
                <div style={styles.testimonialAvatar}>{t.name[0]}</div>
                <div>
                  <p style={styles.testimonialName}>{t.name}</p>
                  <p style={styles.testimonialMeta}>
                    {t.location} · {t.earned}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={styles.faqSection}>
        <p style={styles.eyebrow}>Common questions</p>
        <h2 style={styles.sectionH2}>Frequently asked questions</h2>
        <div style={styles.faqGrid}>
          {faqs.map((f) => (
            <div key={f.q} style={styles.faqCard}>
              <h3 style={styles.faqQ}>{f.q}</h3>
              <p style={styles.faqA}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to start earning?</h2>
        <p style={styles.ctaSub}>
          Join over 10,000 users already earning through Lets Click It. Free to
          join, no investment required.
        </p>
        <a href="/register" style={styles.btnPrimary}>
          Create free account →
        </a>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div>
            <span style={styles.footerLogo}>Lets Click It</span>
            <p style={styles.footerTagline}>
              India's trusted online engagement and rewards platform.
            </p>
          </div>
          <div style={styles.footerLinks}>
            <a href="/privacy" style={styles.footerLink}>
              Privacy Policy
            </a>
            <a href="/terms" style={styles.footerLink}>
              Terms of Service
            </a>
            <a href="/anti-fraud" style={styles.footerLink}>
              Anti-Fraud
            </a>
            <a href="mailto:support@letsclickit.com" style={styles.footerLink}>
              Contact
            </a>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.footerCopy}>
            © {new Date().getFullYear()} Lets Click It. All rights reserved.
            Lets Click It is an online engagement platform. Earnings are subject
            to task availability and verification.
          </p>
        </div>
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
  .fade-up  { animation: fadeUp 0.55s ease both; }
  .delay-1  { animation-delay: 0.08s; }
  .delay-2  { animation-delay: 0.16s; }
  .delay-3  { animation-delay: 0.24s; }
  .delay-4  { animation-delay: 0.32s; }
  .delay-5  { animation-delay: 0.40s; }
  .delay-6  { animation-delay: 0.48s; }
  .delay-7  { animation-delay: 0.56s; }

  a { text-decoration: none; }
  html { scroll-behavior: smooth; }
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

  // Nav
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
  navLinks: { display: "flex", alignItems: "center", gap: 28 },
  navLink: { fontSize: 14, color: "#555", fontWeight: 400 },
  navCta: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: 500,
    borderBottom: "1px solid #1a1a1a",
    paddingBottom: 1,
  },

  // Hero
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "72px 24px 48px",
    maxWidth: 700,
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
  badgeDot: { width: 7, height: 7, borderRadius: "50%", background: "#4a7c59" },
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
    lineHeight: 1.7,
    fontWeight: 300,
    maxWidth: 560,
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

  // Stats
  statsRow: {
    display: "flex",
    background: "#fff",
    border: "1px solid #e8e5e0",
    borderRadius: 14,
    overflow: "hidden",
    margin: "8px 24px 72px",
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
  statLabel: { fontSize: 12, color: "#888", marginTop: 3, fontWeight: 400 },

  // Shared
  eyebrow: {
    fontSize: 11,
    color: "#aaa",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  sectionH2: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(26px, 4vw, 36px)",
    color: "#0f0f0f",
    letterSpacing: "-0.8px",
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 15.5,
    color: "#555",
    lineHeight: 1.8,
    fontWeight: 300,
    marginBottom: 16,
    maxWidth: 640,
  },

  // About
  aboutSection: {
    width: "100%",
    maxWidth: 760,
    padding: "0 24px 72px",
    borderTop: "1px solid #e8e5e0",
    paddingTop: 64,
  },
  aboutInner: { display: "flex", flexDirection: "column", gap: 4 },

  // Features
  features: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 960,
    padding: "64px 24px 72px",
    borderTop: "1px solid #e8e5e0",
    width: "100%",
  },
  featureHeader: {
    width: "100%",
    textAlign: "center",
    marginBottom: 8,
  },
  featureSub: {
    fontSize: 15,
    color: "#666",
    fontWeight: 300,
    maxWidth: 520,
    margin: "0 auto",
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
  cardDesc: { fontSize: 13.5, color: "#777", lineHeight: 1.6, fontWeight: 300 },

  // Steps
  stepsSection: {
    width: "100%",
    maxWidth: 960,
    padding: "64px 24px 72px",
    borderTop: "1px solid #e8e5e0",
    textAlign: "center",
  },
  stepsSub: {
    fontSize: 15,
    color: "#666",
    fontWeight: 300,
    maxWidth: 500,
    margin: "0 auto 36px",
  },
  stepsGrid: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  stepCard: {
    background: "#fff",
    border: "1px solid #e8e5e0",
    borderRadius: 14,
    padding: "24px",
    flex: "1 1 200px",
    maxWidth: 220,
    textAlign: "left",
  },
  stepNum: {
    fontSize: 11,
    color: "#ccc",
    letterSpacing: "0.06em",
    fontWeight: 500,
    display: "block",
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#0f0f0f",
    marginBottom: 8,
  },
  stepDesc: { fontSize: 13, color: "#777", lineHeight: 1.6, fontWeight: 300 },

  // Earning
  earningSection: {
    width: "100%",
    maxWidth: 960,
    padding: "64px 24px 72px",
    borderTop: "1px solid #e8e5e0",
  },
  earningInner: {
    display: "flex",
    gap: 48,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  earningText: { flex: "1 1 320px" },
  earningRates: {
    flex: "0 0 260px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  rateCard: {
    borderRadius: 12,
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  rateType: { fontSize: 12, fontWeight: 500 },
  rateVal: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 22,
    letterSpacing: "-0.5px",
  },
  ratePer: { fontSize: 11, color: "#888" },

  // Testimonials
  testimonialsSection: {
    width: "100%",
    maxWidth: 960,
    padding: "64px 24px 72px",
    borderTop: "1px solid #e8e5e0",
    textAlign: "center",
  },
  testimonialsGrid: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 32,
  },
  testimonialCard: {
    background: "#fff",
    border: "1px solid #e8e5e0",
    borderRadius: 14,
    padding: "24px",
    flex: "1 1 260px",
    maxWidth: 300,
    textAlign: "left",
  },
  testimonialText: {
    fontSize: 13.5,
    color: "#555",
    lineHeight: 1.7,
    fontWeight: 300,
    marginBottom: 20,
  },
  testimonialFooter: { display: "flex", alignItems: "center", gap: 10 },
  testimonialAvatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#1a1a1a",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  testimonialName: { fontSize: 13, fontWeight: 600, color: "#0f0f0f" },
  testimonialMeta: { fontSize: 11, color: "#aaa", marginTop: 2 },

  // FAQ
  faqSection: {
    width: "100%",
    maxWidth: 760,
    padding: "64px 24px 72px",
    borderTop: "1px solid #e8e5e0",
  },
  faqGrid: { display: "flex", flexDirection: "column", gap: 0, marginTop: 32 },
  faqCard: {
    borderTop: "1px solid #e8e5e0",
    padding: "24px 0",
  },
  faqQ: { fontSize: 15, fontWeight: 600, color: "#0f0f0f", marginBottom: 10 },
  faqA: { fontSize: 14, color: "#666", lineHeight: 1.7, fontWeight: 300 },

  // CTA
  ctaSection: {
    width: "calc(100% - 48px)",
    maxWidth: 912,
    border: "1px solid #e8e5e0",
    borderRadius: 14,
    padding: "48px 32px",
    textAlign: "center",
    marginBottom: 72,
    background: "#fff",
  },
  ctaTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(24px, 4vw, 32px)",
    color: "#0f0f0f",
    letterSpacing: "-0.5px",
    marginBottom: 12,
  },
  ctaSub: {
    fontSize: 15,
    color: "#666",
    fontWeight: 300,
    marginBottom: 28,
    maxWidth: 440,
    margin: "0 auto 28px",
  },

  // Footer
  footer: {
    width: "100%",
    borderTop: "1px solid #e8e5e0",
    padding: "32px 24px 24px",
  },
  footerTop: {
    maxWidth: 960,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 24,
    marginBottom: 24,
  },
  footerLogo: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 18,
    color: "#1a1a1a",
    display: "block",
    marginBottom: 6,
  },
  footerTagline: {
    fontSize: 13,
    color: "#aaa",
    maxWidth: 280,
    lineHeight: 1.6,
  },
  footerLinks: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    alignItems: "center",
  },
  footerLink: { fontSize: 13, color: "#888" },
  footerBottom: {
    maxWidth: 960,
    margin: "0 auto",
    paddingTop: 20,
    borderTop: "1px solid #f0ede8",
  },
  footerCopy: { fontSize: 12, color: "#bbb", lineHeight: 1.6 },
};

import React from "react";

const sections = [
  {
    title: "Information We Collect",
    content: [
      "When you register on Lets Click It, we collect your name, email address, and account credentials to create and manage your account.",
      "We collect data on the tasks you complete, including clicks, video views, survey responses, and campaign interactions, to verify engagements and calculate your earnings.",
      "We may collect device information, browser type, IP address, and usage data to ensure platform security, detect fraud, and improve your experience.",
      "Payment information such as UPI IDs or bank account details provided for withdrawals is collected solely for processing payouts and is never stored beyond what is necessary.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "To operate the platform and credit your account for verified task completions.",
      "To process your earnings withdrawals via UPI, bank transfer, or gift cards.",
      "To communicate important account updates, new task availability, and platform announcements.",
      "To detect, investigate, and prevent fraudulent activity and ensure only genuine engagements are rewarded.",
      "To improve our platform, personalise your task feed, and analyse overall platform performance.",
    ],
  },
  {
    title: "Sharing Your Information",
    content: [
      "We do not sell your personal data to third parties.",
      "We share anonymised engagement data with advertisers and campaign partners solely to report on campaign performance — no personally identifiable information is disclosed.",
      "We may share information with service providers who assist us in operating the platform (e.g. payment processors, analytics providers) under strict confidentiality agreements.",
      "We may disclose information if required by law, court order, or to protect the rights and safety of our users and the platform.",
    ],
  },
  {
    title: "Cookies & Tracking",
    content: [
      "We use cookies and similar tracking technologies to keep you logged in, remember your preferences, and track task completion for reward verification.",
      "Analytics cookies help us understand how users interact with the platform so we can improve it.",
      "You may disable cookies in your browser settings, but doing so may affect your ability to use certain features of Lets Click It.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We implement industry-standard security measures including encryption, secure servers, and access controls to protect your personal data.",
      "While we strive to protect your information, no method of transmission over the internet is 100% secure. We encourage you to use a strong, unique password for your account.",
      "In the event of a data breach that affects your rights or freedoms, we will notify you and the relevant authorities as required by applicable law.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "You have the right to access the personal data we hold about you and request a copy at any time.",
      "You may request correction of inaccurate data or deletion of your account and associated personal data, subject to our legal obligations.",
      "You may opt out of non-essential communications at any time by updating your notification preferences in your account settings.",
      "To exercise any of these rights, contact us at privacy@letsclickit.com.",
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      "Lets Click It is not intended for users under the age of 18. We do not knowingly collect personal data from minors.",
      "If we become aware that a minor has registered on our platform, we will promptly delete their account and associated data.",
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.",
      "We will notify you of significant changes via email or a prominent notice on the platform. Continued use of Lets Click It after changes constitutes your acceptance of the updated policy.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div style={styles.root}>
      <style>{css}</style>

      {/* Nav */}
      <nav style={styles.nav}>
        <a href="/" style={styles.logo}>
          Lets Click It
        </a>
        <div style={styles.navLinks}>
          <a href="/home" style={styles.navLink}>
            Dashboard
          </a>
          <a href="/terms" style={styles.navLink}>
            Terms
          </a>
          <a href="/login" style={styles.navCta}>
            Sign in →
          </a>
        </div>
      </nav>

      {/* Header */}
      <section style={styles.header}>
        <div style={styles.badge} className="fade-up">
          <span style={styles.badgeDot} />
          Legal
        </div>
        <h1 style={styles.h1} className="fade-up delay-1">
          Privacy Policy
        </h1>
        <p style={styles.sub} className="fade-up delay-2">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p style={styles.intro} className="fade-up delay-3">
          Lets Click It is committed to protecting your privacy. This policy
          explains what data we collect, how we use it, and your rights as a
          user of our engagement and rewards platform.
        </p>
      </section>

      {/* Content */}
      <div style={styles.content}>
        {sections.map((s, i) => (
          <div
            key={s.title}
            style={styles.section}
            className={`fade-up delay-${(i % 4) + 1}`}
          >
            <h2 style={styles.sectionTitle}>{s.title}</h2>
            <ul style={styles.list}>
              {s.content.map((point, j) => (
                <li key={j} style={styles.listItem}>
                  <span style={styles.dot} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div style={styles.contactCard} className="fade-up">
          <div style={styles.contactIcon}>
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p style={styles.contactTitle}>Questions about your privacy?</p>
            <p style={styles.contactDesc}>
              Reach out to our team at{" "}
              <a href="mailto:privacy@letsclickit.com" style={styles.link}>
                privacy@letsclickit.com
              </a>
              . We aim to respond within 48 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} Lets Click It ·{" "}
        <a href="/privacy" style={styles.footerLink}>
          Privacy
        </a>{" "}
        ·{" "}
        <a href="/terms" style={styles.footerLink}>
          Terms
        </a>{" "}
        ·{" "}
        <a href="/anti-fraud" style={styles.footerLink}>
          Anti-Fraud
        </a>
      </footer>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  a { text-decoration: none; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up       { animation: fadeUp 0.5s ease both; }
  .delay-1       { animation-delay: 0.07s; }
  .delay-2       { animation-delay: 0.14s; }
  .delay-3       { animation-delay: 0.21s; }
  .delay-4       { animation-delay: 0.28s; }
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
  },
  navCta: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: 500,
    borderBottom: "1px solid #1a1a1a",
    paddingBottom: 1,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "56px 24px 48px",
    maxWidth: 640,
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
    marginBottom: 20,
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
    fontSize: "clamp(36px, 6vw, 52px)",
    lineHeight: 1.1,
    letterSpacing: "-1.2px",
    color: "#0f0f0f",
    marginBottom: 12,
  },
  sub: {
    fontSize: 13,
    color: "#aaa",
    marginBottom: 18,
    fontWeight: 400,
  },
  intro: {
    fontSize: 16,
    color: "#666",
    lineHeight: 1.7,
    fontWeight: 300,
    maxWidth: 520,
  },
  content: {
    width: "100%",
    maxWidth: 720,
    padding: "0 24px 80px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  section: {
    borderTop: "1px solid #e8e5e0",
    padding: "32px 0",
  },
  sectionTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 20,
    color: "#0f0f0f",
    letterSpacing: "-0.3px",
    marginBottom: 16,
  },
  list: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  listItem: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    fontSize: 14.5,
    color: "#555",
    lineHeight: 1.7,
    fontWeight: 300,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "#ccc",
    flexShrink: 0,
    marginTop: 9,
  },
  contactCard: {
    marginTop: 16,
    background: "#fff",
    border: "1px solid #e8e5e0",
    borderRadius: 14,
    padding: "22px 24px",
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
  },
  contactIcon: {
    width: 40,
    height: 40,
    background: "#f4f2ef",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1a1a1a",
    flexShrink: 0,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#0f0f0f",
    marginBottom: 6,
  },
  contactDesc: {
    fontSize: 13.5,
    color: "#777",
    lineHeight: 1.6,
    fontWeight: 300,
  },
  link: {
    color: "#1a1a1a",
    fontWeight: 500,
    borderBottom: "1px solid #ccc",
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

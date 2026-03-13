import React from "react";

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By registering for or using Lets Click It, you agree to be bound by these Terms of Service and our Privacy Policy.",
      "If you do not agree with any part of these terms, you must not use the platform.",
      "We reserve the right to update these terms at any time. Continued use of the platform after changes are published constitutes acceptance of the revised terms.",
      "These terms apply to all users of Lets Click It, including those who access the platform without registering.",
    ],
  },
  {
    title: "Eligibility",
    content: [
      "You must be at least 18 years of age to register and use Lets Click It.",
      "By creating an account, you represent and warrant that all information you provide is accurate, current, and complete.",
      "One account per person is permitted. Creating multiple accounts to gain additional earnings is strictly prohibited and will result in permanent suspension.",
      "Users found to be operating accounts on behalf of others, or using automation tools to complete tasks, will be banned without payout.",
    ],
  },
  {
    title: "Earning Policy",
    content: [
      "Earnings are credited to your Lets Click It wallet only upon successful verification of completed tasks by our system and the relevant advertiser or campaign partner.",
      "Lets Click It reserves the right to withhold or reverse credits for any engagement deemed fraudulent, automated, or non-genuine.",
      "Task rewards, availability, and payout rates are subject to change at any time based on advertiser campaigns and platform conditions.",
      "Minimum withdrawal amount is ₹100. We aim to process withdrawal requests within 3–7 business days.",
      "Lets Click It is not responsible for delays caused by third-party payment processors, banks, or UPI services.",
    ],
  },
  {
    title: "Prohibited Activities",
    content: [
      "Using bots, scripts, VPNs, proxies, or any automated means to complete tasks or simulate engagement is strictly prohibited.",
      "Attempting to manipulate, reverse-engineer, or exploit the platform's reward or verification systems is a violation of these terms.",
      "You may not use the platform for any unlawful purpose or in any way that could damage, disable, or impair the platform.",
      "Sharing, selling, or transferring your account to another person is not permitted.",
      "Any attempt to defraud advertisers, campaign partners, or Lets Click It will result in immediate account termination and potential legal action.",
    ],
  },
  {
    title: "Anti-Fraud Statement",
    content: [
      "Lets Click It employs active fraud detection systems to monitor all user activity on the platform.",
      "Accounts flagged for suspicious behaviour — including unusual click patterns, VPN usage, or task completion inconsistencies — will be reviewed and may be suspended pending investigation.",
      "We cooperate fully with advertisers and law enforcement authorities where fraudulent activity is identified.",
      "Our anti-fraud measures protect advertisers' campaign budgets and ensure that rewards on Lets Click It represent genuine engagement and real value.",
      "If you believe your account has been flagged in error, contact support@letsclickit.com within 14 days for a review.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All content on Lets Click It — including the platform design, logos, text, and code — is the property of Lets Click It and is protected by applicable intellectual property laws.",
      "You are granted a limited, non-exclusive, non-transferable licence to use the platform for personal, non-commercial purposes only.",
      "You may not copy, reproduce, modify, or distribute any part of the platform without prior written consent from Lets Click It.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "Lets Click It provides the platform on an 'as is' and 'as available' basis. We do not guarantee uninterrupted or error-free service.",
      "We are not liable for any indirect, incidental, or consequential damages arising from your use of or inability to use the platform.",
      "Our total liability to you for any claim arising from your use of Lets Click It shall not exceed the total amount earned by you on the platform in the 30 days preceding the claim.",
    ],
  },
  {
    title: "Termination",
    content: [
      "We reserve the right to suspend or permanently terminate your account at any time for violation of these terms, fraudulent activity, or behaviour harmful to the platform or its users.",
      "Upon termination for cause, any pending earnings may be forfeited at our discretion.",
      "You may close your account at any time by contacting support@letsclickit.com. Verified pending earnings at the time of closure will be processed within 30 days.",
    ],
  },
  {
    title: "Governing Law",
    content: [
      "These terms are governed by the laws of India. Any disputes arising from your use of Lets Click It shall be subject to the exclusive jurisdiction of the courts of India.",
      "If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.",
    ],
  },
];

export default function TermsPage() {
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
          <a href="/privacy" style={styles.navLink}>
            Privacy
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
          Terms of Service
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
          These Terms of Service govern your use of Lets Click It — an online
          engagement and rewards platform. Please read them carefully before
          using the platform.
        </p>
      </section>

      {/* Quick index */}
      <div style={styles.indexWrap} className="fade-up delay-4">
        <p style={styles.indexLabel}>Jump to section</p>
        <div style={styles.indexPills}>
          {sections.map((s) => (
            <a
              key={s.title}
              href={`#${s.title.toLowerCase().replace(/\s+/g, "-")}`}
              style={styles.indexPill}
            >
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {sections.map((s, i) => (
          <div
            key={s.title}
            id={s.title.toLowerCase().replace(/\s+/g, "-")}
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
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p style={styles.contactTitle}>Questions about these terms?</p>
            <p style={styles.contactDesc}>
              Contact the Lets Click It Team at{" "}
              <a href="mailto:support@letsclickit.com" style={styles.link}>
                support@letsclickit.com
              </a>
              . We're happy to clarify anything.
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
  html { scroll-behavior: smooth; }

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
    padding: "56px 24px 40px",
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
  indexWrap: {
    width: "100%",
    maxWidth: 720,
    padding: "0 24px 32px",
  },
  indexLabel: {
    fontSize: 11,
    color: "#aaa",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  indexPills: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  indexPill: {
    fontSize: 12,
    color: "#555",
    background: "#fff",
    border: "1px solid #e8e5e0",
    borderRadius: 99,
    padding: "4px 12px",
    fontWeight: 400,
    transition: "border-color 0.15s",
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

"use client";

import { useState } from "react";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (err) {
      // You can make error messages more specific based on error.code if desired
      setError("Failed to create account. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      <style>{css}</style>

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

      <main style={styles.main}>
        <div style={styles.center}>
          <div style={styles.badge} className="fade-up">
            <span style={styles.badgeDot} />
            Join 10K+ earners already clicking
          </div>

          <h1 style={styles.h1} className="fade-up delay-1">
            Create your account
          </h1>

          <p style={styles.sub} className="fade-up delay-2">
            Already have an account?{" "}
            <a href="/login" style={styles.inlineLink}>
              Sign in →
            </a>
          </p>

          <form
            onSubmit={handleRegister}
            style={styles.card}
            className="fade-up delay-3"
            noValidate
          >
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && <p style={styles.error}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.btnPrimary,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
              className="fade-up delay-4"
            >
              {loading ? "Creating…" : "Create account"}
            </button>

            <p style={styles.termsNote} className="fade-up delay-5">
              By signing up, you agree to our{" "}
              <a href="/terms" style={styles.termsLink}>
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" style={styles.termsLink}>
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </main>

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

// ────────────────────────────────────────────────
// Reuse almost identical CSS and styles from login
// ────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up          { animation: fadeUp 0.6s ease-out both; }
  .delay-1          { animation-delay: 0.10s; }
  .delay-2          { animation-delay: 0.20s; }
  .delay-3          { animation-delay: 0.30s; }
  .delay-4          { animation-delay: 0.40s; }
  .delay-5          { animation-delay: 0.50s; }

  a { text-decoration: none; }
`;

const styles = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#f9f8f6",
    color: "#1a1a1a",
    minHeight: "100vh",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  nav: {
    width: "100%",
    maxWidth: 960,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 24px",
  },
  logo: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 22,
    color: "#1a1a1a",
    letterSpacing: "-0.4px",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 24,
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
    paddingBottom: 2,
  },

  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 24px",
    overflowY: "auto",
  },

  center: {
    width: "100%",
    maxWidth: 380,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    fontWeight: 500,
    color: "#4a7c59",
    background: "#eaf3ec",
    border: "1px solid #c6dfc9",
    borderRadius: 999,
    padding: "5px 14px",
    marginBottom: 24,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#4a7c59",
  },

  h1: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(32px, 5.5vw, 44px)",
    lineHeight: 1.15,
    letterSpacing: "-1.1px",
    marginBottom: 12,
    color: "#0f0f0f",
  },
  sub: {
    fontSize: 15.5,
    color: "#555",
    marginBottom: 32,
    lineHeight: 1.45,
  },
  inlineLink: {
    color: "#1a1a1a",
    fontWeight: 500,
    borderBottom: "1px solid #888",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e8e5e0",
    borderRadius: 14,
    padding: "28px 26px 24px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
  },

  input: {
    padding: "11px 14px",
    fontSize: 15,
    border: "1px solid #d0ccc5",
    borderRadius: 8,
    background: "#fff",
    outline: "none",
    transition: "border-color 0.15s",
    "::placeholder": { color: "#999" },
  },

  error: {
    color: "#c94c4c",
    fontSize: 13.5,
    textAlign: "center",
    margin: "4px 0 8px",
  },

  btnPrimary: {
    background: "#1a1a1a",
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
    padding: "12px 24px",
    borderRadius: 8,
    border: "none",
    letterSpacing: "0.02em",
    cursor: "pointer",
    transition: "background 0.15s",
  },

  termsNote: {
    fontSize: 13,
    color: "#777",
    marginTop: 16,
    lineHeight: 1.5,
  },
  termsLink: {
    color: "#555",
    fontWeight: 500,
  },

  footer: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    padding: "16px 24px 20px",
    borderTop: "1px solid #e8e5e0",
  },
  footerLink: {
    color: "#555",
    margin: "0 4px",
  },
};

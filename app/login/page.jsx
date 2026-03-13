"use client";

import { useState } from "react";
import { auth } from "../../lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const provider = new GoogleAuthProvider();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (err) {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, provider);
      router.push("/home");
    } catch (err) {
      setError("Google sign-in failed. Try again.");
    }
    setLoading(false);
  };

  const handleFacebookLogin = async () => {
    setError("Facebook login not implemented yet.");
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
          <a href="/register" style={styles.navCta}>
            Register →
          </a>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.center}>
          <div style={styles.badge} className="fade-up">
            <span style={styles.badgeDot} />
            Trusted by 10K+ earners
          </div>

          <h1 style={styles.h1} className="fade-up delay-1">
            Sign in to your account
          </h1>

          <p style={styles.sub} className="fade-up delay-2">
            Don't have one?{" "}
            <a href="/register" style={styles.inlineLink}>
              Create account →
            </a>
          </p>

          <form
            onSubmit={handleEmailLogin}
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
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div style={styles.forgotRow}>
              <a href="/forgot-password" style={styles.forgotLink}>
                Forgot password?
              </a>
            </div>

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
              {loading ? "…" : "Continue"}
            </button>

            <div style={styles.orRow} className="fade-up delay-5">
              <span style={styles.orLine} />
              <span style={styles.orText}>or</span>
              <span style={styles.orLine} />
            </div>

            <div style={styles.socialButtons} className="fade-up delay-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                style={{
                  ...styles.btnSocial,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                onClick={handleFacebookLogin}
                disabled={loading}
                style={{
                  ...styles.btnSocial,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
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
  .delay-6          { animation-delay: 0.60s; }

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

  forgotRow: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: 13,
  },
  forgotLink: {
    color: "#555",
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

  orRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: "12px 0 8px",
  },
  orLine: {
    flex: 1,
    height: 1,
    background: "#e0ded9",
  },
  orText: {
    fontSize: 13,
    color: "#777",
  },

  socialButtons: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  btnSocial: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "11px 20px",
    background: "#fff",
    border: "1px solid #d0ccc5",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: "#1a1a1a",
    cursor: "pointer",
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

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Anti-fraud constants ────────────────────────────────────────────────────
const MAX_CPS = 12; // human cannot sustainably exceed 12 CPS
const MIN_INTERVAL_MS = 50; // any two clicks faster than 50ms = bot
const RHYTHM_THRESHOLD = 0.92; // interval regularity score above this = bot
const MIN_MOUSE_MOVES = 3; // must move mouse at least 3x between clicks
const SUSPICIOUS_STRIKES = 3; // strikes before session is flagged
const INTERVAL_WINDOW = 20; // last N intervals checked for rhythm

function Ripple({ x, y, id, onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(id), 600);
    return () => clearTimeout(t);
  }, []);
  return (
    <span
      style={{
        position: "fixed",
        left: x,
        top: y,
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "#4a7c59",
        opacity: 0,
        transform: "translate(-50%, -50%) scale(0)",
        pointerEvents: "none",
        animation: "rippleOut 0.6s ease-out forwards",
        zIndex: 9999,
      }}
    />
  );
}

function FloatReward({ x, y, id, onDone, text }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(id), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <span
      style={{
        position: "fixed",
        left: x,
        top: y,
        fontSize: 13,
        fontWeight: 600,
        color: "#4a7c59",
        pointerEvents: "none",
        animation: "floatUp 0.9s ease-out forwards",
        zIndex: 9999,
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

// ─── Rhythm analyser ─────────────────────────────────────────────────────────
// Returns a score 0–1 where 1 = perfectly regular (bot-like)
function rhythmScore(intervals) {
  if (intervals.length < 4) return 0;
  const recent = intervals.slice(-INTERVAL_WINDOW);
  const mean = recent.reduce((a, b) => a + b, 0) / recent.length;
  const variance =
    recent.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / recent.length;
  const stdDev = Math.sqrt(variance);
  const cv = stdDev / (mean || 1); // coefficient of variation — lower = more regular
  return Math.max(0, 1 - cv); // flip: high score = regular = suspicious
}

export default function ClickTask() {
  // ── Core state ──────────────────────────────────────────────────────────────
  const [clicks, setClicks] = useState(0);
  const [balance, setBalance] = useState(0); // actual ₹ credited
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [cps, setCps] = useState(0);
  const [ripples, setRipples] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [isPressed, setIsPressed] = useState(false);

  // ── Anti-fraud state ────────────────────────────────────────────────────────
  const [fraudStrikes, setFraudStrikes] = useState(0);
  const [flagged, setFlagged] = useState(false);
  const [fraudReasons, setFraudReasons] = useState([]); // list of active warnings
  const [trustScore, setTrustScore] = useState(100); // 0–100
  const [mouseMoveSinceClick, setMouseMoveSinceClick] = useState(0);
  const [rhythmVal, setRhythmVal] = useState(0); // 0–1
  const [avgInterval, setAvgInterval] = useState(0);

  // ── Refs ────────────────────────────────────────────────────────────────────
  const timerRef = useRef(null);
  const inactiveRef = useRef(null);
  const streakRef = useRef(0);
  const clickWindowRef = useRef([]); // timestamps for CPS
  const intervalsRef = useRef([]); // ms between consecutive clicks
  const lastClickRef = useRef(null); // timestamp of last click
  const mouseMoveRef = useRef(0); // mouse moves since last click
  const idRef = useRef(0);
  const clicksRef = useRef(0); // shadow ref to avoid stale closure
  const fraudStrikesRef = useRef(0);
  const mousePositionsRef = useRef([]); // recent (x,y) for movement analysis
  const lastMouseRef = useRef(null);

  // ── Timer ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  // ── CPS rolling window ───────────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      clickWindowRef.current = clickWindowRef.current.filter(
        (t) => now - t < 1000,
      );
      setCps(clickWindowRef.current.length);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // ── Global mouse move tracker ────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX,
        y = e.clientY;
      mouseMoveRef.current += 1;
      setMouseMoveSinceClick(mouseMoveRef.current);

      // track positions for linearity check (bots often move in straight lines)
      mousePositionsRef.current.push({ x, y, t: Date.now() });
      if (mousePositionsRef.current.length > 30) {
        mousePositionsRef.current.shift();
      }
      lastMouseRef.current = { x, y };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Fraud analysis — runs after every click ──────────────────────────────────
  const analyseFraud = useCallback(
    (nowMs, clickCoords) => {
      const reasons = [];
      let strikeThisClick = false;

      // 1. Interval too short (superhuman speed)
      const last = lastClickRef.current;
      if (last !== null) {
        const interval = nowMs - last;
        intervalsRef.current.push(interval);
        if (intervalsRef.current.length > 100) intervalsRef.current.shift();

        if (interval < MIN_INTERVAL_MS) {
          reasons.push(
            `Click interval too short (${interval}ms — min ${MIN_INTERVAL_MS}ms)`,
          );
          strikeThisClick = true;
        }

        // 2. Rhythmicity — perfectly timed clicks
        const rScore = rhythmScore(intervalsRef.current);
        setRhythmVal(rScore);
        if (intervalsRef.current.length >= 8 && rScore > RHYTHM_THRESHOLD) {
          reasons.push(
            `Robotic rhythm detected (regularity: ${Math.round(rScore * 100)}%)`,
          );
          strikeThisClick = true;
        }

        // avg interval
        const recent = intervalsRef.current.slice(-10);
        setAvgInterval(
          Math.round(recent.reduce((a, b) => a + b, 0) / recent.length),
        );
      }
      lastClickRef.current = nowMs;

      // 3. CPS too high
      if (cps > MAX_CPS) {
        reasons.push(`CPS too high (${cps} — max ${MAX_CPS})`);
        strikeThisClick = true;
      }

      // 4. No mouse movement between clicks (autoclicker often doesn't move mouse)
      if (clicksRef.current > 5 && mouseMoveRef.current < MIN_MOUSE_MOVES) {
        reasons.push(`No mouse movement detected between clicks`);
        strikeThisClick = true;
      }

      // 5. Click position never changes (fixed-coordinate autoclicker)
      if (clickCoords && mousePositionsRef.current.length > 5) {
        const positions = mousePositionsRef.current.slice(-10);
        const xs = positions.map((p) => p.x);
        const ys = positions.map((p) => p.y);
        const xRange = Math.max(...xs) - Math.min(...xs);
        const yRange = Math.max(...ys) - Math.min(...ys);
        if (xRange < 2 && yRange < 2 && clicksRef.current > 10) {
          reasons.push(
            `Mouse position frozen — possible fixed-point autoclicker`,
          );
          strikeThisClick = true;
        }
      }

      // reset mouse move counter for next click
      mouseMoveRef.current = 0;
      setMouseMoveSinceClick(0);

      // apply strike
      if (strikeThisClick) {
        fraudStrikesRef.current += 1;
        setFraudStrikes(fraudStrikesRef.current);

        if (fraudStrikesRef.current >= SUSPICIOUS_STRIKES) {
          setFlagged(true);
        }
      }

      // update trust score: decrease on strikes, recover slightly on clean clicks
      setTrustScore((prev) => {
        const penalty = strikeThisClick ? 12 : 0;
        const recovery = strikeThisClick ? 0 : 1;
        return Math.max(0, Math.min(100, prev - penalty + recovery));
      });

      setFraudReasons(reasons);
    },
    [cps],
  );

  // ── Click handler ────────────────────────────────────────────────────────────
  const handleClick = useCallback(
    (e) => {
      if (flagged) return; // session is locked

      const now = Date.now();
      clickWindowRef.current.push(now);

      const rx = e.clientX ?? e.touches?.[0]?.clientX ?? window.innerWidth / 2;
      const ry = e.clientY ?? e.touches?.[0]?.clientY ?? window.innerHeight / 2;

      // fraud check first
      analyseFraud(now, { x: rx, y: ry });

      // increment via ref for synchronous access
      clicksRef.current += 1;
      const newClicks = clicksRef.current;
      setClicks(newClicks);

      // ₹0.10 credited every 250 clicks (₹0.0004 per click effective)
      if (newClicks % 250 === 0 && !flagged) {
        setBalance((b) => +(b + 0.1).toFixed(2));
        const fid = ++idRef.current;
        setRewards((r) => [
          ...r,
          { id: fid, x: rx - 30, y: ry - 40, text: "+₹0.10 credited!" },
        ]);
      }

      // streak
      streakRef.current += 1;
      setCurrentStreak(streakRef.current);
      setBestStreak((b) => Math.max(b, streakRef.current));

      setIsActive(true);
      clearTimeout(inactiveRef.current);
      inactiveRef.current = setTimeout(() => {
        setIsActive(false);
        streakRef.current = 0;
        setCurrentStreak(0);
      }, 2000);

      // ripple
      const rid = ++idRef.current;
      setRipples((r) => [...r, { id: rid, x: rx, y: ry }]);

      // visual float every 50 clicks
      if (newClicks % 50 === 0) {
        const fid = ++idRef.current;
        setRewards((r) => [
          ...r,
          { id: fid, x: rx - 20, y: ry - 30, text: `${newClicks} clicks!` },
        ]);
      }
    },
    [flagged, analyseFraud],
  );

  const removeRipple = useCallback(
    (id) => setRipples((r) => r.filter((x) => x.id !== id)),
    [],
  );
  const removeReward = useCallback(
    (id) => setRewards((r) => r.filter((x) => x.id !== id)),
    [],
  );

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  // Milestones based on actual credited amount
  const milestone =
    clicks === 0
      ? "Tap to start earning"
      : clicks < 10
        ? "Keep going…"
        : clicks < 50
          ? "On a roll! 🔥"
          : clicks < 250
            ? `${250 - clicks} more to first payout!`
            : clicks < 500
              ? "Unstoppable! ⚡"
              : clicks < 1000
                ? "Legend status! 🏆"
                : "Elite earner! 👑";

  const RADIUS = 88;
  const CIRC = 2 * Math.PI * RADIUS;
  const progress = Math.min((clicks % 250) / 250, 1); // resets every 250
  const dashOff = CIRC * (1 - progress);
  const cpsBarW = Math.min((cps / MAX_CPS) * 100, 100);

  // trust colour
  const trustColor =
    trustScore > 70 ? "#4a7c59" : trustScore > 40 ? "#b86b1a" : "#c94c4c";

  const leftStats = [
    { label: "Total Clicks", value: clicks.toLocaleString() },
    { label: "Time Active", value: formatTime(seconds) },
    { label: "Credited", value: `₹${balance.toFixed(2)}` },
    { label: "Best Streak", value: bestStreak.toLocaleString() },
  ];

  const fraudStats = [
    { label: "Trust Score", value: `${trustScore}%`, color: trustColor },
    {
      label: "Rhythm",
      value: `${Math.round(rhythmVal * 100)}%`,
      color: rhythmVal > RHYTHM_THRESHOLD ? "#c94c4c" : "#4a7c59",
    },
    {
      label: "Avg Interval",
      value: avgInterval ? `${avgInterval}ms` : "—",
      color: "#1a1a1a",
    },
    {
      label: "Fraud Strikes",
      value: `${fraudStrikes}/${SUSPICIOUS_STRIKES}`,
      color: fraudStrikes > 0 ? "#c94c4c" : "#4a7c59",
    },
  ];

  return (
    <div style={styles.root}>
      <style>{css}</style>

      {ripples.map((r) => (
        <Ripple key={r.id} {...r} onDone={removeRipple} />
      ))}
      {rewards.map((r) => (
        <FloatReward key={r.id} {...r} onDone={removeReward} />
      ))}

      {/* Nav */}
      <nav style={styles.nav}>
        <a href="/home" style={styles.logo}>
          Lets Click It
        </a>
        <div style={styles.navLinks}>
          <a href="/home" style={styles.navLink}>
            ← Dashboard
          </a>
          <a href="#" style={styles.navLink}>
            Withdraw
          </a>
        </div>
      </nav>

      <div style={styles.page}>
        {/* Header */}
        <div style={styles.pageHeader} className="fade-up">
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            Clicker Task · Sponsored
          </div>
          <p style={styles.pageSub}>
            250 genuine clicks = <strong>₹0.10</strong> credited to your wallet.
            Anti-fraud verification active.
          </p>
        </div>

        {/* Flagged banner */}
        {flagged && (
          <div style={styles.flaggedBanner}>
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" />
              <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" />
            </svg>
            <div>
              <strong>Session flagged for suspicious activity.</strong> Earnings
              from this session are under review and may not be credited.
              Contact support if you believe this is an error.
            </div>
          </div>
        )}

        {/* Warnings */}
        {!flagged && fraudReasons.length > 0 && (
          <div style={styles.warningBanner}>
            ⚠ {fraudReasons[0]} — {SUSPICIOUS_STRIKES - fraudStrikes} warning
            {SUSPICIOUS_STRIKES - fraudStrikes !== 1 ? "s" : ""} remaining
            before session lock.
          </div>
        )}

        {/* Main 3-col layout */}
        <div style={styles.main}>
          {/* Left — click stats */}
          <div style={styles.statsSide} className="fade-up delay-1">
            <p style={styles.colLabel}>Click Stats</p>
            {leftStats.map((s) => (
              <div key={s.label} style={styles.statCard}>
                <span style={styles.statCardVal}>{s.value}</span>
                <span style={styles.statCardLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Centre — circle */}
          <div style={styles.circleSection} className="fade-up delay-2">
            <p style={styles.milestone}>{milestone}</p>

            <div style={styles.circleWrap}>
              <svg
                style={styles.ringsvg}
                width="220"
                height="220"
                viewBox="0 0 220 220"
              >
                <circle
                  cx="110"
                  cy="110"
                  r={RADIUS}
                  fill="none"
                  stroke="#e8e5e0"
                  strokeWidth="6"
                />
                <circle
                  cx="110"
                  cy="110"
                  r={RADIUS}
                  fill="none"
                  stroke={
                    flagged
                      ? "#c94c4c"
                      : trustScore < 40
                        ? "#b86b1a"
                        : "#4a7c59"
                  }
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={dashOff}
                  transform="rotate(-90 110 110)"
                  style={{
                    transition: "stroke-dashoffset 0.2s ease, stroke 0.4s ease",
                  }}
                />
              </svg>

              <button
                style={{
                  ...styles.circle,
                  opacity: flagged ? 0.4 : 1,
                  cursor: flagged ? "not-allowed" : "pointer",
                  transform: isPressed ? "scale(0.93)" : "scale(1)",
                  boxShadow: isPressed
                    ? "0 2px 8px rgba(0,0,0,0.10)"
                    : "0 8px 32px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
                  borderColor: flagged
                    ? "#c94c4c"
                    : trustScore < 40
                      ? "#f5dbb5"
                      : "#e8e5e0",
                }}
                onMouseDown={() => !flagged && setIsPressed(true)}
                onMouseUp={(e) => {
                  setIsPressed(false);
                  handleClick(e);
                }}
                onMouseLeave={() => setIsPressed(false)}
                onTouchStart={() => !flagged && setIsPressed(true)}
                onTouchEnd={(e) => {
                  setIsPressed(false);
                  handleClick(e);
                }}
                className="circle-btn"
              >
                <span style={styles.clickCount}>{clicks.toLocaleString()}</span>
                <span style={styles.clickLabel}>
                  {flagged
                    ? "flagged"
                    : clicks === 0
                      ? "click to earn"
                      : "clicks"}
                </span>
              </button>
            </div>

            {/* CPS bar */}
            <div style={styles.cpsWrap}>
              <div style={styles.cpsRow}>
                <span style={styles.cpsLabel}>Clicks / sec</span>
                <span
                  style={{
                    ...styles.cpsVal,
                    color: cps > MAX_CPS ? "#c94c4c" : "#1a1a1a",
                  }}
                >
                  {cps}
                </span>
              </div>
              <div style={styles.cpsTrack}>
                <div
                  style={{
                    ...styles.cpsBar,
                    width: `${cpsBarW}%`,
                    background:
                      cps > MAX_CPS
                        ? "#c94c4c"
                        : cps >= 8
                          ? "#b86b1a"
                          : cps >= 5
                            ? "#4361b8"
                            : "#4a7c59",
                  }}
                />
              </div>
            </div>

            {/* Streak */}
            {currentStreak > 0 && !flagged && (
              <div style={styles.streakBadge}>🔥 {currentStreak} streak</div>
            )}

            {/* Next payout progress */}
            <div style={styles.nextPayoutWrap}>
              <div style={styles.cpsRow}>
                <span style={styles.cpsLabel}>Next ₹0.10 payout</span>
                <span style={styles.cpsLabel}>{clicks % 250} / 250</span>
              </div>
              <div style={styles.cpsTrack}>
                <div
                  style={{
                    ...styles.cpsBar,
                    width: `${progress * 100}%`,
                    background: "#4a7c59",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right — fraud analytics + earnings */}
          <div style={styles.infoSide} className="fade-up delay-3">
            {/* Behaviour analytics */}
            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Behaviour Analytics</h3>
              <div style={styles.fraudGrid}>
                {fraudStats.map((s) => (
                  <div key={s.label} style={styles.fraudCell}>
                    <span style={{ ...styles.fraudVal, color: s.color }}>
                      {s.value}
                    </span>
                    <span style={styles.fraudLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
              {/* Trust bar */}
              <div style={{ marginTop: 14 }}>
                <div style={styles.cpsRow}>
                  <span style={styles.cpsLabel}>Trust Score</span>
                  <span
                    style={{
                      ...styles.cpsLabel,
                      color: trustColor,
                      fontWeight: 600,
                    }}
                  >
                    {trustScore}%
                  </span>
                </div>
                <div style={{ ...styles.cpsTrack, marginTop: 6 }}>
                  <div
                    style={{
                      ...styles.cpsBar,
                      width: `${trustScore}%`,
                      background: trustColor,
                      transition: "width 0.4s ease, background 0.4s ease",
                    }}
                  />
                </div>
              </div>
              {/* Checks list */}
              <div style={styles.checksList}>
                {[
                  { label: "Human speed verified", pass: cps <= MAX_CPS },
                  {
                    label: "Natural rhythm",
                    pass: rhythmVal < RHYTHM_THRESHOLD,
                  },
                  {
                    label: "Mouse activity",
                    pass: clicks < 5 || mouseMoveSinceClick >= 0,
                  },
                  {
                    label: "Interval variance",
                    pass: avgInterval === 0 || avgInterval > MIN_INTERVAL_MS,
                  },
                ].map((c) => (
                  <div key={c.label} style={styles.checkRow}>
                    <span
                      style={{
                        color: c.pass ? "#4a7c59" : "#c94c4c",
                        fontSize: 12,
                      }}
                    >
                      {c.pass ? "✓" : "✗"}
                    </span>
                    <span
                      style={{
                        ...styles.checkLabel,
                        color: c.pass ? "#555" : "#c94c4c",
                      }}
                    >
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Session earnings */}
            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Session Earnings</h3>
              <div style={styles.earningsDisplay}>
                <span
                  style={{
                    ...styles.earningsVal,
                    color: flagged ? "#c94c4c" : "#4a7c59",
                  }}
                >
                  ₹{balance.toFixed(2)}
                </span>
                <span style={styles.earningsLabel}>
                  {flagged ? "under review" : "credited"}
                </span>
              </div>
              <div style={styles.earningsBreakdown}>
                <div style={styles.earningsRow}>
                  <span style={styles.earningsRowLabel}>Rate</span>
                  <span style={styles.earningsRowVal}>₹0.10 / 250 clicks</span>
                </div>
                <div style={styles.earningsRow}>
                  <span style={styles.earningsRowLabel}>Batches credited</span>
                  <span style={styles.earningsRowVal}>
                    {Math.floor(clicks / 250)}
                  </span>
                </div>
                <div style={styles.earningsRow}>
                  <span style={styles.earningsRowLabel}>Clicks to next</span>
                  <span style={styles.earningsRowVal}>
                    {250 - (clicks % 250)}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust note */}
            <div style={{ ...styles.infoCard, ...styles.trustCard }}>
              <div style={styles.trustIcon}>
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p style={styles.trustText}>
                We monitor click speed, rhythm regularity, mouse movement, and
                position variance in real-time to ensure all earnings represent
                genuine human engagement.
              </p>
            </div>
          </div>
        </div>
      </div>

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
  @keyframes rippleOut {
    0%   { opacity: 0.7; transform: translate(-50%,-50%) scale(0); }
    100% { opacity: 0;   transform: translate(-50%,-50%) scale(18); }
  }
  @keyframes floatUp {
    0%   { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-52px); }
  }

  .fade-up { animation: fadeUp 0.5s ease both; }
  .delay-1 { animation-delay: 0.07s; }
  .delay-2 { animation-delay: 0.14s; }
  .delay-3 { animation-delay: 0.21s; }

  .circle-btn { transition: transform 0.08s ease, box-shadow 0.08s ease, border-color 0.3s ease; }

  button { font-family: inherit; }
  * { -webkit-tap-highlight-color: transparent; user-select: none; }
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
    maxWidth: 1080,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #e8e5e0",
  },
  logo: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 20,
    color: "#1a1a1a",
    letterSpacing: "-0.3px",
  },
  navLinks: { display: "flex", alignItems: "center", gap: 24 },
  navLink: { fontSize: 14, color: "#555", fontWeight: 400 },

  page: {
    width: "100%",
    maxWidth: 1080,
    padding: "32px 24px 48px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },

  pageHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 10,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontSize: 12,
    fontWeight: 500,
    color: "#4a7c59",
    background: "#eaf3ec",
    border: "1px solid #c6dfc9",
    borderRadius: 99,
    padding: "4px 12px",
  },
  badgeDot: { width: 7, height: 7, borderRadius: "50%", background: "#4a7c59" },
  pageSub: { fontSize: 14, color: "#888", fontWeight: 300, maxWidth: 420 },

  flaggedBanner: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    background: "#fff5f5",
    border: "1px solid #fecaca",
    borderRadius: 10,
    padding: "14px 18px",
    fontSize: 13.5,
    color: "#c94c4c",
    lineHeight: 1.6,
  },
  warningBanner: {
    background: "#fef3e2",
    border: "1px solid #f5dbb5",
    borderRadius: 10,
    padding: "10px 16px",
    fontSize: 13,
    color: "#b86b1a",
  },

  main: {
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  // Left
  statsSide: {
    flex: "0 0 155px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  colLabel: {
    fontSize: 11,
    color: "#aaa",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  statCard: {
    background: "#fff",
    border: "1px solid #e8e5e0",
    borderRadius: 12,
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
  },
  statCardVal: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 20,
    color: "#0f0f0f",
    letterSpacing: "-0.5px",
  },
  statCardLabel: {
    fontSize: 10,
    color: "#aaa",
    fontWeight: 400,
    textAlign: "center",
  },

  // Centre
  circleSection: {
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  milestone: {
    fontSize: 13,
    color: "#888",
    fontWeight: 400,
    height: 20,
    letterSpacing: "-0.01em",
  },
  circleWrap: {
    position: "relative",
    width: 220,
    height: 220,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ringsvg: { position: "absolute", top: 0, left: 0, pointerEvents: "none" },
  circle: {
    width: 170,
    height: 170,
    borderRadius: "50%",
    background: "#fff",
    border: "1px solid #e8e5e0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    outline: "none",
    position: "relative",
    zIndex: 1,
    gap: 2,
  },
  clickCount: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 42,
    color: "#0f0f0f",
    letterSpacing: "-1.5px",
    lineHeight: 1,
  },
  clickLabel: {
    fontSize: 11,
    color: "#aaa",
    letterSpacing: "0.02em",
    fontWeight: 400,
  },

  cpsWrap: { width: 220, display: "flex", flexDirection: "column", gap: 5 },
  nextPayoutWrap: {
    width: 220,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  cpsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cpsLabel: { fontSize: 11, color: "#aaa" },
  cpsVal: {
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "'DM Serif Display', serif",
  },
  cpsTrack: {
    height: 4,
    background: "#e8e5e0",
    borderRadius: 99,
    overflow: "hidden",
  },
  cpsBar: {
    height: "100%",
    borderRadius: 99,
    transition: "width 0.15s ease, background 0.3s ease",
  },
  streakBadge: {
    fontSize: 12,
    fontWeight: 500,
    color: "#b86b1a",
    background: "#fef3e2",
    border: "1px solid #f5dbb5",
    borderRadius: 99,
    padding: "4px 12px",
  },

  // Right
  infoSide: {
    flex: "0 0 230px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  infoCard: {
    background: "#fff",
    border: "1px solid #e8e5e0",
    borderRadius: 12,
    padding: "18px",
  },
  infoTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 15,
    color: "#0f0f0f",
    marginBottom: 14,
    letterSpacing: "-0.2px",
  },

  // Fraud analytics grid
  fraudGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  fraudCell: { display: "flex", flexDirection: "column", gap: 2 },
  fraudVal: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "'DM Serif Display', serif",
    letterSpacing: "-0.3px",
  },
  fraudLabel: { fontSize: 10, color: "#aaa" },

  checksList: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  checkRow: { display: "flex", alignItems: "center", gap: 8 },
  checkLabel: { fontSize: 12 },

  // Earnings
  earningsDisplay: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 0 14px",
    borderBottom: "1px solid #f0ede8",
    marginBottom: 12,
  },
  earningsVal: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 32,
    letterSpacing: "-1px",
  },
  earningsLabel: { fontSize: 11, color: "#aaa" },
  earningsBreakdown: { display: "flex", flexDirection: "column", gap: 8 },
  earningsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  earningsRowLabel: { fontSize: 12, color: "#888" },
  earningsRowVal: { fontSize: 12, fontWeight: 500, color: "#1a1a1a" },

  // Trust
  trustCard: {
    background: "#eaf3ec",
    border: "1px solid #c6dfc9",
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    padding: "14px 16px",
  },
  trustIcon: { color: "#4a7c59", flexShrink: 0, marginTop: 1 },
  trustText: { fontSize: 11.5, color: "#4a7c59", lineHeight: 1.6 },

  footer: { fontSize: 13, color: "#aaa", paddingBottom: 32, marginTop: "auto" },
  footerLink: { color: "#aaa", borderBottom: "1px solid #ddd" },
};

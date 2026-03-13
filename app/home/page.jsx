"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const tasks = [
  {
    id: 1,
    type: "Click",
    title: "Visit Sponsor Page",
    brand: "TechBrand India",
    reward: "₹1.00",
    time: "~30 sec",
    icon: (
      <svg
        width="18"
        height="18"
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
  },
  {
    id: 2,
    type: "Video",
    title: "Watch Product Ad",
    brand: "QuickMart",
    reward: "₹3.50",
    time: "~2 min",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 3,
    type: "Survey",
    title: "Product Feedback Form",
    brand: "ConsumerInsights",
    reward: "₹20.00",
    time: "~5 min",
    icon: (
      <svg
        width="18"
        height="18"
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
  },
  {
    id: 4,
    type: "Campaign",
    title: "Follow & Share Campaign",
    brand: "StyleUp",
    reward: "₹8.00",
    time: "~1 min",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="16 6 12 2 8 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="12" y1="2" x2="12" y2="15" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 5,
    type: "Click",
    title: "Visit & Explore Store",
    brand: "DealZone",
    reward: "₹0.75",
    time: "~30 sec",
    icon: (
      <svg
        width="18"
        height="18"
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
  },
  {
    id: 6,
    type: "Video",
    title: "Watch App Demo",
    brand: "FinPay",
    reward: "₹5.00",
    time: "~3 min",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const recentActivity = [
  {
    task: "Watch Product Ad",
    brand: "QuickMart",
    amount: "+₹3.50",
    time: "2 min ago",
    status: "credited",
  },
  {
    task: "Visit Sponsor Page",
    brand: "TechBrand India",
    amount: "+₹1.00",
    time: "18 min ago",
    status: "credited",
  },
  {
    task: "Product Feedback Form",
    brand: "ConsumerInsights",
    amount: "+₹20.00",
    time: "1 hr ago",
    status: "credited",
  },
  {
    task: "Follow & Share Campaign",
    brand: "StyleUp",
    amount: "+₹8.00",
    time: "3 hr ago",
    status: "credited",
  },
];

const typeColors = {
  Click: { bg: "#eef2ff", color: "#4361b8" },
  Video: { bg: "#fef3e2", color: "#b86b1a" },
  Survey: { bg: "#eaf3ec", color: "#4a7c59" },
  Campaign: { bg: "#fce8f3", color: "#a03472" },
};

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: null,
    balance: "₹248.50",
    todayEarned: "₹18.00",
    tasksCompleted: 142,
    pendingPayout: "₹100.00",
    photoURL: null,
  });

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await getRedirectResult(auth);
  //     console.log("getRedirectResult():", res);
  //   };

  //   getData();
  // }, []);

  // useEffect(() => {
  //   getRedirectResult(auth).then((result) => {
  //     console.log(result);

  //     if (result.user) {
  //       const credential = GoogleAuthProvider.credentialFromResult(result);

  //       const token = credential.accessToken;
  //       Cookies.get("__Secure_data", JSON.stringify(result.user));

  //       if (token) {
  //         Cookies.set("__Secure_token", token);
  //       }
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (data) => {
      if (!data) {
        router.push("/login");
        return;
      }

      Cookies.set("__Secure_data", JSON.stringify(data.providerData[0] || {}));

      setUser((prev) => ({
        ...prev,
        name: data.displayName,
        photoURL: data.photoURL,
      }));

      const token = await data.getIdToken();
      Cookies.set("__Secure_token", token);
    });

    return () => unsub();
  }, []);

  const walletStats = [
    { value: user.balance, label: "Wallet Balance" },
    { value: user.todayEarned, label: "Earned Today" },
    { value: user.tasksCompleted, label: "Tasks Done" },
    { value: user.pendingPayout, label: "Pending Payout" },
  ];

  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Click", "Video", "Survey", "Campaign"];
  const filtered =
    activeTab === "All" ? tasks : tasks.filter((t) => t.type === activeTab);

  return (
    <div style={styles.root}>
      <style>{css}</style>

      {/* Nav */}
      <nav style={styles.nav}>
        <span style={styles.logo}>Lets Click It</span>
        <div style={styles.navLinks}>
          <a href="#" style={styles.navLink}>
            Tasks
          </a>
          <a href="#" style={styles.navLink}>
            Withdraw
          </a>
          <a href="#" style={styles.navLink}>
            History
          </a>
          <div style={styles.navUser}>
            {user.photoURL === null ? (
              <div className="h-7.5 w-7.5 rounded-full bg-gray-200 animate-pulse"></div>
            ) : (
              <span style={styles.navAvatar}>
                <img
                  style={styles.navAvatar}
                  src={user.photoURL}
                  alt="User Profile Picture"
                />
              </span>
            )}
            {user.name === null ? (
              <div className="w-20 rounded-lg h-7.5 bg-gray-200 animate-pulse"></div>
            ) : (
              <span style={styles.navName}>{user.name}</span>
            )}
          </div>
        </div>
      </nav>

      <div style={styles.page}>
        {/* Welcome + wallet */}
        <div style={styles.topRow}>
          <div className="fade-up">
            <p style={styles.welcomeSub}>Good morning,</p>
            <h1 style={styles.welcomeTitle} className="flex justify-center items-center">
              {user.name === null ? (
                <div className="w-20 inline-block rounded-lg h-7.5 bg-gray-200 animate-pulse"></div>
              ) : (
                <span className="inline">{user.name}</span>
              )}{" "}
              👋
            </h1>
          </div>
          <a href="#" style={styles.withdrawBtn} className="fade-up">
            Withdraw earnings →
          </a>
        </div>

        {/* Wallet stats */}
        <div style={styles.statsRow} className="fade-up delay-1">
          {walletStats.map((s, i) => (
            <div
              key={s.label}
              style={{
                ...styles.stat,
                borderRight:
                  i < walletStats.length - 1 ? "1px solid #e8e5e0" : "none",
              }}
            >
              <span style={styles.statVal}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Main columns */}
        <div style={styles.columns}>
          {/* Left — available tasks */}
          <div style={styles.colLeft}>
            <div style={styles.sectionHead} className="fade-up delay-2">
              <h2 style={styles.sectionTitle}>Available Tasks</h2>
              <p style={styles.sectionSub}>Complete tasks to earn instantly</p>
            </div>

            {/* Tabs */}
            <div style={styles.tabs} className="fade-up delay-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  style={{
                    ...styles.tab,
                    ...(activeTab === t ? styles.tabActive : {}),
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Task cards */}
            <div style={styles.taskList}>
              {filtered.map((task, i) => {
                const tc = typeColors[task.type];
                return (
                  <div
                    key={task.id}
                    style={styles.taskCard}
                    className={`fade-up delay-${i + 3}`}
                  >
                    <div style={styles.taskLeft}>
                      <div
                        style={{
                          ...styles.taskIcon,
                          background: tc.bg,
                          color: tc.color,
                        }}
                      >
                        {task.icon}
                      </div>
                      <div>
                        <div style={styles.taskTitle}>{task.title}</div>
                        <div style={styles.taskMeta}>
                          <span
                            style={{
                              ...styles.typePill,
                              background: tc.bg,
                              color: tc.color,
                            }}
                          >
                            {task.type}
                          </span>
                          <span style={styles.taskBrand}>{task.brand}</span>
                          <span style={styles.taskTime}>{task.time}</span>
                        </div>
                      </div>
                    </div>
                    <div style={styles.taskRight}>
                      <span style={styles.taskReward}>{task.reward}</span>
                      <button style={styles.startBtn}>Start</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — activity + payout info */}
          <div style={styles.colRight}>
            {/* Recent activity */}
            <div style={styles.card} className="fade-up delay-2">
              <h3 style={styles.cardTitle}>Recent Activity</h3>
              <div style={styles.activityList}>
                {recentActivity.map((a, i) => (
                  <div key={i} style={styles.activityRow}>
                    <div>
                      <div style={styles.activityTask}>{a.task}</div>
                      <div style={styles.activityBrand}>
                        {a.brand} · {a.time}
                      </div>
                    </div>
                    <span style={styles.activityAmount}>{a.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payout info */}
            <div style={styles.card} className="fade-up delay-3">
              <h3 style={styles.cardTitle}>Payout</h3>
              <p style={styles.cardDesc}>
                Minimum withdrawal is ₹100. Withdraw via UPI, bank transfer, or
                gift cards.
              </p>
              <div style={styles.payoutRow}>
                <div>
                  <div style={styles.payoutVal}>{user.balance}</div>
                  <div style={styles.payoutLabel}>Available</div>
                </div>
                <a href="#" style={styles.payoutBtn}>
                  Withdraw →
                </a>
              </div>
            </div>

            {/* Trust note */}
            <div
              style={{ ...styles.card, ...styles.trustCard }}
              className="fade-up delay-4"
            >
              <div style={styles.trustIcon}>
                <svg
                  width="16"
                  height="16"
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
                All tasks are verified. Earnings are credited only for genuine
                engagements. Anti-fraud protection is active on your account.
              </p>
            </div>
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
  .delay-5       { animation-delay: 0.35s; }
  .delay-6       { animation-delay: 0.42s; }
  .delay-7       { animation-delay: 0.49s; }
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

  /* Nav */
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
  navUser: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginLeft: 8,
  },
  navAvatar: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "#1a1a1a",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  navName: {
    fontSize: 14,
    fontWeight: 500,
    color: "#1a1a1a",
  },

  /* Page layout */
  page: {
    width: "100%",
    maxWidth: 1080,
    padding: "36px 24px 48px",
  },

  /* Top row */
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 28,
    flexWrap: "wrap",
    gap: 12,
  },
  welcomeSub: {
    fontSize: 13,
    color: "#888",
    marginBottom: 4,
    fontWeight: 400,
  },
  welcomeTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 32,
    color: "#0f0f0f",
    letterSpacing: "-0.5px",
  },
  withdrawBtn: {
    fontSize: 14,
    fontWeight: 500,
    color: "#1a1a1a",
    background: "#fff",
    border: "1px solid #e8e5e0",
    borderRadius: 8,
    padding: "9px 18px",
  },

  /* Stats */
  statsRow: {
    display: "flex",
    background: "#fff",
    border: "1px solid #e8e5e0",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 36,
    flexWrap: "wrap",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "18px 0",
    flex: "1 1 120px",
  },
  statVal: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 26,
    color: "#0f0f0f",
    letterSpacing: "-0.5px",
  },
  statLabel: {
    fontSize: 11,
    color: "#888",
    marginTop: 3,
    fontWeight: 400,
  },

  /* Columns */
  columns: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  colLeft: {
    flex: "1 1 540px",
    minWidth: 0,
  },
  colRight: {
    flex: "0 0 280px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  /* Section head */
  sectionHead: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 20,
    color: "#0f0f0f",
    letterSpacing: "-0.3px",
    marginBottom: 3,
  },
  sectionSub: {
    fontSize: 13,
    color: "#888",
    fontWeight: 300,
  },

  /* Tabs */
  tabs: {
    display: "flex",
    gap: 6,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  tab: {
    fontSize: 13,
    fontWeight: 400,
    padding: "5px 14px",
    borderRadius: 99,
    border: "1px solid #e8e5e0",
    background: "transparent",
    color: "#555",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.15s",
  },
  tabActive: {
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #1a1a1a",
  },

  /* Task list */
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  taskCard: {
    background: "#fff",
    border: "1px solid #e8e5e0",
    borderRadius: 12,
    padding: "16px 18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  taskLeft: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    minWidth: 0,
  },
  taskIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: "#0f0f0f",
    marginBottom: 5,
  },
  taskMeta: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  typePill: {
    fontSize: 11,
    fontWeight: 500,
    padding: "2px 8px",
    borderRadius: 99,
  },
  taskBrand: {
    fontSize: 12,
    color: "#888",
  },
  taskTime: {
    fontSize: 12,
    color: "#aaa",
  },
  taskRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 8,
    flexShrink: 0,
  },
  taskReward: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 17,
    color: "#0f0f0f",
    letterSpacing: "-0.3px",
  },
  startBtn: {
    fontSize: 13,
    fontWeight: 500,
    padding: "5px 16px",
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },

  /* Right cards */
  card: {
    background: "#fff",
    border: "1px solid #e8e5e0",
    borderRadius: 14,
    padding: "20px",
  },
  cardTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 16,
    color: "#0f0f0f",
    marginBottom: 14,
    letterSpacing: "-0.2px",
  },
  cardDesc: {
    fontSize: 12.5,
    color: "#777",
    lineHeight: 1.6,
    fontWeight: 300,
    marginBottom: 16,
  },

  /* Activity */
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  activityRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottom: "1px solid #f0ede8",
  },
  activityTask: {
    fontSize: 13,
    fontWeight: 500,
    color: "#1a1a1a",
    marginBottom: 2,
  },
  activityBrand: {
    fontSize: 11,
    color: "#aaa",
  },
  activityAmount: {
    fontSize: 13,
    fontWeight: 600,
    color: "#4a7c59",
    flexShrink: 0,
  },

  /* Payout */
  payoutRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  payoutVal: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 22,
    color: "#0f0f0f",
    letterSpacing: "-0.5px",
  },
  payoutLabel: {
    fontSize: 11,
    color: "#aaa",
    marginTop: 2,
  },
  payoutBtn: {
    fontSize: 13,
    fontWeight: 500,
    color: "#1a1a1a",
    background: "#f4f2ef",
    border: "1px solid #e8e5e0",
    borderRadius: 6,
    padding: "7px 14px",
  },

  /* Trust */
  trustCard: {
    background: "#eaf3ec",
    border: "1px solid #c6dfc9",
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },
  trustIcon: {
    color: "#4a7c59",
    flexShrink: 0,
    marginTop: 1,
  },
  trustText: {
    fontSize: 12,
    color: "#4a7c59",
    lineHeight: 1.6,
    fontWeight: 400,
  },

  /* Footer */
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

import  { useState, useEffect, useRef } from "react";

const SKILLS = [
  { name: "React JS", level: 90, icon: "⚛" },
  { name: "JavaScript", level: 88, icon: "JS" },
  { name: "Java", level: 80, icon: "☕" },
  { name: "Python", level: 82, icon: "🐍" },
  { name: "API Testing", level: 85, icon: "🔌" },
  { name: "AI Tools", level: 87, icon: "🤖" },
  { name: "Data Analytics", level: 78, icon: "📊" },
  { name: "GitHub", level: 88, icon: "🐙" },
  { name: "Node JS", level: 75, icon: "🟢" },
];

const PROJECTS = [
  {
    id: "01",
    title: "Battery Terminal Detection",
    description:
      "AI-powered battery terminal detection system using Raspberry Pi and camera module. Real-time computer vision pipeline with 94% accuracy.",
    tech: ["Python", "AI", "Raspberry Pi", "OpenCV"],
    color: "#00ffa3",
  },
  {
    id: "02",
    title: "React API Application",
    description:
      "Modern React application with Axios API integration, dynamic state management, and a fully responsive UI designed for performance.",
    tech: ["React", "Axios", "JavaScript", "REST API"],
    color: "#38bdf8",
  },
  {
    id: "03",
    title: "Portfolio Website",
    description:
      "Personal portfolio website with dark mode, AI features, and smooth animations. Built with Vite for lightning-fast performance.",
    tech: ["React", "CSS", "Vite", "AI"],
    color: "#f472b6",
  },
];

const NAV = ["home", "about", "skills", "education", "projects", "contact"];

const CHAT_KB = [
  { keys: ["hire", "available", "job", "opportunity"], ans: "Kanishkumar is actively seeking full-time roles in React development, AI integration, and frontend engineering. Reach out at kanishkumar940@gmail.com!" },
  { keys: ["skill", "tech", "know", "language", "stack"], ans: "He's skilled in React JS, JavaScript, Java, Python, Node JS, API Testing, AI Tools, Data Analytics, and GitHub — a well-rounded full-spectrum developer." },
  { keys: ["project", "work", "built", "made"], ans: "He built an AI-powered Battery Terminal Detection system (Python + Raspberry Pi), a React API Application, and this very portfolio. Impressive, right?" },
  { keys: ["education", "degree", "college", "study"], ans: "He holds a B.E. in Electronics and Communication Engineering from Jerusalem College of Engineering, graduated 2025." },
  { keys: ["contact", "email", "reach", "connect", "message"], ans: "Email: kanishkumar940@gmail.com | GitHub: github.com/Kanishkumarp" },
  { keys: ["ai", "machine", "learning", "ml"], ans: "Kanishkumar has hands-on AI experience — from building computer vision systems with Raspberry Pi to using modern AI tools in web development workflows." },
  { keys: ["react", "frontend", "web"], ans: "React JS is his primary weapon. He builds fast, responsive, component-driven UIs with modern hooks, state management, and API integrations." },
  { keys: ["hello", "hi", "hey", "start"], ans: "Hey! 👋 I'm Kanishkumar's portfolio AI. Ask me about his skills, projects, experience, or how to hire him!" },
];

function getAIResponse(msg) {
  const lower = msg.toLowerCase();
  for (const { keys, ans } of CHAT_KB) {
    if (keys.some((k) => lower.includes(k))) return ans;
  }
  return "Great question! Kanishkumar is a React developer & AI enthusiast. Try asking about his skills, projects, or how to hire him.";
}

function useTypewriter(text, speed = 35) {
  const [displayed, setDisplayed] = useState("");
  const prevTextRef = useRef("");

  useEffect(() => {
    if (prevTextRef.current !== text) {
      prevTextRef.current = text;
      setDisplayed("");
    }

    if (!text) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayed;
}

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function SkillBar({ skill, inView }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", color: "#e2e8f0" }}>
          <span style={{ marginRight: "8px", fontSize: "15px" }}>{skill.icon}</span>
          {skill.name}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#38bdf8" }}>
          {skill.level}%
        </span>
      </div>
      <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: inView ? `${skill.level}%` : "0%",
            background: "linear-gradient(90deg, #38bdf8, #00ffa3)",
            borderRadius: "2px",
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey! 👋 I'm Kanishkumar's AI assistant. Ask me about his skills, projects, or how to hire him!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function send() {
    const msg = input.trim();
    if (!msg) return;
    setMessages((p) => [...p, { from: "user", text: msg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((p) => [...p, { from: "bot", text: getAIResponse(msg) }]);
      setTyping(false);
    }, 900);
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed", bottom: "28px", right: "28px", zIndex: 9999,
          width: "58px", height: "58px", borderRadius: "50%",
          background: "linear-gradient(135deg,#38bdf8,#00ffa3)",
          border: "none", cursor: "pointer", fontSize: "22px",
          boxShadow: "0 0 30px rgba(56,189,248,0.5)",
          transition: "transform 0.2s, box-shadow 0.2s",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        aria-label="Chat"
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div style={{
          position: "fixed", bottom: "100px", right: "28px", zIndex: 9998,
          width: "340px", maxHeight: "500px",
          background: "#0d1117", border: "1px solid rgba(56,189,248,0.25)",
          borderRadius: "16px", display: "flex", flexDirection: "column",
          overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          animation: "chatSlide 0.25s ease",
        }}>
          <div style={{
            padding: "14px 16px", background: "rgba(56,189,248,0.08)",
            borderBottom: "1px solid rgba(56,189,248,0.15)",
            display: "flex", alignItems: "center", gap: "10px",
          }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "linear-gradient(135deg,#38bdf8,#00ffa3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "13px", color: "#0d1117",
            }}>K</div>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "14px", color: "#e2e8f0" }}>Kanishkumar AI</div>
              <div style={{ fontSize: "11px", color: "#00ffa3" }}>● Active now</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                maxWidth: "82%", padding: "10px 14px", borderRadius: "12px",
                fontSize: "13px", lineHeight: "1.55",
                alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                background: m.from === "user"
                  ? "linear-gradient(135deg,#38bdf8,#0284c7)"
                  : "rgba(255,255,255,0.06)",
                color: m.from === "user" ? "#0d1117" : "#cbd5e1",
                borderBottomRightRadius: m.from === "user" ? "3px" : "12px",
                borderBottomLeftRadius: m.from === "bot" ? "3px" : "12px",
                fontFamily: "'DM Sans',sans-serif",
              }}>{m.text}</div>
            ))}
            {typing && (
              <div style={{
                alignSelf: "flex-start", background: "rgba(255,255,255,0.06)",
                borderRadius: "12px", borderBottomLeftRadius: "3px",
                padding: "12px 16px", display: "flex", gap: "5px",
              }}>
                {[0, 1, 2].map((d) => (
                  <span key={d} style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "#38bdf8", display: "inline-block",
                    animation: `blink 1s ${d * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "8px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask me anything…"
              style={{
                flex: 1, background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(56,189,248,0.2)", borderRadius: "8px",
                padding: "9px 12px", color: "#e2e8f0",
                fontFamily: "'DM Sans',sans-serif", fontSize: "13px", outline: "none",
              }}
            />
            <button
              onClick={send}
              style={{
                background: "linear-gradient(135deg,#38bdf8,#00ffa3)",
                border: "none", borderRadius: "8px", width: "38px",
                cursor: "pointer", color: "#0d1117", fontWeight: 700, fontSize: "16px",
              }}
            >➤</button>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [aiText, setAiText] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showHireForm, setShowHireForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");
  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef);
  const heroTitle = useTypewriter("Kanishkumar P", 70);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("kanishkumar940@gmail.com");
      setAiText("Email copied to clipboard!");
    } catch (error) {
      setAiText("Copy failed. Please copy the email manually.");
      console.error("Clipboard copy failed:", error);
    }
  };

  const handleHireSubmit = () => {
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormStatus("Please fill all fields");
      return;
    }
    console.log("Hire Form Submitted:", formData);
    setFormStatus("✓ Thanks! I'll get back to you soon.");
    setTimeout(() => {
      setShowHireForm(false);
      setFormData({ name: "", email: "", message: "" });
      setFormStatus("");
    }, 2000);
  };

  useEffect(() => {
    const handler = () => {
      const sections = NAV.map((id) => document.getElementById(id));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollY) {
          setActiveSection(NAV[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const bg = darkMode
    ? `radial-gradient(ellipse at 20% 20%, rgba(56,189,248,0.07) 0%, transparent 50%),
       radial-gradient(ellipse at 80% 80%, rgba(0,255,163,0.05) 0%, transparent 50%),
       #060a10`
    : "#f1f5f9";

  const fg = darkMode ? "#e2e8f0" : "#0f172a";
  const card = darkMode
    ? { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }
    : { background: "#ffffff", border: "1px solid #e2e8f0" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #38bdf8; border-radius: 2px; }

        @keyframes blink {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        @keyframes chatSlide {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(56,189,248,0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 18px rgba(56,189,248,0); }
          100% { transform: scale(0.95); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gridScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .nav-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid rgba(56,189,248,0.25);
          background: transparent;
          color: rgba(226,232,240,0.6);
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
        }
        .nav-btn:hover, .nav-btn.active {
          background: rgba(56,189,248,0.12);
          color: #38bdf8;
          border-color: rgba(56,189,248,0.5);
        }
        .nav-btn.active {
          box-shadow: 0 0 12px rgba(56,189,248,0.2);
        }

        .project-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 32px;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: 16px;
        }
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }
        .project-card:hover::before { opacity: 1; }

        .skill-chip {
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          transition: all 0.2s;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 24px;
          border-radius: 12px;
          border: 1px solid rgba(56,189,248,0.15);
          background: rgba(56,189,248,0.04);
          text-decoration: none;
          color: #e2e8f0;
          transition: all 0.25s;
          font-family: 'DM Sans', sans-serif;
        }
        .contact-link:hover {
          border-color: rgba(56,189,248,0.5);
          background: rgba(56,189,248,0.1);
          transform: translateX(6px);
        }

        .cta-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          padding: 14px 28px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.25s;
          font-weight: 500;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-block;
        }
        .cta-primary {
          background: linear-gradient(135deg, #38bdf8, #00ffa3);
          color: #060a10;
          box-shadow: 0 0 30px rgba(56,189,248,0.3);
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 45px rgba(56,189,248,0.5);
        }
        .cta-outline {
          background: transparent;
          color: #38bdf8;
          border: 1px solid rgba(56,189,248,0.5);
        }
        .cta-outline:hover {
          background: rgba(56,189,248,0.08);
          transform: translateY(-2px);
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
          color: #38bdf8;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-label::before {
          content: '';
          width: 24px;
          height: 1px;
          background: #38bdf8;
        }

        .grid-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          opacity: 0.35;
        }
        .grid-bg svg {
          width: 100%;
          height: 200%;
          animation: gridScroll 25s linear infinite;
        }
      `}</style>

      <div style={{ background: bg, color: fg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", transition: "background 0.5s" }}>

        {/* animated grid bg */}
        {darkMode && (
          <div className="grid-bg">
            <svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(56,189,248,0.18)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="1200" height="1200" fill="url(#grid)"/>
            </svg>
          </div>
        )}

        {/* ── NAVBAR ── */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 1000,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 40px",
          backdropFilter: "blur(20px)",
          background: darkMode ? "rgba(6,10,16,0.85)" : "rgba(241,245,249,0.9)",
          borderBottom: "1px solid rgba(56,189,248,0.1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "8px",
              background: "linear-gradient(135deg,#38bdf8,#00ffa3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "16px", color: "#060a10",
            }}>K</div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "16px", color: darkMode ? "#e2e8f0" : "#0f172a" }}>
              Kanishkumar
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {NAV.map((item) => (
              <a key={item} href={`#${item}`} style={{ textDecoration: "none" }}>
                <button className={`nav-btn${activeSection === item ? " active" : ""}`}
                  style={!darkMode ? { color: "#334155", borderColor: "#cbd5e1" } : {}}>
                  {item}
                </button>
              </a>
            ))}
            <button
              className="nav-btn"
              onClick={() => setDarkMode(!darkMode)}
              style={{ borderColor: "#38bdf8", color: "#38bdf8" }}
            >
              {darkMode ? "☀" : "◑"}
            </button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section id="home" style={{ maxWidth: "1100px", margin: "0 auto", padding: "110px 40px 80px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "720px", animation: "fadeUp 0.7s ease both" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", color: "#38bdf8", marginBottom: "20px", letterSpacing: "0.1em" }}>
              <span style={{ opacity: 0.5 }}>// available for hire</span>
              <span style={{
                display: "inline-block", width: "8px", height: "14px",
                background: "#38bdf8", marginLeft: "6px", verticalAlign: "middle",
                animation: "cursor 1s infinite",
              }} />
            </div>

            <h1 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "clamp(3rem,7vw,5.5rem)", lineHeight: "1.05",
              letterSpacing: "-0.03em",
              color: darkMode ? "#f8fafc" : "#0f172a",
              marginBottom: "6px",
            }}>
              {heroTitle}
              <span style={{ color: "#38bdf8" }}>.</span>
            </h1>

            <h2 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 700,
              fontSize: "clamp(1rem,2.5vw,1.5rem)",
              background: "linear-gradient(135deg,#38bdf8,#00ffa3)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: "28px", letterSpacing: "0.01em",
            }}>
              React Developer · AI Enthusiast · Data Analytics
            </h2>

            <p style={{
              fontSize: "1.08rem", lineHeight: "1.85",
              color: darkMode ? "rgba(226,232,240,0.65)" : "#475569",
              maxWidth: "580px", marginBottom: "42px",
            }}>
              ECE graduate building intelligent web experiences. I turn complex ideas into
              clean, performant interfaces — powered by React, driven by AI, measured by data.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="https://github.com/Kanishkumarp" target="_blank" rel="noreferrer" className="cta-btn cta-primary">
                View GitHub →
              </a>
              <a href="https://www.linkedin.com/in/kanishkumarp" target="_blank" rel="noreferrer" className="cta-btn cta-primary">
                View LinkedIn →
              </a>
              <button onClick={() => setShowHireForm(true)} className="cta-btn cta-outline" type="button">
                Hire Me
              </button>
            </div>
          </div>

          {/* floating stat cards */}
          <div style={{
            position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", gap: "16px",
          }}>
            {[
              { num: "3+", label: "Projects Shipped" },
              { num: "9", label: "Technologies" },
              { num: "2025", label: "Grad Year" },
            ].map((s) => (
              <div key={s.label} style={{
                background: darkMode ? "rgba(255,255,255,0.04)" : "#fff",
                border: "1px solid rgba(56,189,248,0.2)",
                borderRadius: "12px", padding: "20px 24px", textAlign: "center",
                backdropFilter: "blur(10px)",
                animation: "float 4s ease-in-out infinite",
              }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "#38bdf8" }}>{s.num}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: darkMode ? "rgba(226,232,240,0.45)" : "#64748b", letterSpacing: "0.1em", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px", position: "relative", zIndex: 1 }}>
          <div className="section-label">About Me</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: darkMode ? "#f8fafc" : "#0f172a", marginBottom: "40px" }}>
            The developer behind the code
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            <div style={{ ...card, borderRadius: "16px", padding: "36px" }}>
              <p style={{ fontSize: "1.05rem", lineHeight: "1.9", color: darkMode ? "rgba(226,232,240,0.7)" : "#475569" }}>
                I'm an Electronics and Communication Engineering graduate with a passion for
                building things on the web that are both beautiful and intelligent. I love the
                intersection of React development, AI integration, and data-driven design.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: "1.9", color: darkMode ? "rgba(226,232,240,0.7)" : "#475569", marginTop: "20px" }}>
                My goal: build innovative software products and continuously sharpen my
                technical craft in modern and emerging technologies.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: "🎯", title: "Problem Solver", desc: "I approach every challenge systematically and build clean, maintainable solutions." },
                { icon: "🚀", title: "Fast Learner", desc: "Picked up AI tooling, API testing, and data analytics alongside my core stack." },
                { icon: "🤝", title: "Team Player", desc: "Collaborative, communicative, and driven to ship products that matter." },
              ].map((item) => (
                <div key={item.title} style={{
                  ...card, borderRadius: "12px", padding: "20px 24px",
                  display: "flex", gap: "14px", alignItems: "flex-start",
                  transition: "border-color 0.2s",
                }}>
                  <span style={{ fontSize: "22px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "14px", color: darkMode ? "#f8fafc" : "#0f172a", marginBottom: "4px" }}>{item.title}</div>
                    <div style={{ fontSize: "13px", color: darkMode ? "rgba(226,232,240,0.55)" : "#64748b", lineHeight: "1.6" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" ref={skillsRef} style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px", position: "relative", zIndex: 1 }}>
          <div className="section-label">Skills</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: darkMode ? "#f8fafc" : "#0f172a", marginBottom: "40px" }}>
            Technical expertise
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
            <div>
              {SKILLS.slice(0, 5).map((s) => <SkillBar key={s.name} skill={s} inView={skillsInView} />)}
            </div>
            <div>
              {SKILLS.slice(5).map((s) => <SkillBar key={s.name} skill={s} inView={skillsInView} />)}
              <div style={{ marginTop: "28px", ...card, borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#38bdf8", marginBottom: "12px" }}>// also comfortable with</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["REST APIs", "Responsive Design", "Agile", "VS Code", "Postman"].map((t) => (
                    <span key={t} className="skill-chip" style={{ borderColor: "rgba(56,189,248,0.25)", color: darkMode ? "rgba(226,232,240,0.65)" : "#475569" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section id="education" style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px", position: "relative", zIndex: 1 }}>
          <div className="section-label">Education</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: darkMode ? "#f8fafc" : "#0f172a", marginBottom: "40px" }}>
            Academic foundation
          </h2>
          <div style={{ ...card, borderRadius: "16px", padding: "40px", display: "flex", gap: "32px", alignItems: "center" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "16px", flexShrink: 0,
              background: "linear-gradient(135deg,rgba(56,189,248,0.15),rgba(0,255,163,0.1))",
              border: "1px solid rgba(56,189,248,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px",
            }}>🎓</div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#38bdf8", letterSpacing: "0.15em", marginBottom: "8px" }}>UNDERGRADUATE DEGREE</div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: darkMode ? "#f8fafc" : "#0f172a", marginBottom: "6px" }}>
                B.E Electronics & Communication Engineering
              </h3>
              <p style={{ fontSize: "1rem", color: darkMode ? "rgba(226,232,240,0.65)" : "#475569", marginBottom: "6px" }}>
                Jerusalem College of Engineering
              </p>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(0,255,163,0.1)", border: "1px solid rgba(0,255,163,0.25)",
                borderRadius: "20px", padding: "4px 14px",
                fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#00ffa3",
              }}>
                ✓ Graduated 2025
              </div>
            </div>
          </div>
        </section>

        {/* ── AI SECTION ── */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px 80px", position: "relative", zIndex: 1 }}>
          <div style={{
            ...card, borderRadius: "16px", padding: "40px",
            background: darkMode ? "rgba(56,189,248,0.05)" : "#f0f9ff",
            border: "1px solid rgba(56,189,248,0.2)",
          }}>
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
                background: "linear-gradient(135deg,#38bdf8,#00ffa3)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px",
              }}>🤖</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.25rem", color: darkMode ? "#f8fafc" : "#0f172a", marginBottom: "16px" }}>
                  AI Intro Generator
                </h3>
                <button
                  onClick={() => setAiText("Kanishkumar is a passionate React developer and AI enthusiast focused on creating intelligent, modern web applications. With hands-on experience in real-time computer vision, data analytics, and full-stack React development — he's ready to build the next generation of digital products.")}
                  className="cta-btn cta-primary"
                  style={{ marginBottom: "20px" }}
                >
                  ✦ Generate AI Intro
                </button>
                {aiText && (
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", lineHeight: "1.8",
                    color: darkMode ? "rgba(226,232,240,0.8)" : "#334155",
                    borderLeft: "3px solid #38bdf8", paddingLeft: "18px",
                    animation: "fadeUp 0.5s ease",
                  }}>{aiText}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px", position: "relative", zIndex: 1 }}>
          <div className="section-label">Projects</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: darkMode ? "#f8fafc" : "#0f172a", marginBottom: "40px" }}>
            Things I've built
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "24px" }}>
            {PROJECTS.map((p) => (
              <div key={p.id} className="project-card"
                onClick={() => setSelectedProject(p)}
                style={{
                  ...!darkMode ? { background: "#fff", border: "1px solid #e2e8f0" } : {},
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: "scale(1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = `0 12px 24px ${p.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: "36px", fontWeight: 500,
                    color: darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", lineHeight: 1,
                  }}>{p.id}</span>
                  <span style={{
                    width: "10px", height: "10px", borderRadius: "50%",
                    background: p.color, display: "block",
                    boxShadow: `0 0 12px ${p.color}`,
                  }} />
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.15rem", color: darkMode ? "#f8fafc" : "#0f172a", marginBottom: "12px" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.75", color: darkMode ? "rgba(226,232,240,0.6)" : "#475569", marginBottom: "20px" }}>
                  {p.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                  {p.tech.map((t) => (
                    <span key={t} className="skill-chip" style={{ borderColor: p.color + "40", color: p.color, background: p.color + "10" }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(p);
                    }}
                    style={{
                      fontFamily: "'JetBrains Mono',monospace", fontSize: "12px",
                      color: "#fff", textDecoration: "none", letterSpacing: "0.08em",
                      padding: "8px 14px", borderRadius: "6px",
                      background: p.color, border: "none", cursor: "pointer",
                      transition: "all 0.2s",
                      fontWeight: 600,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${p.color}80`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    📱 View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECT MODAL ── */}
        {selectedProject && (
          <div
            onClick={() => setSelectedProject(null)}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 2000, backdropFilter: "blur(10px)", animation: "fadeIn 0.3s ease",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: darkMode ? "#0f172a" : "#fff",
                borderRadius: "16px", padding: "40px", maxWidth: "600px",
                width: "90%", border: `2px solid ${selectedProject.color}40`,
                animation: "slideUp 0.3s ease",
                maxHeight: "80vh", overflowY: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "20px" }}>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.8rem", color: selectedProject.color, margin: 0 }}>
                  {selectedProject.title}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    background: "transparent", border: "none", fontSize: "28px",
                    cursor: "pointer", padding: "0", color: darkMode ? "#e2e8f0" : "#0f172a",
                  }}
                >
                  ✕
                </button>
              </div>

              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: darkMode ? "rgba(226,232,240,0.7)" : "#475569", marginBottom: "20px" }}>
                {selectedProject.description}
              </p>

              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: darkMode ? "#e2e8f0" : "#0f172a", marginBottom: "12px", fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Technologies Used
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {selectedProject.tech.map((t) => (
                    <span key={t} style={{
                      padding: "6px 12px", borderRadius: "6px",
                      background: selectedProject.color + "20",
                      color: selectedProject.color,
                      fontFamily: "'JetBrains Mono',monospace", fontSize: "12px",
                      fontWeight: 600,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    flex: 1, padding: "12px 20px", borderRadius: "8px",
                    background: "transparent", color: selectedProject.color,
                    border: `1px solid ${selectedProject.color}60`,
                    fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "13px", cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = selectedProject.color + "15";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── CONTACT ── */}
        <section id="contact" style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px 120px", position: "relative", zIndex: 1 }}>
          <div className="section-label">Contact</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: darkMode ? "#f8fafc" : "#0f172a", marginBottom: "12px" }}>
            Let's build something great
          </h2>
          <p style={{ fontSize: "1.05rem", color: darkMode ? "rgba(226,232,240,0.55)" : "#64748b", marginBottom: "40px", maxWidth: "480px", lineHeight: 1.7 }}>
            I'm actively looking for roles in React development and AI-powered products. Drop me a message — I respond fast.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "480px" }}>
            <button onClick={copyEmail} className="contact-link" style={!darkMode ? { background: "#f8fafc", borderColor: "#e2e8f0" } : {}} type="button">
              <span style={{ fontSize: "22px" }}>📧</span>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#38bdf8", letterSpacing: "0.1em", marginBottom: "2px" }}>EMAIL</div>
                <div style={{ fontSize: "15px" }}>kanishkumar940@gmail.com</div>
              </div>
            </button>
            <a href="https://github.com/Kanishkumarp" target="_blank" rel="noreferrer" className="contact-link" style={!darkMode ? { background: "#f8fafc", borderColor: "#e2e8f0" } : {}}>
              <span style={{ fontSize: "22px" }}>💻</span>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#38bdf8", letterSpacing: "0.1em", marginBottom: "2px" }}>GITHUB</div>
                <div style={{ fontSize: "15px" }}>github.com/Kanishkumarp</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/kanishkumarp" target="_blank" rel="noreferrer" className="contact-link" style={!darkMode ? { background: "#f8fafc", borderColor: "#e2e8f0" } : {}}>
              <span style={{ fontSize: "22px" }}>🔗</span>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#38bdf8", letterSpacing: "0.1em", marginBottom: "2px" }}>LINKEDIN</div>
                <div style={{ fontSize: "15px" }}>linkedin.com/in/kanishkumarp</div>
              </div>
            </a>
          </div>

          <div style={{ marginTop: "50px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: darkMode ? "rgba(226,232,240,0.25)" : "#94a3b8", letterSpacing: "0.08em" }}>
              © 2025 Kanishkumar P · Built with React & ♥
            </p>
          </div>
        </section>

        {/* ── HIRE ME MODAL ── */}
        {showHireForm && (
          <div
            onClick={() => setShowHireForm(false)}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 2000, backdropFilter: "blur(10px)", animation: "fadeIn 0.3s ease",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: darkMode ? "#0f172a" : "#fff",
                borderRadius: "16px", padding: "40px", maxWidth: "500px",
                width: "90%", border: "2px solid rgba(56,189,248,0.4)",
                animation: "slideUp 0.3s ease",
              }}
            >
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "#38bdf8", margin: "0 0 24px 0" }}>
                Let's work together
              </h2>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#38bdf8", letterSpacing: "0.1em", marginBottom: "8px" }}>
                  YOUR NAME
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: "8px",
                    background: darkMode ? "rgba(255,255,255,0.05)" : "#f0f9ff",
                    border: "1px solid rgba(56,189,248,0.2)", color: darkMode ? "#e2e8f0" : "#0f172a",
                    fontFamily: "'DM Sans',sans-serif", fontSize: "14px", outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#38bdf8", letterSpacing: "0.1em", marginBottom: "8px" }}>
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: "8px",
                    background: darkMode ? "rgba(255,255,255,0.05)" : "#f0f9ff",
                    border: "1px solid rgba(56,189,248,0.2)", color: darkMode ? "#e2e8f0" : "#0f172a",
                    fontFamily: "'DM Sans',sans-serif", fontSize: "14px", outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#38bdf8", letterSpacing: "0.1em", marginBottom: "8px" }}>
                  MESSAGE
                </label>
                <textarea
                  placeholder="Tell me about the opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: "8px", minHeight: "120px",
                    background: darkMode ? "rgba(255,255,255,0.05)" : "#f0f9ff",
                    border: "1px solid rgba(56,189,248,0.2)", color: darkMode ? "#e2e8f0" : "#0f172a",
                    fontFamily: "'DM Sans',sans-serif", fontSize: "14px", outline: "none",
                    resize: "none", boxSizing: "border-box",
                  }}
                />
              </div>

              {formStatus && (
                <div style={{
                  padding: "12px 16px", borderRadius: "8px",
                  background: formStatus.includes("✓") ? "rgba(0,255,163,0.1)" : "rgba(255,107,107,0.1)",
                  color: formStatus.includes("✓") ? "#00ffa3" : "#ff6b6b",
                  fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
                  marginBottom: "16px", textAlign: "center",
                }}>{formStatus}</div>
              )}

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleHireSubmit}
                  style={{
                    flex: 1, padding: "14px 20px", borderRadius: "8px",
                    background: "linear-gradient(135deg,#38bdf8,#00ffa3)",
                    color: "#0f172a", border: "none", fontWeight: 600,
                    fontFamily: "'JetBrains Mono',monospace", fontSize: "13px",
                    cursor: "pointer", transition: "all 0.2s", textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  Send Message
                </button>
                <button
                  onClick={() => setShowHireForm(false)}
                  style={{
                    flex: 1, padding: "14px 20px", borderRadius: "8px",
                    background: "transparent", color: "#38bdf8",
                    border: "1px solid rgba(56,189,248,0.5)", fontWeight: 600,
                    fontFamily: "'JetBrains Mono',monospace", fontSize: "13px",
                    cursor: "pointer", transition: "all 0.2s", textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(56,189,248,0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <ChatBox />
      </div>
    </>
  );
}

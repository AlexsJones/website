"use client";
import { useEffect, useRef, useState } from "react";

type GeoPage = "home" | "about" | "blog" | "speaking" | "cv" | "research";

function GeoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(0,0,0,0.6)", border: "2px ridge #808080", padding: "15px" }}>
      <h2 className="geo-rainbow" style={{ fontSize: "24px", fontWeight: "bold", textShadow: "2px 2px #000", margin: "0 0 12px 0" }}>
        {title}
      </h2>
      <div style={{ color: "#ffffff", fontSize: "14px", lineHeight: "1.8" }}>
        {children}
      </div>
    </div>
  );
}

function PageHome({ onNavigate }: { onNavigate: (p: GeoPage) => void }) {
  return (
    <div style={{ background: "rgba(0,0,0,0.6)", border: "2px ridge #808080", padding: "15px" }}>
      <p style={{ color: "#ffffff", fontSize: "16px", lineHeight: "1.8" }}>
        <span className="geo-blink" style={{ color: "#ff0000", fontWeight: "bold" }}>★ NEW! ★</span>{" "}
        Hey there!!! Welcome to my homepage!!! My name is <span style={{ color: "#ffff00" }}>Alex Jones</span> and
        I am a <span style={{ color: "#00ffff" }}>Principal Engineer</span> at{" "}
        <span className="geo-rainbow" style={{ fontWeight: "bold" }}>AWS</span>!!!
      </p>

      <p style={{ color: "#ffffff", fontSize: "14px", lineHeight: "1.8", marginTop: "12px" }}>
        I like <span style={{ color: "#ff00ff" }}>Kubernetes</span>,{" "}
        <span style={{ color: "#00ff00" }}>distributed systems</span>,{" "}
        <span style={{ color: "#ffff00" }}>Rust</span>, and{" "}
        <span style={{ color: "#00ffff" }}>open source</span>.
        I live in <span style={{ color: "#ff8000" }}>London</span> 🇬🇧
      </p>

      <div style={{ color: "#ff00ff", letterSpacing: "4px", margin: "15px 0", textAlign: "center" }}>
        ·····················································
      </div>

      {/* Research section */}
      <div style={{ border: "2px solid #00ff00", padding: "12px", margin: "15px 0", background: "rgba(0,128,0,0.1)" }}>
        <h2 style={{ color: "#00ff00", fontSize: "20px", margin: "0 0 8px 0" }}>
          🔬 My Research{" "}
          <span className="geo-blink" style={{ color: "#ff0000", fontSize: "14px" }}>HOT!</span>
        </h2>
        <p style={{ color: "#ffffff", fontSize: "14px", lineHeight: "1.6" }}>
          I wrote a paper about why <span style={{ color: "#ffff00" }}>2 million AI agents</span> produced{" "}
          <span style={{ color: "#ff0000", fontWeight: "bold" }}>ZERO</span> collective intelligence.
          The fix? A synthetic membrane between agents.
        </p>
        <p style={{ marginTop: "8px" }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("research"); }} style={{ color: "#00ffff", fontWeight: "bold", fontSize: "16px" }}>
            ➜ ➜ ➜ CLICK HERE TO READ ➜ ➜ ➜
          </a>
        </p>
      </div>

      {/* Links */}
      <div style={{ border: "2px solid #ffff00", padding: "12px", margin: "15px 0" }}>
        <h2 style={{ color: "#ffff00", fontSize: "18px", margin: "0 0 8px 0" }}>🔗 Cool Links</h2>
        <ul style={{ color: "#ffffff", fontSize: "14px", listStyle: "none", padding: 0, lineHeight: "2" }}>
          <li>🐙 <a href="https://github.com/AlexsJones" target="_blank" rel="noopener noreferrer" style={{ color: "#00ffff" }}>My GitHub</a> - check out my repos!!!</li>
          <li>💼 <a href="https://linkedin.com/in/jonesax" target="_blank" rel="noopener noreferrer" style={{ color: "#00ffff" }}>LinkedIn</a> - let&apos;s connect!</li>
          <li>🎥 <a href="https://youtube.com/cloudnativeskunkworks" target="_blank" rel="noopener noreferrer" style={{ color: "#00ffff" }}>YouTube</a> - Cloud Native Skunkworks</li>
          <li>🔬 <a href="https://github.com/sympozium-ai/sympozium" target="_blank" rel="noopener noreferrer" style={{ color: "#00ffff" }}>Sympozium</a> - agent orchestrator!!!</li>
        </ul>
      </div>

      {/* Skills */}
      <div style={{ textAlign: "center", margin: "15px 0", display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
        {["Go", "Rust", "TypeScript", "Kubernetes", "Docker", "AWS", "Linux", "Terraform", "Python"].map((skill, i) => (
          <span key={skill} style={{
            background: ["#ff0000", "#ff8000", "#ffff00", "#00ff00", "#00ffff", "#0080ff", "#8000ff", "#ff00ff", "#ff0080"][i % 9],
            color: "#000", padding: "2px 8px", fontSize: "12px", fontWeight: "bold", border: "2px outset #fff",
          }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function PageAbout() {
  return (
    <GeoSection title="👤 About Me!!!">
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <div style={{ fontSize: "60px" }}>👨‍💻</div>
      </div>
      <p>
        <span style={{ color: "#ffff00", fontSize: "18px" }}>Alex Jones</span><br />
        <span style={{ color: "#00ffff" }}>Principal Engineer @ AWS</span><br />
        <span style={{ color: "#00ff00" }}>Cloud Native Advocate, Speaker, Open Source Contributor</span><br />
        <span style={{ color: "#ff8000" }}>📍 London, United Kingdom</span>
      </p>
      <div style={{ color: "#ff00ff", letterSpacing: "4px", margin: "15px 0", textAlign: "center" }}>·····················</div>
      <p>
        I am an individual contributor. My work is mysterious and important.
        Outside of work I contribute to open-source.
      </p>
      <p style={{ marginTop: "10px" }}>
        <strong style={{ color: "#ffff00" }}>Expertise:</strong>{" "}
        <span style={{ color: "#00ffff" }}>Distributed systems</span>,{" "}
        <span style={{ color: "#00ff00" }}>Kubernetes</span>,{" "}
        <span style={{ color: "#ff00ff" }}>Systems Design</span>,{" "}
        <span style={{ color: "#ff8000" }}>AI in Cloud</span>
      </p>
      <div style={{ marginTop: "15px", border: "2px solid #ffff00", padding: "10px" }}>
        <div style={{ color: "#ffff00", fontWeight: "bold", marginBottom: "8px" }}>📧 Contact Me!!!</div>
        <div>Email: <a href="mailto:alexsimonjones@gmail.com" style={{ color: "#00ffff" }}>alexsimonjones@gmail.com</a></div>
        <div>LinkedIn: <a href="https://linkedin.com/in/jonesax" target="_blank" rel="noopener noreferrer" style={{ color: "#00ffff" }}>jonesax</a></div>
        <div>GitHub: <a href="https://github.com/AlexsJones" target="_blank" rel="noopener noreferrer" style={{ color: "#00ffff" }}>AlexsJones</a></div>
      </div>
    </GeoSection>
  );
}

function PageCV() {
  const jobs = [
    { role: "Principal Engineer", company: "AWS", dates: "Aug 2023 - Present", color: "#ff8000" },
    { role: "Founder", company: "k8sgpt.ai", dates: "Mar 2023 - Present", color: "#00ff00" },
    { role: "Engineering Director, Kubernetes", company: "Canonical", dates: "Jan 2022 - Aug 2023", color: "#ff00ff" },
    { role: "VP SRE", company: "JPMorgan Chase", dates: "Dec 2020 - May 2021", color: "#00ffff" },
    { role: "Engineering Director, SRE", company: "American Express", dates: "May 2019 - Dec 2020", color: "#ffff00" },
    { role: "Head of Platform & Infrastructure", company: "Beamery", dates: "May 2017 - May 2019", color: "#ff0080" },
    { role: "Lead DevOps Engineer", company: "Sky", dates: "Apr 2016 - May 2017", color: "#8000ff" },
    { role: "Senior Software Engineer", company: "Microsoft", dates: "Oct 2014 - Apr 2015", color: "#0080ff" },
  ];
  return (
    <GeoSection title="📄 My CV / Resume!!!">
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <span className="geo-blink" style={{ color: "#ff0000", fontWeight: "bold" }}>★ HIRE ME!!! (jk I have a job) ★</span>
      </div>
      <div style={{ border: "2px solid #808080", padding: "10px", marginBottom: "15px", background: "rgba(0,0,128,0.3)" }}>
        <div style={{ color: "#ffff00", fontWeight: "bold", marginBottom: "8px" }}>💼 Experience</div>
        {jobs.map((job) => (
          <div key={job.company + job.role} style={{ marginBottom: "8px", paddingLeft: "10px", borderLeft: `3px solid ${job.color}` }}>
            <div style={{ color: job.color, fontWeight: "bold" }}>{job.role}</div>
            <div>{job.company} <span style={{ color: "#808080" }}>({job.dates})</span></div>
          </div>
        ))}
      </div>
      <div style={{ border: "2px solid #808080", padding: "10px", background: "rgba(0,0,128,0.3)" }}>
        <div style={{ color: "#ffff00", fontWeight: "bold", marginBottom: "8px" }}>🎓 Education</div>
        <div style={{ paddingLeft: "10px", borderLeft: "3px solid #00ff00" }}>
          <div style={{ color: "#00ff00", fontWeight: "bold" }}>Kingston University</div>
          <div>First class BsC with Honours, Computer Science (2007 - 2010)</div>
        </div>
      </div>
      <div style={{ marginTop: "15px", border: "2px solid #808080", padding: "10px", background: "rgba(0,0,128,0.3)" }}>
        <div style={{ color: "#ffff00", fontWeight: "bold", marginBottom: "8px" }}>🎤 Speaking</div>
        <div>KubeCon + CloudNativeCon North America 2021, 2022</div>
        <div>KubeCon + CloudNativeCon Europe 2023, 2025</div>
      </div>
    </GeoSection>
  );
}

function PageSpeaking() {
  const talks = [
    "Beyond the Clouds: Charting the course for AI in the CloudNative world",
    "K8sGPT: Balancing AI's Productivity Boost with Ethical Considerations in Cloud-Native",
    "Rust Operators For Kubernetes",
    "Crowdsourcing a Kubernetes distribution: What we learnt with MicroK8s",
    "SLO's don't matter: A nihilist's guide to reliability",
  ];
  return (
    <GeoSection title="🎤 Speaking Events!!!">
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <span style={{ fontSize: "40px" }}>🎙️</span>
      </div>
      <div style={{ border: "2px solid #808080", padding: "10px", background: "rgba(0,0,128,0.3)" }}>
        {talks.map((talk, i) => (
          <div key={i} style={{ marginBottom: "10px", paddingLeft: "10px", borderLeft: `3px solid ${["#ff0000", "#ff8000", "#ffff00", "#00ff00", "#00ffff"][i]}` }}>
            <span style={{ color: ["#ff0000", "#ff8000", "#ffff00", "#00ff00", "#00ffff"][i] }}>▸</span>{" "}
            {talk}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <a href="https://sessionize.com/jonesax/" target="_blank" rel="noopener noreferrer" style={{ color: "#00ffff", fontSize: "16px", fontWeight: "bold" }}>
          ➜ See more on Sessionize ➜
        </a>
      </div>
    </GeoSection>
  );
}

function PageBlog() {
  return (
    <GeoSection title="📝 My Blog!!!">
      <div style={{ border: "2px solid #00ff00", padding: "12px", marginBottom: "12px", background: "rgba(0,128,0,0.1)" }}>
        <div style={{ color: "#808080", fontSize: "12px" }}>[May 2026]</div>
        <div style={{ color: "#00ff00", fontWeight: "bold", fontSize: "16px", marginTop: "4px" }}>
          The Sticky-Note Problem: Why Multi-Agent AI Is Broken at the Coordination Layer
        </div>
        <p style={{ marginTop: "8px" }}>
          Why every multi-agent system built today is passing sticky notes
          between people in different rooms.
        </p>
        <p style={{ marginTop: "8px" }}>
          <a href="/blog/generated/0001-sticky-note-problem" style={{ color: "#00ffff", fontWeight: "bold" }}>
            ➜ READ IT ➜
          </a>
        </p>
      </div>
      <div style={{ border: "2px solid #00ff00", padding: "12px", background: "rgba(0,128,0,0.1)" }}>
        <div style={{ color: "#808080", fontSize: "12px" }}>[2026]</div>
        <div style={{ color: "#00ff00", fontWeight: "bold", fontSize: "16px", marginTop: "4px" }}>
          We&apos;ve been building AI agents wrong.
        </div>
        <p style={{ marginTop: "8px" }}>
          Two million agents, zero collective intelligence. The MoltBook result
          and why we need a synthetic membrane between agents.
        </p>
        <p style={{ marginTop: "8px" }}>
          <a href="/blog/generated/blog-post" style={{ color: "#00ffff", fontWeight: "bold" }}>
            ➜ READ IT ➜
          </a>
        </p>
      </div>
    </GeoSection>
  );
}

function PageResearch() {
  return (
    <GeoSection title="🔬 Research!!!">
      <div style={{ color: "#ffff00", fontWeight: "bold", fontSize: "16px", marginBottom: "12px" }}>📄 Papers</div>

      <div style={{ border: "2px solid #00ff00", padding: "12px", marginBottom: "12px", background: "rgba(0,128,0,0.1)" }}>
        <div style={{ color: "#00ff00", fontWeight: "bold", fontSize: "16px" }}>
          The Synthetic Membrane: A Coordination Layer for Multi-Agent AI Systems{" "}
          <span className="geo-blink" style={{ color: "#ff0000", fontSize: "14px" }}>NEW!</span>
        </div>
        <div style={{ color: "#808080", fontSize: "12px", marginTop: "4px" }}>May 2026 · Expanded position paper</div>
        <p style={{ marginTop: "8px" }}>
          Six-layer architecture for multi-agent coordination. Default-deny permeability,
          CRDTs, quorum sensing, and an immune layer.
        </p>
        <div style={{ marginTop: "10px" }}>
          <a href="/research/0001-synthetic-membrane-coordination-layer" style={{ color: "#00ffff", fontWeight: "bold", border: "2px outset #00ffff", padding: "4px 12px", background: "rgba(0,255,255,0.1)" }}>
            📖 Read Paper
          </a>
        </div>
      </div>

      <div style={{ border: "2px solid #00ff00", padding: "12px", marginBottom: "15px", background: "rgba(0,128,0,0.1)" }}>
        <div style={{ color: "#00ff00", fontWeight: "bold", fontSize: "16px" }}>
          The Synthetic Membrane: A Shared Permeable Boundary for Multi-Agent AI Systems
        </div>
        <div style={{ color: "#808080", fontSize: "12px", marginTop: "4px" }}>April 2026 · Original position paper</div>
        <p style={{ marginTop: "8px" }}>
          Two million LLM agents on MoltBook produced <span style={{ color: "#ff0000", fontWeight: "bold" }}>ZERO</span> collective intelligence.
          The fix is not bigger models. It&apos;s <span style={{ color: "#ffff00" }}>structure</span> between them.
        </p>
        <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a href="/research/synthetic-membrane" style={{ color: "#00ffff", fontWeight: "bold", border: "2px outset #00ffff", padding: "4px 12px", background: "rgba(0,255,255,0.1)" }}>
            📖 Read Paper
          </a>
          <a href="https://github.com/AlexsJones/research" target="_blank" rel="noopener noreferrer" style={{ color: "#00ff00", fontWeight: "bold", border: "2px outset #00ff00", padding: "4px 12px", background: "rgba(0,255,0,0.1)" }}>
            🐙 GitHub Repo
          </a>
        </div>
      </div>

      <div style={{ border: "2px solid #808080", padding: "10px", background: "rgba(0,0,128,0.3)" }}>
        <div style={{ color: "#ffff00", fontWeight: "bold", marginBottom: "8px" }}>📊 Benchmark Results</div>
        <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #808080" }}>
              <th style={{ textAlign: "left", color: "#00ff00", padding: "4px" }}>Agents</th>
              <th style={{ textAlign: "right", color: "#00ff00", padding: "4px" }}>Baseline</th>
              <th style={{ textAlign: "right", color: "#00ff00", padding: "4px" }}>Membrane</th>
              <th style={{ textAlign: "right", color: "#00ff00", padding: "4px" }}>Saved</th>
            </tr>
          </thead>
          <tbody>
            {[
              { n: 3, b: "7,440", m: "4,320", s: "41.9%" },
              { n: 5, b: "24,800", m: "10,200", s: "58.9%" },
              { n: 8, b: "69,440", m: "23,520", s: "66.1%" },
              { n: 20, b: "471,200", m: "130,800", s: "72.2%" },
            ].map((r) => (
              <tr key={r.n} style={{ borderBottom: "1px solid #333" }}>
                <td style={{ padding: "4px", color: "#ffffff" }}>{r.n}</td>
                <td style={{ padding: "4px", textAlign: "right", color: "#808080" }}>{r.b}</td>
                <td style={{ padding: "4px", textAlign: "right", color: "#00ffff" }}>{r.m}</td>
                <td style={{ padding: "4px", textAlign: "right", color: "#00ff00", fontWeight: "bold" }}>{r.s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GeoSection>
  );
}

export default function GeocitiesMode({ onExit }: { onExit: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<GeoPage>("home");

  // Sparkle cursor trail
  useEffect(() => {
    const sparkles: HTMLDivElement[] = [];
    function handleMouseMove(e: MouseEvent) {
      const sparkle = document.createElement("div");
      sparkle.className = "geo-sparkle";
      sparkle.style.left = e.pageX + "px";
      sparkle.style.top = e.pageY + "px";
      sparkle.textContent = ["✦", "✧", "★", "·", "♦", "✶"][Math.floor(Math.random() * 6)];
      document.body.appendChild(sparkle);
      sparkles.push(sparkle);
      setTimeout(() => {
        sparkle.remove();
        sparkles.splice(sparkles.indexOf(sparkle), 1);
      }, 800);
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      sparkles.forEach((s) => s.remove());
    };
  }, []);

  const midiSongs = ["finalcountdown.mid", "macarena.mid", "hamsterdance.mid", "crazyfrog.mid", "rickroll.mid"];
  const currentYear = new Date().getFullYear();
  const visitorCount = typeof window !== "undefined" ? localStorage.getItem("axjns-visits") || "1" : "1";

  const navItems: { label: string; page?: GeoPage; exit?: boolean }[] = [
    { label: "🏠 Home", page: "home" },
    { label: "👤 About Me", page: "about" },
    { label: "📝 Blog", page: "blog" },
    { label: "🎤 Speaking", page: "speaking" },
    { label: "📄 My CV", page: "cv" },
    { label: "🔬 Research", page: "research" },
    { label: "💾 Terminal", exit: true },
  ];

  function renderPage() {
    switch (page) {
      case "home": return <PageHome onNavigate={setPage} />;
      case "about": return <PageAbout />;
      case "cv": return <PageCV />;
      case "speaking": return <PageSpeaking />;
      case "blog": return <PageBlog />;
      case "research": return <PageResearch />;
    }
  }

  return (
    <div
      ref={containerRef}
      className="geo-page"
      style={{
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
        background: "#000080 url('data:image/svg+xml," + encodeURIComponent('<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="5" r="1" fill="white" opacity="0.8"/><circle cx="10" cy="20" r="0.5" fill="white" opacity="0.6"/><circle cx="40" cy="35" r="1.2" fill="white" opacity="0.7"/><circle cx="5" cy="45" r="0.5" fill="white" opacity="0.5"/><circle cx="45" cy="15" r="0.8" fill="white" opacity="0.9"/><circle cx="30" cy="42" r="0.5" fill="white" opacity="0.4"/></svg>') + "') repeat",
        minHeight: "100vh",
        color: "#00ff00",
        cursor: "url('data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><text y="24" font-size="24">🖐</text></svg>') + "'), auto",
      }}
    >
      {/* Exit button */}
      <button onClick={onExit} style={{
        position: "fixed", top: 10, right: 10, zIndex: 9999,
        background: "#c0c0c0", border: "3px outset #ffffff",
        fontFamily: "'MS Sans Serif', 'Tahoma', sans-serif", fontSize: "12px",
        padding: "4px 12px", cursor: "pointer", color: "#000",
      }}>
        ✕ Exit GeoCities Mode
      </button>

      {/* UNDER CONSTRUCTION BANNER */}
      <div style={{ background: "#ffff00", color: "#ff0000", textAlign: "center", padding: "8px", fontWeight: "bold", fontSize: "18px", borderBottom: "3px solid #ff0000" }}>
        🚧 UNDER CONSTRUCTION 🚧 UNDER CONSTRUCTION 🚧 UNDER CONSTRUCTION 🚧
      </div>

      {/* Marquee */}
      <div style={{ background: "#000", overflow: "hidden", padding: "6px 0", borderBottom: "2px solid #ff00ff" }}>
        <div className="geo-marquee" style={{ color: "#00ffff", fontSize: "16px", whiteSpace: "nowrap", fontWeight: "bold" }}>
          ★·.·´¯`·.·★ Welcome to Alex&apos;s AWESOME Homepage!!! ★·.·´¯`·.·★ Last updated: April 2026 ★·.·´¯`·.·★ Sign my guestbook!!! ★·.·´¯`·.·★ You are visitor #{visitorCount.padStart(6, "0")} ★·.·´¯`·.·★
        </div>
      </div>

      {/* Main content area */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        {/* Title */}
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <h1 className="geo-rainbow" style={{ fontSize: "48px", fontWeight: "bold", textShadow: "3px 3px #000" }}>
            ~*~ Alex&apos;s Page ~*~
          </h1>
          <div className="geo-spin" style={{ fontSize: "40px", display: "inline-block" }}>🌐</div>
          <div className="geo-spin" style={{ fontSize: "40px", display: "inline-block", animationDirection: "reverse" }}>💀</div>
          <div className="geo-spin" style={{ fontSize: "40px", display: "inline-block" }}>🌐</div>
        </div>

        <div style={{ textAlign: "center", color: "#ff00ff", letterSpacing: "4px", margin: "10px 0" }}>
          ●═══════════════════════════════════════════●
        </div>

        {/* Layout table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              {/* Sidebar */}
              <td style={{ width: "180px", verticalAlign: "top", padding: "10px", background: "rgba(0,0,128,0.5)", border: "2px inset #808080" }}>
                <div style={{ color: "#ffff00", fontWeight: "bold", fontSize: "16px", marginBottom: "10px", textDecoration: "underline" }}>
                  Navigation
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {navItems.map((item) => (
                    <a key={item.label} href="#"
                      onClick={(e) => { e.preventDefault(); if (item.exit) { onExit(); } else { setPage(item.page!); } }}
                      style={{
                        color: item.page === page ? "#ff00ff" : "#00ff00",
                        textDecoration: "none", fontSize: "14px",
                        fontWeight: item.page === page ? "bold" : "normal",
                      }}
                      onMouseOver={(e) => { (e.target as HTMLElement).style.color = "#ff00ff"; }}
                      onMouseOut={(e) => { (e.target as HTMLElement).style.color = item.page === page ? "#ff00ff" : "#00ff00"; }}
                    >
                      ▸ {item.label} {item.page === page ? "◄" : ""}
                    </a>
                  ))}
                </div>

                {/* MIDI Player */}
                <div style={{ marginTop: "20px", color: "#ff00ff", fontSize: "12px", textAlign: "center" }}>
                  <div style={{ border: "1px solid #ff00ff", padding: "8px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "bold" }}>🎵 MIDI Player</div>
                    <div style={{ fontSize: "10px", marginTop: "4px" }}>
                      Now playing:<br />
                      <span className="geo-blink" style={{ color: "#00ffff" }}>
                        {midiSongs[Math.floor(Math.random() * midiSongs.length)]}
                      </span>
                    </div>
                    <div style={{ marginTop: "4px" }}>[▶] [⏸] [⏹] [⏭]</div>
                  </div>
                </div>

                {/* Visitor counter */}
                <div style={{ marginTop: "10px", textAlign: "center", border: "1px solid #808080", padding: "6px", background: "#000" }}>
                  <div style={{ color: "#ffff00", fontSize: "10px" }}>VISITORS</div>
                  <div style={{ fontFamily: "monospace", color: "#00ff00", fontSize: "20px", letterSpacing: "3px" }}>
                    {visitorCount.padStart(6, "0")}
                  </div>
                </div>

                {/* Netscape badge */}
                <div style={{ marginTop: "15px", textAlign: "center" }}>
                  <div style={{ border: "2px outset #c0c0c0", background: "#c0c0c0", padding: "4px", display: "inline-block" }}>
                    <span style={{ color: "#000", fontSize: "10px", fontFamily: "'MS Sans Serif', sans-serif" }}>
                      Best viewed in<br /><strong>Netscape Navigator</strong><br />at 800x600
                    </span>
                  </div>
                </div>
              </td>

              {/* Main content */}
              <td style={{ verticalAlign: "top", padding: "15px" }}>
                {renderPage()}
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ textAlign: "center", color: "#ff00ff", letterSpacing: "4px", margin: "15px 0" }}>
          ●═══════════════════════════════════════════●
        </div>

        {/* Web ring */}
        <div style={{ textAlign: "center", margin: "20px 0", padding: "10px", border: "2px ridge #808080", background: "rgba(0,0,0,0.5)" }}>
          <div style={{ color: "#ffff00", fontSize: "14px", fontWeight: "bold", marginBottom: "6px" }}>🌐 Cloud Native Web Ring 🌐</div>
          <div style={{ fontSize: "14px" }}>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#00ffff" }}>← Previous</a>
            {" | "}
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#00ffff" }}>Random</a>
            {" | "}
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#00ffff" }}>Next →</a>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", color: "#808080", fontSize: "12px", padding: "15px", lineHeight: "2" }}>
          <div>This page is best viewed at 800x600 resolution in Netscape Navigator 4.0</div>
          <div>Made with ❤️ and {"<table>"} tags</div>
          <div>© {currentYear} Alex Jones. All rights reserved.</div>
          <div style={{ marginTop: "10px" }}>
            <span className="geo-spin" style={{ display: "inline-block", fontSize: "20px" }}>🌎</span>
            {" "}
            <a href="#" onClick={(e) => { e.preventDefault(); onExit(); }} style={{ color: "#00ff00" }}>Return to the future →</a>
            {" "}
            <span className="geo-spin" style={{ display: "inline-block", fontSize: "20px", animationDirection: "reverse" }}>🌎</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes geo-marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .geo-marquee { animation: geo-marquee 20s linear infinite; }
        @keyframes geo-rainbow { 0% { color: #ff0000; } 16% { color: #ff8000; } 33% { color: #ffff00; } 50% { color: #00ff00; } 66% { color: #00ffff; } 83% { color: #ff00ff; } 100% { color: #ff0000; } }
        .geo-rainbow { animation: geo-rainbow 3s linear infinite; }
        @keyframes geo-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .geo-blink { animation: geo-blink 1s step-end infinite; }
        @keyframes geo-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .geo-spin { animation: geo-spin 3s linear infinite; }
        .geo-sparkle { position: absolute; pointer-events: none; z-index: 10000; font-size: 16px; color: #ffff00; animation: sparkle-fade 0.8s ease-out forwards; transform: translate(-50%, -50%); }
        @keyframes sparkle-fade { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -80%) scale(0.3); } }
        .geo-page a:hover { text-decoration: underline !important; }
      `}</style>
    </div>
  );
}

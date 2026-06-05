"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCountUp } from "../hooks/useCountUp";

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function StatCard({ value, label, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";

  const count = useCountUp(target, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ borderTop: "1px solid #2a2a2a", paddingTop: "2rem", flex: "1 1 160px" }}
    >
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "clamp(42px, 6vw, 72px)",
        fontWeight: 900, lineHeight: 1, color: "#fff", letterSpacing: "-0.02em",
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "11px", fontWeight: 600,
        letterSpacing: "0.4em", textTransform: "uppercase",
        color: "#555", marginTop: "0.5rem",
      }}>
        {label}
      </div>
    </motion.div>
  );
}

const values = [
  { number: "01", title: "Speed",        body: "Time is money. We treat every delivery with the urgency it deserves — no delays, no excuses." },
  { number: "02", title: "Reliability",  body: "When we say it'll be there, it'll be there. Our track record speaks for itself." },
  { number: "03", title: "Transparency", body: "Live tracking, honest pricing, real communication. You're never left in the dark." },
  { number: "04", title: "Care",         body: "We handle every package as if it were our own. Fragile or freight, it arrives intact." },
];

const team = [
  { name: "Erik L.",  role: "Founder & Operator",   since: "Est. 2019"  },
  { name: "Sara M.",  role: "Logistics Coordinator", since: "Since 2021" },
  { name: "James T.", role: "Senior Driver",         since: "Since 2020" },
];

export default function About() {
  return (
    <>
      <Header />

      <div style={{ minHeight: "100vh", backgroundColor: "#131313", paddingTop: "72px" }}>

        {/* ── Hero ── */}
        <section style={{
          padding: "clamp(4rem, 10vw, 9rem) clamp(1.5rem, 8vw, 8rem) clamp(3rem, 6vw, 6rem)",
          borderBottom: "1px solid #1c1c1c",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(100px, 22vw, 260px)", fontWeight: 900,
            textTransform: "uppercase", color: "rgba(255,255,255,0.025)",
            whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none",
            letterSpacing: "-0.02em", zIndex: 0,
          }}>
            About
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <Reveal delay={0.05}>
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.5em", textTransform: "uppercase",
                color: "#555", marginBottom: "1.5rem",
              }}>
                Our Story
              </p>
            </Reveal>

            <div>
              {["Built in Calgary.", "Run with Purpose."].map((line, i) => (
                <div key={line} style={{ overflow: "hidden" }}>
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.12 }}
                  >
                    <h1 style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "clamp(38px, 7vw, 88px)",
                      fontWeight: 900, lineHeight: 0.95,
                      textTransform: "uppercase",
                      color: i === 0 ? "#ffffff" : "#3a3a3a",
                      margin: 0,
                    }}>
                      {line}
                    </h1>
                  </motion.div>
                </div>
              ))}
            </div>

            <Reveal delay={0.4} style={{ maxWidth: "560px", marginTop: "2.5rem" }}>
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 300,
                color: "#777", lineHeight: 1.8,
              }}>
                EL Express started as a one-truck operation out of Calgary in 2019.
                What began as same-day runs across the city has grown into a trusted
                delivery network serving businesses and individuals across Alberta —
                built on showing up, every single time.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Stats ── */}
        <section style={{
          padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 8vw, 8rem)",
          borderBottom: "1px solid #1c1c1c",
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(2rem, 4vw, 4rem)" }}>
            <StatCard value="5+"   label="Years Operating"      delay={0}   />
            <StatCard value="12K+" label="Deliveries Completed" delay={0.1} />
            <StatCard value="98%"  label="On-Time Rate"         delay={0.2} />
            <StatCard value="300+" label="Active Clients"       delay={0.3} />
          </div>
        </section>

        {/* ── Values ── */}
        <section style={{
          padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 8vw, 8rem)",
          borderBottom: "1px solid #1c1c1c",
        }}>
          <Reveal>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "11px", fontWeight: 600,
              letterSpacing: "0.5em", textTransform: "uppercase",
              color: "#555", marginBottom: "3rem",
            }}>
              What Drives Us
            </p>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0",
          }}>
            {values.map(({ number, title, body }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ backgroundColor: "#161616" }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: "clamp(1.5rem, 3vw, 2.5rem)",
                    borderTop: "1px solid #1e1e1e",
                    borderRight: i % 2 === 0 ? "1px solid #1e1e1e" : "none",
                    cursor: "default",
                  }}
                >
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "11px", fontWeight: 700,
                    letterSpacing: "0.3em", color: "#333", marginBottom: "1.25rem",
                  }}>
                    {number}
                  </div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 900,
                    textTransform: "uppercase", color: "#fff",
                    letterSpacing: "0.05em", marginBottom: "1rem",
                  }}>
                    {title}
                  </div>
                  <p style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "14px", fontWeight: 300,
                    color: "#666", lineHeight: 1.75, margin: 0,
                  }}>
                    {body}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Team ── */}
        <section style={{
          padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 8vw, 8rem)",
          borderBottom: "1px solid #1c1c1c",
        }}>
          <Reveal>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "11px", fontWeight: 600,
              letterSpacing: "0.5em", textTransform: "uppercase",
              color: "#555", marginBottom: "3rem",
            }}>
              The Team
            </p>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1px", backgroundColor: "#1a1a1a",
          }}>
            {team.map(({ name, role, since }, i) => (
              <Reveal key={name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ backgroundColor: "#141414" }}
                  transition={{ duration: 0.2 }}
                  style={{ backgroundColor: "#131313", padding: "clamp(1.75rem, 3vw, 2.5rem)" }}
                >
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "50%",
                    backgroundColor: "#1e1e1e", border: "1px solid #2a2a2a",
                    marginBottom: "1.25rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "18px", fontWeight: 900, color: "#444", textTransform: "uppercase",
                  }}>
                    {name[0]}
                  </div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 900,
                    color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase",
                    marginBottom: "0.3rem",
                  }}>
                    {name}
                  </div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "12px", fontWeight: 500,
                    letterSpacing: "0.25em", textTransform: "uppercase", color: "#555",
                  }}>
                    {role}
                  </div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "11px", letterSpacing: "0.2em",
                    color: "#333", marginTop: "0.75rem", textTransform: "uppercase",
                  }}>
                    {since}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 8vw, 8rem)",
          display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2rem",
        }}>
          <Reveal>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900,
              lineHeight: 0.95, textTransform: "uppercase",
              color: "#fff", margin: 0, maxWidth: "600px",
            }}>
              Ready to work<br />
              <span style={{ color: "#333" }}>with us?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "14px", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                backgroundColor: "#fff", color: "#000",
                padding: "14px 36px", textDecoration: "none", display: "block",
                transition: "background-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#e0e0e0"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#fff"; }}
              >
                Get a Quote
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/services" style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "14px", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                backgroundColor: "transparent", color: "#fff",
                padding: "13px 36px", textDecoration: "none",
                border: "1px solid #333", display: "block", transition: "border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#666"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#333"; }}
              >
                Our Services
              </Link>
            </motion.div>
          </Reveal>
        </section>

        <Footer />
      </div>
    </>
  );
}
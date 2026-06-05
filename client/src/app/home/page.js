"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCountUp } from "../hooks/useCountUp";

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Label({ children }) {
  return (
    <p style={{
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: "11px", fontWeight: 600,
      letterSpacing: "0.5em", textTransform: "uppercase",
      color: "#555", marginBottom: "1.5rem",
    }}>
      {children}
    </p>
  );
}

function StatItem({ value, suffix, label, delay, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(value, inView);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      style={{
        padding: "clamp(1.25rem, 3vw, 2rem) clamp(1rem, 2vw, 1.5rem)",
        borderTop: "1px solid #222",
        borderRight: index % 2 === 0 ? "1px solid #222" : "none",
        borderBottom: index < 2 ? "1px solid #222" : "none",
      }}
    >
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "clamp(32px, 6vw, 56px)",
        fontWeight: 900, lineHeight: 1,
        color: "#fff", letterSpacing: "-0.02em",
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: "'Barlow', sans-serif",
        fontSize: "13px", fontWeight: 300,
        color: "#555", marginTop: "0.4rem", lineHeight: 1.4,
      }}>
        {label}
      </div>
    </motion.div>
  );
}

const services = [
  { number: "01", title: "Long Hauls",   body: "Cross-province freight and cargo runs — tracked, insured, and on time."   },
  { number: "02", title: "Local Moving", body: "Residential and office moves across Calgary and surrounding areas."        },
  { number: "03", title: "Junk Removal", body: "Fast, responsible cleanouts for garages, basements, and full properties."  },
  { number: "04", title: "Appliances",   body: "New appliance delivery and old unit removal — careful, safe, same-day."   },
];

const testimonials = [
  { quote: "EL Express moved our entire office in half a day. Seamless, professional, and not a single item damaged.",     name: "Marcus R.", company: "Folio Creative, Calgary" },
  { quote: "Used them for a long haul from Calgary to Edmonton. Truck showed up on time and everything arrived perfectly.", name: "Diane W.",  company: "Private Client"         },
  { quote: "Cleared out my late mother's house in one afternoon. Respectful, efficient, and fairly priced.",               name: "Tom A.",    company: "Private Client"         },
];

const stats = [
  { value: 5,   suffix: "+",  label: "Years Operating"      },
  { value: 12,  suffix: "K+", label: "Deliveries Completed" },
  { value: 98,  suffix: "%",  label: "On-Time Rate"         },
  { value: 300, suffix: "+",  label: "Active Clients"       },
];

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#131313" }}>

        {/* ══ HERO ══ */}
        <section style={{
          position: "relative", minHeight: "100svh",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center",
          padding: "clamp(2rem, 6vw, 4rem) clamp(1.25rem, 5vw, 2rem)",
          overflow: "hidden",
        }}>
          <video autoPlay muted loop playsInline webkit-playsinline="true"
            poster="/videos/hero-poster.jpg"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          >
            <source src="/videos/hero-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.75) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)" }} />

          <div style={{ position: "relative", zIndex: 3, width: "100%", maxWidth: "900px" }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.45em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                marginBottom: "clamp(1.25rem, 4vw, 2rem)",
              }}
            >
              Calgary &amp; Beyond
            </motion.p>

            <div style={{ marginBottom: "clamp(1.5rem, 4vw, 2.5rem)" }}>
              {[
                { text: "We Move",  color: "#ffffff"               },
                { text: "What",     color: "rgba(255,255,255,0.3)" },
                { text: "Matters.", color: "#ffffff"               },
              ].map(({ text, color }, i) => (
                <div key={text} style={{ overflow: "hidden" }}>
                  <motion.div
                    initial={{ y: "110%" }} animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.1 }}
                  >
                    <span style={{
                      display: "block",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "clamp(52px, 14vw, 120px)",
                      fontWeight: 900, lineHeight: 0.92,
                      textTransform: "uppercase", color,
                    }}>
                      {text}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(14px, 2vw, 16px)", fontWeight: 300,
                color: "rgba(255,255,255,0.55)",
                maxWidth: "400px", lineHeight: 1.75,
                margin: "0 auto 2.5rem",
              }}
            >
              Fast, dependable delivery for businesses and individuals across Alberta.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}
            >
              {[
                { label: "Get a Quote", href: "/contact", bg: "#fff",        color: "#000", border: "none"                           },
                { label: "Our Story",   href: "/about",   bg: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" },
              ].map(({ label, href, bg, color, border }) => (
                <motion.div key={label} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  style={{ width: "clamp(200px, 70vw, 260px)" }}
                >
                  <Link href={href} style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "14px", fontWeight: 700,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    backgroundColor: bg, color, border,
                    padding: "13px 36px", textDecoration: "none",
                    display: "block", textAlign: "center", transition: "opacity 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{
              position: "absolute", bottom: "2rem", left: "50%",
              transform: "translateX(-50%)", zIndex: 3,
              display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
            }}
          >
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: "10px",
              letterSpacing: "0.4em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}>
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "1px", height: "32px", backgroundColor: "rgba(255,255,255,0.2)" }}
            />
          </motion.div>
        </section>

        {/* ══ ABOUT PREVIEW ══ */}
        <section style={{
          padding: "clamp(4rem, 8vw, 8rem) clamp(1.5rem, 8vw, 8rem)",
          borderBottom: "1px solid #1c1c1c",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
        }}
          className="about-grid"
        >
          {/* Left — headline */}
          <div>
            <Reveal><Label>Who We Are</Label></Reveal>
            {["Built in Calgary.", "Run with Purpose."].map((line, i) => (
              <div key={line} style={{ overflow: "hidden" }}>
                <Reveal delay={0.05 + i * 0.1}>
                  <h2 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(32px, 6vw, 72px)", fontWeight: 900,
                    lineHeight: 0.95, textTransform: "uppercase",
                    color: i === 0 ? "#fff" : "#333", margin: 0,
                  }}>
                    {line}
                  </h2>
                </Reveal>
              </div>
            ))}
          </div>

          {/* Right — copy + link */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "2rem" }}>
            <Reveal delay={0.2}>
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 300,
                color: "#777", lineHeight: 1.8, maxWidth: "520px",
              }}>
                EL Express started as a one-truck operation in 2019. What began as
                same-day runs across Calgary has grown into a trusted delivery network
                serving businesses and individuals across Alberta — built on showing
                up, every single time.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: "inline-block" }}>
                <Link href="/about" style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "14px", fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "#fff", textDecoration: "none",
                  borderBottom: "1px solid #444", paddingBottom: "4px",
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#444"; }}
                >
                  Our Full Story →
                </Link>
              </motion.div>
            </Reveal>
          </div>

          {/* Stats — full width row */}
          <Reveal style={{ gridColumn: "1 / -1" }}>
            <div className="stats-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
            }}>
              {stats.map(({ value, suffix, label }, i) => (
                <StatItem key={label} value={value} suffix={suffix} label={label} delay={i * 0.08} index={i} />
              ))}
            </div>
          </Reveal>
        </section>

        {/* ══ SERVICES PREVIEW ══ */}
        <section style={{
          padding: "clamp(4rem, 8vw, 8rem) clamp(1.5rem, 8vw, 8rem)",
          borderBottom: "1px solid #1c1c1c",
        }}>
          <div style={{
            display: "flex", flexWrap: "wrap",
            justifyContent: "space-between", alignItems: "flex-end",
            gap: "1.5rem", marginBottom: "3rem",
          }}>
            <div>
              <Reveal><Label>What We Do</Label></Reveal>
              <Reveal delay={0.1}>
                <h2 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900,
                  lineHeight: 0.95, textTransform: "uppercase",
                  color: "#fff", margin: 0,
                }}>
                  Our Services
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link href="/services" style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "13px", fontWeight: 600,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: "#555", textDecoration: "none",
                borderBottom: "1px solid #333", paddingBottom: "3px",
                transition: "color 0.2s, border-color 0.2s", whiteSpace: "nowrap",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#333"; }}
              >
                View All Services →
              </Link>
            </Reveal>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1px", backgroundColor: "#1c1c1c",
          }}>
            {services.map(({ number, title, body }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ backgroundColor: "#181818" }}
                  transition={{ duration: 0.2 }}
                  style={{ backgroundColor: "#131313", padding: "clamp(1.5rem, 3vw, 2.5rem)", height: "100%" }}
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
                    fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 900,
                    textTransform: "uppercase", color: "#fff",
                    letterSpacing: "0.04em", marginBottom: "0.85rem",
                  }}>
                    {title}
                  </div>
                  <p style={{
                    fontFamily: "'Barlow', sans-serif", fontSize: "14px",
                    fontWeight: 300, color: "#666", lineHeight: 1.75, margin: 0,
                  }}>
                    {body}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ TESTIMONIALS PREVIEW ══ */}
        <section style={{
          padding: "clamp(4rem, 8vw, 8rem) clamp(1.5rem, 8vw, 8rem)",
          borderBottom: "1px solid #1c1c1c",
        }}>
          <div style={{
            display: "flex", flexWrap: "wrap",
            justifyContent: "space-between", alignItems: "flex-end",
            gap: "1.5rem", marginBottom: "3rem",
          }}>
            <div>
              <Reveal><Label>What People Say</Label></Reveal>
              <Reveal delay={0.1}>
                <h2 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900,
                  lineHeight: 0.95, textTransform: "uppercase",
                  color: "#fff", margin: 0,
                }}>
                  Testimonials
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link href="/testimonials" style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "13px", fontWeight: 600,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: "#555", textDecoration: "none",
                borderBottom: "1px solid #333", paddingBottom: "3px",
                transition: "color 0.2s, border-color 0.2s", whiteSpace: "nowrap",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#333"; }}
              >
                Read More →
              </Link>
            </Reveal>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1px", backgroundColor: "#1c1c1c",
          }}>
            {testimonials.map(({ quote, name, company }, i) => (
              <Reveal key={name} delay={i * 0.1}>
                <div style={{
                  backgroundColor: "#131313",
                  padding: "clamp(1.75rem, 3vw, 2.5rem)",
                  display: "flex", flexDirection: "column", gap: "1.5rem", height: "100%",
                }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "36px", color: "#2a2a2a", fontWeight: 900, lineHeight: 1,
                  }}>
                    "
                  </div>
                  <p style={{
                    fontFamily: "'Barlow', sans-serif", fontSize: "15px",
                    fontWeight: 300, color: "#888", lineHeight: 1.75, margin: 0, flex: 1,
                  }}>
                    {quote}
                  </p>
                  <div>
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "15px", fontWeight: 700,
                      color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase",
                    }}>
                      {name}
                    </div>
                    <div style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: "12px", color: "#444", marginTop: "2px",
                    }}>
                      {company}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ CONTACT CTA ══ */}
        <section style={{
          padding: "clamp(4rem, 8vw, 8rem) clamp(1.5rem, 8vw, 8rem)",
          borderBottom: "1px solid #1c1c1c",
          display: "grid", gridTemplateColumns: "1fr",
          gap: "3rem",
        }}
          className="contact-grid"
        >
          <div>
            <Reveal><Label>Get In Touch</Label></Reveal>
            <Reveal delay={0.1}>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(32px, 6vw, 72px)", fontWeight: 900,
                lineHeight: 0.95, textTransform: "uppercase",
                color: "#fff", margin: 0,
              }}>
                Need something<br />
                <span style={{ color: "#333" }}>moved?</span>
              </h2>
            </Reveal>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <Reveal delay={0.2}>
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 300,
                color: "#666", lineHeight: 1.8, maxWidth: "480px",
              }}>
                Whether it's a quote, a question, or a same-day job — reach out and
                we'll get back to you within the hour.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  { label: "hello@elexpress.ca", href: "mailto:hello@elexpress.ca" },
                  { label: "+1 (403) 555-0199",  href: "tel:+14035550199"          },
                ].map(({ label, href }) => (
                  <a key={label} href={href} style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 600,
                    letterSpacing: "0.05em", color: "#555", textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#555"; }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: "inline-block" }}>
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
                  Send a Message
                </Link>
              </motion.div>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-grid   { grid-template-columns: 1fr 1fr !important; }
          .contact-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 640px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid #222 !important; }
        }
      `}</style>
    </>
  );
}
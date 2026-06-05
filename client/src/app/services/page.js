"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "../hooks/useCountUp";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

function StripStat({ display, prefix, suffix, sub, index, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(display ?? 0, inView);

  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        style={{
          padding: "clamp(1.5rem, 3vw, 2.5rem)",
          borderRight: index < 3 ? "1px solid #1c1c1c" : "none",
          borderTop: "1px solid #1c1c1c",
        }}
      >
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(22px, 3.5vw, 32px)",
          fontWeight: 900, color: "#fff",
          textTransform: "uppercase", letterSpacing: "0.02em",
          marginBottom: "0.4rem",
        }}>
          {display !== null ? `${prefix}${count}${suffix}` : `${prefix}${suffix}`}
        </div>
        <div style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: "13px", fontWeight: 300,
          color: "#555", lineHeight: 1.5,
        }}>
          {sub}
        </div>
      </div>
    </Reveal>
  );
}

const services = [
  {
    number: "01",
    title: "Long Hauls",
    tagline: "Alberta & Beyond",
    description:
      "Need something moved across the province or further? We handle long-distance freight and cargo runs with the same care and urgency as a local drop. Fully insured, tracked, and on time.",
    details: ["Cross-province freight", "Scheduled & same-day runs", "Full cargo tracking", "Commercial & residential"],
  },
  {
    number: "02",
    title: "Local Moving",
    tagline: "Calgary & Surrounding Areas",
    description:
      "Whether you're moving across the street or across the city, we make it painless. We handle the heavy lifting so you don't have to — furniture, boxes, fragile items, all of it.",
    details: ["Residential moves", "Office relocations", "Furniture delivery", "Same-day availability"],
  },
  {
    number: "03",
    title: "Junk Removal",
    tagline: "Fast & Responsible Disposal",
    description:
      "Clearing out a garage, basement, or office? We haul it away quickly and responsibly. No job too big or too small — we load, we lift, we dispose.",
    details: ["Full property cleanouts", "Construction debris", "Furniture & mattresses", "Eco-friendly disposal"],
  },
  {
    number: "04",
    title: "Appliances",
    tagline: "Delivery & Removal",
    description:
      "Buying a new fridge or getting rid of an old washer? We deliver new appliances to your door and remove the old ones — carefully, safely, and without the headache.",
    details: ["New appliance delivery", "Old unit removal", "Stair & tight-space handling", "Same-day service available"],
  },
];

export default function Services() {
  return (
    <>
      <Header />

      <div style={{ minHeight: "100vh", backgroundColor: "#131313", paddingTop: "72px" }}>

        {/* ── Hero ── */}
        <section style={{
          padding: "clamp(4rem, 10vw, 9rem) clamp(1.5rem, 8vw, 8rem) clamp(3rem, 6vw, 5rem)",
          borderBottom: "1px solid #1c1c1c",
          position: "relative", overflow: "hidden",
        }}>
          {/* Background watermark */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(80px, 20vw, 240px)", fontWeight: 900,
            textTransform: "uppercase", color: "rgba(255,255,255,0.025)",
            whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none",
            letterSpacing: "-0.02em", zIndex: 0,
          }}>
            Services
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <Reveal delay={0.05}>
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.5em", textTransform: "uppercase",
                color: "#555", marginBottom: "1.5rem",
              }}>
                What We Do
              </p>
            </Reveal>

            <div>
              {["We Handle", "The Heavy Stuff."].map((line, i) => (
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

            <Reveal delay={0.4} style={{ maxWidth: "520px", marginTop: "2.5rem" }}>
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 300,
                color: "#777", lineHeight: 1.8,
              }}>
                From a single appliance to a full long-haul run, we've got the
                truck, the team, and the drive to get it done right.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Services List ── */}
        <section style={{ borderBottom: "1px solid #1c1c1c" }}>
          {services.map(({ number, title, tagline, description, details }, i) => (
            <Reveal key={title} delay={0.05}>
              <motion.div
                whileHover={{ backgroundColor: "#151515" }}
                transition={{ duration: 0.25 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  borderBottom: i < services.length - 1 ? "1px solid #1c1c1c" : "none",
                  padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 8vw, 8rem)",
                  gap: "2rem",
                  cursor: "default",
                }}
                className="service-row"
              >
                {/* Top row: number + title + tagline */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  gap: "1rem 2rem",
                  marginBottom: "1.5rem",
                }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "13px", fontWeight: 700,
                    letterSpacing: "0.3em", color: "#333",
                    textTransform: "uppercase",
                  }}>
                    {number}
                  </span>
                  <h2 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(32px, 5vw, 56px)",
                    fontWeight: 900, lineHeight: 1,
                    textTransform: "uppercase", color: "#fff",
                    letterSpacing: "0.02em", margin: 0,
                  }}>
                    {title}
                  </h2>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "13px", fontWeight: 500,
                    letterSpacing: "0.25em", textTransform: "uppercase",
                    color: "#444", alignSelf: "center",
                  }}>
                    {tagline}
                  </span>
                </div>

                {/* Bottom row: description + details */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "2rem",
                }}
                  className="service-body"
                >
                  <p style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "15px", fontWeight: 300,
                    color: "#666", lineHeight: 1.8,
                    maxWidth: "540px", margin: 0,
                  }}>
                    {description}
                  </p>

                  <ul style={{
                    listStyle: "none", margin: 0, padding: 0,
                    display: "flex", flexWrap: "wrap",
                    gap: "0.6rem",
                  }}>
                    {details.map((item) => (
                      <li key={item} style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "12px", fontWeight: 600,
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "#555",
                        border: "1px solid #222",
                        padding: "6px 14px",
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </section>

{/* ── Why Us strip ── */}
<section style={{
  padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 8vw, 8rem)",
  borderBottom: "1px solid #1c1c1c",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "0",
}}>
  {[
    { display: null,  prefix: "Same-Day", suffix: "",        sub: "Service Available"     },
    { display: null,  prefix: "Insured",  suffix: "",        sub: "Every Job, Every Time" },
    { display: 98,    prefix: "",         suffix: "%",       sub: "On-Time Delivery Rate" },
    { display: 5,     prefix: "",         suffix: "+ Years", sub: "Serving Alberta"       },
  ].map(({ display, prefix, suffix, sub }, i) => (
    <StripStat
      key={sub}
      display={display}
      prefix={prefix}
      suffix={suffix}
      sub={sub}
      index={i}
      delay={i * 0.08}
    />
  ))}
</section>

        {/* ── CTA ── */}
        <section style={{
          padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 8vw, 8rem)",
          display: "flex", flexDirection: "column",
          alignItems: "flex-start", gap: "2rem",
        }}>
          <Reveal>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: 900, lineHeight: 0.95,
              textTransform: "uppercase",
              color: "#fff", margin: 0, maxWidth: "600px",
            }}>
              Ready to book<br />
              <span style={{ color: "#333" }}>a service?</span>
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
              <Link href="/about" style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "14px", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                backgroundColor: "transparent", color: "#fff",
                padding: "13px 36px", textDecoration: "none",
                border: "1px solid #333", display: "block",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#666"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#333"; }}
              >
                About Us
              </Link>
            </motion.div>
          </Reveal>
        </section>

        <Footer />
      </div>

      <style>{`
        @media (min-width: 768px) {
          .service-body {
            grid-template-columns: 1fr 1fr !important;
            align-items: start;
          }
          .service-row {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 900px) {
          .service-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
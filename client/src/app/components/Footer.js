"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";


const navLinks = [
  { label: "Home",         path: "/"             },
  { label: "Services",     path: "/services"     },
  { label: "About",        path: "/about"        },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact",      path: "/contact"      },
];

const contactInfo = [
  { label: "Email", value: "hello@elexpress.ca", href: "mailto:hello@elexpress.ca" },
  { label: "Phone", value: "+1 (403) 555-0199",  href: "tel:+14035550199"          },
  { label: "Based", value: "Calgary, Alberta",   href: null                        },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer ref={ref} style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid #1c1c1c" }}>

      {/* ── Top grid ── */}
      <div style={{
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 8vw, 8rem)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "clamp(2.5rem, 5vw, 5rem)",
        borderBottom: "1px solid #161616",
      }}>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0 }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
<div style={{ display: 'flex', alignItems: 'center' }}>
  <Image src="/logo.png" alt="EL Express" height={40} width={160} style={{ objectFit: "contain" }} />
</div>
          </Link>
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "14px",
            fontWeight: 300,
            color: "#555",
            lineHeight: 1.8,
            maxWidth: "240px",
            margin: "0 0 1.5rem",
          }}>
            Fast, dependable delivery across Calgary and Alberta. Built on showing up, every time.
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[
              { label: "IG", href: "https://instagram.com" },
              { label: "FB", href: "https://facebook.com"  },
              { label: "LI", href: "https://linkedin.com"  },
            ].map(({ label, href }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ color: "#fff", borderColor: "#555" }}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "12px", fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "#444", textDecoration: "none",
                  border: "1px solid #222",
                  padding: "7px 14px",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.35em", textTransform: "uppercase",
            color: "#444", marginBottom: "1.5rem",
          }}>
            Navigation
          </p>
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {navLinks.map(({ label, path }) => (
              <motion.div key={path} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Link href={path} style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#555", textDecoration: "none",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#555"; }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.35em", textTransform: "uppercase",
            color: "#444", marginBottom: "1.5rem",
          }}>
            Contact
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {contactInfo.map(({ label, value, href }) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "11px", fontWeight: 600,
                  letterSpacing: "0.3em", textTransform: "uppercase",
                  color: "#3a3a3a", marginBottom: "4px",
                }}>
                  {label}
                </div>
                {href ? (
                  <motion.a href={href} whileHover={{ color: "#fff" }} style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "15px", fontWeight: 400,
                    color: "#666", textDecoration: "none",
                    transition: "color 0.2s",
                  }}>
                    {value}
                  </motion.a>
                ) : (
                  <span style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "15px", fontWeight: 400, color: "#666",
                  }}>
                    {value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{
            borderLeft: "1px solid #1a1a1a",
            paddingLeft: "clamp(0px, 3vw, 3rem)",
            display: "flex", flexDirection: "column",
            justifyContent: "space-between", gap: "2rem",
          }}
        >
          <div>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.35em", textTransform: "uppercase",
              color: "#444", marginBottom: "1rem",
            }}>
              Get Started
            </p>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "14px", fontWeight: 300,
              color: "#555", lineHeight: 1.75, marginBottom: "1.5rem",
            }}>
              Need a delivery quote? We respond within the hour.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" style={{
                display: "inline-block",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "14px", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                backgroundColor: "#fff", color: "#000",
                padding: "11px 28px", textDecoration: "none",
                transition: "background-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#e0e0e0"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#fff"; }}
              >
                Get a Quote
              </Link>
            </motion.div>
          </div>

          <div style={{ borderTop: "1px solid #161616", paddingTop: "1.25rem" }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "11px", fontWeight: 600,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "#333", marginBottom: "0.5rem",
            }}>
              Service Area
            </div>
            <div style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "14px", fontWeight: 400, color: "#444",
              lineHeight: 1.6,
            }}>
              Calgary · Edmonton<br />Red Deer · Lethbridge
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          padding: "1.25rem clamp(1.5rem, 8vw, 8rem)",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <span style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: "13px", fontWeight: 400,
          color: "#333",
        }}>
          © {new Date().getFullYear()} EL Express. All rights reserved.
        </span>
        <span style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: "13px", fontWeight: 400,
          color: "#333",
        }}>
          Calgary, Alberta, Canada
        </span>
      </motion.div>

    </footer>
  );
}
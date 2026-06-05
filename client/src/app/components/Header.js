'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";


const navLinks = [
  { label: 'Home',         path: '/'             },
  { label: 'Services',     path: '/services'     },
  { label: 'About',        path: '/about'        },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Contact',      path: '/contact'      },
];

const HamburgerIcon = ({ isOpen }) => (
  <div style={{ width: 24, height: 18, position: 'relative' }}>
    {[0, 1, 2].map((i) => (
      <motion.span key={i}
        style={{
          position: 'absolute', left: 0, height: '2px',
          backgroundColor: '#fff', borderRadius: '2px', transformOrigin: 'center',
        }}
        animate={
          isOpen
            ? { width: i === 1 ? '0%' : '100%', top: '8px', rotate: i === 0 ? 45 : i === 1 ? 0 : -45, opacity: i === 1 ? 0 : 1 }
            : { width: i === 1 ? '70%' : '100%', top: i === 0 ? '0px' : i === 1 ? '8px' : '16px', rotate: 0, opacity: 1 }
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

export default function Header() {
  const pathname  = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          height: '72px',
          backgroundColor: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
          borderBottom: `1px solid ${scrolled ? '#2c2c2c' : 'transparent'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(1.25rem, 2vw, 2rem)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.5)' : 'none',
          transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} style={{ flexShrink: 0 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
          
<div style={{ display: 'flex', alignItems: 'center' }}>
  <Image src="/logo.png" alt="EL Express" height={40} width={160} style={{ objectFit: "contain" }} />
</div>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
          {navLinks.map(({ label, path }, i) => {
            const isActive = pathname === path;
            return (
              <motion.div key={path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
              >
                <Link href={path} style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '15px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.65)',
                  paddingBottom: '4px',
                  borderBottom: isActive ? '2px solid #ffffff' : '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.4)'; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.borderBottomColor = 'transparent'; } }}
                >
                  {label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <motion.div className="desktop-cta"
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          style={{ flexShrink: 0 }}
        >
          <Link href="/contact" style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            backgroundColor: '#ffffff', color: '#000000',
            padding: '10px 24px',
            textDecoration: 'none', display: 'block', whiteSpace: 'nowrap',
            transition: 'background-color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e0e0e0'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
          >
            Get a Quote
          </Link>
        </motion.div>

        {/* Hamburger */}
        <motion.button className="hamburger-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          whileTap={{ scale: 0.88 }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none' }}
        >
          <HamburgerIcon isOpen={menuOpen} />
        </motion.button>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 40, backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(3px)' }}
            />
            <motion.div key="drawer"
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed', top: '72px', left: 0, right: 0, zIndex: 45,
                backgroundColor: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(14px)',
                borderBottom: '1px solid #2a2a2a',
                padding: '0.75rem clamp(1.25rem, 5vw, 2rem) 2rem',
              }}
            >
              <nav style={{ display: 'flex', flexDirection: 'column' }}>
                {navLinks.map(({ label, path }, i) => {
                  const isActive = pathname === path;
                  return (
                    <motion.div key={path}
                      initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055, duration: 0.28, ease: 'easeOut' }}
                    >
                      <Link href={path} onClick={() => setMenuOpen(false)} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: '20px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        color: isActive ? '#ffffff' : '#777777',
                        padding: '15px 0',
                        borderBottom: '1px solid #1a1a1a',
                        transition: 'color 0.2s',
                      }}>
                        {label}
                        {isActive && (
                          <motion.span layoutId="mobile-dot"
                            style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#fff', flexShrink: 0 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.055 + 0.04, duration: 0.28 }}
                style={{ marginTop: '1.5rem' }}
              >
                <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
                  display: 'block', textAlign: 'center',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '15px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  backgroundColor: '#ffffff', color: '#000000',
                  padding: '14px 24px', textDecoration: 'none',
                }}>
                  Get a Quote
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav   { display: none !important; }
          .desktop-cta   { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
        @media (min-width: 901px) {
          .hamburger-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
'use client'
import { useState } from 'react';
import Footer from '../components/Footer';

const inputStyle = { 
  backgroundColor: '#111', 
  border: '1px solid #2c2c2c', 
  color: '#fff', 
  padding: '13px 16px', 
  fontFamily: "'Barlow', sans-serif", 
  fontSize: '14px', 
  outline: 'none', 
  width: '100%',
  boxSizing: 'border-box',
};

const labelStyle = { 
  fontFamily: "'Barlow Condensed', sans-serif", 
  fontSize: '11px', 
  fontWeight: 600, 
  letterSpacing: '0.35em', 
  textTransform: 'uppercase', 
  color: '#555' 
};

const services = ['Long Hauls', 'Local Moving', 'Junk Removal', 'Appliances', 'Other'];

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#131313', paddingTop: '72px' }}>
      <section style={{ padding: '6rem 3rem' }}>
        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#555', marginBottom: '0.75rem' }}>
          Get in Touch
        </p>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, color: '#fff', marginBottom: '4rem' }}>
          Let's Move<br />Together.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem' }}>

          {/* Form */}
          {status === 'success' ? (
            <div style={{ border: '1px solid #222', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', color: '#fff' }}>
                Message Sent.
              </div>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '15px', fontWeight: 300, color: '#666', lineHeight: 1.8, margin: 0 }}>
                Thanks for reaching out. Check your inbox — we've sent you a confirmation and will follow up within 2 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                style={{ alignSelf: 'flex-start', marginTop: '0.5rem', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', backgroundColor: 'transparent', color: '#fff', border: '1px solid #333', padding: '12px 28px', cursor: 'pointer' }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Your Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Smith" required style={inputStyle} />
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Email Address *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required style={inputStyle} />
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (403) 555-0100" style={inputStyle} />
              </div>

              {/* Service */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Service</label>
                <select name="service" value={form.service} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}>
                  <option value="">Select a service</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your delivery needs..." rows={5} required style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }} />
              </div>

              {/* Error */}
              {status === 'error' && (
                <p style={{ 
                  fontFamily: "'Barlow', sans-serif", 
                  fontSize: '13px', 
                  color: '#c0392b', 
                  margin: 0,
                  padding: '12px 16px',
                  border: '1px solid #c0392b',
                  backgroundColor: 'rgba(192,57,43,0.08)',
                }}>
                  Something went wrong. Please try again or email us at hello@elexpress.ca
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{ alignSelf: 'flex-start', marginTop: '0.5rem', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', backgroundColor: status === 'loading' ? '#ccc' : '#fff', color: '#000', padding: '14px 36px', border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              { label: 'Location', value: 'Calgary, Alberta, Canada' },
              { label: 'Phone',    value: '+1 (403) 555-0199' },
              { label: 'Email',    value: 'hello@elexpress.ca' },
              { label: 'Hours',    value: 'Mon – Sat, 7:00 AM – 8:00 PM\nAfter-hours available on request' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#555', marginBottom: '6px' }}>{label}</div>
                <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: '15px', fontWeight: 300, color: '#bbb', whiteSpace: 'pre-line' }}>{value}</div>
              </div>
            ))}

            <div style={{ marginTop: '1rem', padding: '2rem', backgroundColor: '#111', border: '1px solid #222' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', marginBottom: '0.75rem' }}>Response Time</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '42px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>Under 2hrs</div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: '13px', fontWeight: 300, color: '#666', marginTop: '8px' }}>For all quote requests and inquiries</div>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
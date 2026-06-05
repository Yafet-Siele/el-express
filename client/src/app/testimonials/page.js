import Header from "../components/Header";
import Contact from "../contact/page";
const testimonials = [
  { stars: 5, text: "EL Express has been our go-to for same-day deliveries. They're always on time, professional, and our clients love the reliability.", author: 'Sarah M.', role: 'Operations Manager, YEG Supply Co.' },
  { stars: 5, text: 'We had a last-minute freight run that nobody else could handle. EL Express picked it up in an hour and delivered overnight. Incredible.', author: 'James R.', role: 'Owner, North Alberta Builders' },
  { stars: 5, text: "Simple, reliable, and great communication throughout. I've recommended EL Express to everyone in our network — and I'll keep doing it.", author: 'Linda K.', role: 'Procurement Lead, Northgate Foods' },
];

function Testimonials() {
  return (
    <>
    <Header />
    <div style={{ minHeight: '100vh', backgroundColor: '#131313', paddingTop: '72px' }}>
      <section style={{ padding: '6rem 3rem' }}>
        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#555', marginBottom: '0.75rem' }}>What People Say</p>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, color: '#fff', marginBottom: '1rem' }}>
          Clients Who<br />Trust Us.
        </h2>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '15px', fontWeight: 300, color: '#888', lineHeight: 1.8, maxWidth: '540px', marginBottom: '4rem' }}>
          Don't take our word for it — hear from the businesses and individuals who rely on EL Express every day.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ position: 'relative', backgroundColor: '#111', border: '1px solid #222', padding: '2.5rem' }}>
              <span style={{ position: 'absolute', top: '0.5rem', left: '1.5rem', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '80px', color: '#222', lineHeight: 1, userSelect: 'none' }}>„</span>
              <div style={{ color: '#fff', fontSize: '13px', letterSpacing: '0.2em', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>{'★'.repeat(t.stars)}</div>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '15px', fontWeight: 300, color: '#bbb', lineHeight: 1.8, marginBottom: '2rem', position: 'relative', zIndex: 1 }}>{t.text}</p>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>{t.author}</div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: '12px', color: '#555', marginTop: '4px' }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>
      <Contact />
    </div>
    </>
  );
}

export default Testimonials;
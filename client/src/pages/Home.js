import Link from "next/link";

function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#131313", paddingTop: "72px" }}>
      <section
        style={{
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "4rem 2rem",
          background:
            "radial-gradient(ellipse at 50% 60%, #2c2c2c 0%, #131313 65%, #000 100%)",
        }}
      >
        <p
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "#666",
            marginBottom: "2rem",
          }}
        >
          Calgary &amp; Beyond
        </p>

        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(60px, 10vw, 120px)",
            fontWeight: 900,
            lineHeight: 0.9,
            textTransform: "uppercase",
            color: "#ffffff",
            marginBottom: "1.5rem",
          }}
        >
          We Move<br />
          <span style={{ color: "#555" }}>What</span><br />
          Matters.
        </h1>

        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "16px",
            fontWeight: 300,
            color: "#888",
            maxWidth: "440px",
            lineHeight: 1.7,
            margin: "0 auto 2.5rem",
          }}
        >
          Fast, dependable delivery solutions for businesses and individuals across Alberta.
          No excuses — just results.
        </p>

        <div style={{ display: "flex", gap: "1rem" }}>
          {/* ✅ FIXED: use href (NOT to) */}
          <Link
            href="/services"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              backgroundColor: "#ffffff",
              color: "#000",
              padding: "14px 36px",
              textDecoration: "none",
            }}
          >
            Our Services
          </Link>

          <Link
            href="/contact"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              backgroundColor: "transparent",
              color: "#ffffff",
              padding: "13px 36px",
              textDecoration: "none",
              border: "1px solid #444",
            }}
          >
            Get a Quote
          </Link>
        </div>

        <div style={{ display: "flex", gap: "4rem", marginTop: "5rem", alignItems: "center" }}>
          {[
            { num: "500+", label: "Deliveries" },
            { num: "24/7", label: "Available" },
            { num: "100%", label: "Reliable" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{ display: "flex", alignItems: "center", gap: "4rem" }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "42px",
                    fontWeight: 900,
                    color: "#fff",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#555",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {stat.label}
                </div>
              </div>

              {i < 2 && (
                <div style={{ width: "1px", height: "48px", backgroundColor: "#2c2c2c" }} />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
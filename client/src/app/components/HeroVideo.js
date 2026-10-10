"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);

  // Pick the file in JS, since <source media> is ignored by video elements
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setSrc(mobile ? "/videos/hero-mobile.mp4" : "/videos/hero.mp4");
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;

    // React doesn't reliably set these as attributes, and autoplay needs them
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;

    const play = () => {
      if (v.paused) v.play().catch(() => {});
    };

    play();

    // Resume if the browser or OS pauses it
    v.addEventListener("pause", play);
    v.addEventListener("suspend", play);
    v.addEventListener("stalled", play);
    v.addEventListener("canplay", play);

    // Resume when the tab comes back
    const onVisible = () => { if (!document.hidden) play(); };
    document.addEventListener("visibilitychange", onVisible);

    // Resume when scrolled back into view
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) play(); },
      { threshold: 0.1 }
    );
    io.observe(v);

    // Last resort for Low Power Mode and strict autoplay policies
    const unlock = () => play();
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    window.addEventListener("click", unlock, { once: true });

    return () => {
      v.removeEventListener("pause", play);
      v.removeEventListener("suspend", play);
      v.removeEventListener("stalled", play);
      v.removeEventListener("canplay", play);
      document.removeEventListener("visibilitychange", onVisible);
      io.disconnect();
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      key={src}
      src={src || undefined}
      poster="/videos/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      controls={false}
      suppressHydrationWarning
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        objectFit: "cover", zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
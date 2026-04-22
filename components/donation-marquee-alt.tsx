"use client"

export function DonationMarqueeAlt() {
  const items = Array(8).fill("✦ Ajude o Site — Clique e Doe ✦")

  return (
    <a
      href="https://fund.sedevacante.online/"
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gradient-to-r from-[#1A1A2E] via-[#16213E] to-[#1A1A2E] py-3 overflow-hidden cursor-pointer hover:brightness-125 transition-all group border-y border-[#D4AF37]/20"
    >
      <div className="donation-marquee-alt-track flex whitespace-nowrap">
        {items.map((text, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-8 text-sm sm:text-base font-bold tracking-widest uppercase text-[#D4AF37] group-hover:text-[#F0D060] transition-colors"
            style={{ fontFamily: "var(--font-cinzel-decorative), serif" }}
          >
            {text}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((text, i) => (
          <span
            key={`dup-${i}`}
            className="inline-flex items-center gap-2 px-8 text-sm sm:text-base font-bold tracking-widest uppercase text-[#D4AF37] group-hover:text-[#F0D060] transition-colors"
            style={{ fontFamily: "var(--font-cinzel-decorative), serif" }}
          >
            {text}
          </span>
        ))}
      </div>

      <style jsx>{`
        .donation-marquee-alt-track {
          animation: marquee-scroll-alt 30s linear infinite;
          animation-direction: reverse;
        }

        .donation-marquee-alt-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll-alt {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </a>
  )
}

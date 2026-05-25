import Link from "next/link";

export default function HeroSection() {
  return (
    <header className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Gradient Background — maroon theme */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#4a0e1e] via-[#7B1F34] to-[#2d0a14]">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-[#a0334d]/20 blur-2xl" />
      </div>

      {/* Content — left-aligned */}
      <div className="relative z-10 section-container py-20 animate-on-scroll">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
            Delhi Section Student, Young Professionals &amp; Women in
            Engineering and Life member Congress
          </h1>

          <p className="text-lg text-white/80 max-w-2xl mb-10 leading-relaxed">
            Converging young minds, visionary women engineers, and distinguished
            life members for a future of innovation.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#schedule"
              className="px-8 py-3 bg-white text-[#7B1F34] rounded font-bold text-sm hover:bg-gray-100 transition-all shadow-md inline-block"
            >
              View Schedule
            </a>
            <Link
              href="/register"
              className="px-8 py-3 border-2 border-white text-white rounded font-bold text-sm hover:bg-white/10 transition-all shadow-md inline-block"
            >
              Register Now
            </Link>
          </div>

          {/* Organizing Bodies Logos */}
          <div className="mt-14 pt-8 border-t border-white/10">
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-5">
              Organized by
            </p>
            <div className="flex flex-wrap items-center gap-8">
              <img
                src="/logos/dssywlc-logo.png"
                alt="DSSYWLC '25 — IEEE Delhi Section SAC"
                className="h-16 w-auto object-contain"
              />
              <img
                src="/logos/ssn-logo.png"
                alt="IEEE NSUT Student Branch"
                className="h-14 w-auto object-contain"
              />
              <img
                src="/logos/ieee-logo.png"
                alt="IEEE Delhi Section Student Activities Committee"
                className="h-12 w-auto object-contain"
              />
              <img
                src="/logos/wie logo purple.png"
                alt="IEEE Women in Engineering"
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#FBFAF7]" aria-hidden="true">
      <div className="hero-rainbow opacity-35">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="rainbow" />
        ))}
        <div className="rainbow-glow-h" />
        <div className="rainbow-glow-v" />
      </div>
      <div className="absolute -left-24 top-28 h-64 w-64 rounded-full bg-[#FFE9B6] opacity-45 blur-xl" />
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#DFF3FF] opacity-70 blur-lg" />
      <div className="absolute bottom-8 right-12 h-52 w-64 rounded-[50%] bg-[#DDF8E7] opacity-55 blur-xl" />
      <div className="absolute right-24 top-52 hidden h-44 w-60 rounded-[50%] bg-[#BEEBFF] opacity-45 blur-sm lg:block" />
      <div className="absolute left-7 top-60 text-3xl font-light text-[#F6A300]/70">+</div>
      <div className="absolute right-80 top-32 hidden text-2xl font-light text-[#F6A300]/70 lg:block">+</div>
      <div className="absolute right-40 top-52 hidden h-24 w-24 bg-[radial-gradient(circle,#85CFFF_1.5px,transparent_1.5px)] bg-size-[14px_14px] opacity-35 lg:block" />
    </div>
  );
}

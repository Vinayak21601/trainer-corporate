export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#FBFAF7]" aria-hidden="true">
      {/* Clean, high-performance ambient gradients */}
      <div className="absolute -left-20 -top-10 h-[450px] w-[450px] rounded-full bg-[#FFE9B6]/45 blur-2xl" />
      <div className="absolute right-0 -top-10 h-[500px] w-[500px] rounded-full bg-[#DFF3FF]/65 blur-2xl" />
      <div className="absolute bottom-10 right-20 h-64 w-80 rounded-full bg-[#DDF8E7]/50 blur-2xl" />
      <div className="absolute left-1/3 top-20 h-72 w-72 rounded-full bg-[#F5E6FE]/35 blur-2xl" />

      <div className="absolute left-7 top-60 text-3xl font-light text-[#F6A300]/70">+</div>
      <div className="absolute right-80 top-32 hidden text-2xl font-light text-[#F6A300]/70 lg:block">+</div>
      <div className="absolute right-40 top-52 hidden h-24 w-24 bg-[radial-gradient(circle,#85CFFF_1.5px,transparent_1.5px)] bg-size-[14px_14px] opacity-35 lg:block" />
    </div>
  );
}

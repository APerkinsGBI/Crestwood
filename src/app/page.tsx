export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(56,128,255,0.12),transparent_70%)]" />

      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-foreground/60">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
        </span>
        Building
      </span>

      <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
        Insurance AI
      </h1>

      <p className="mt-5 max-w-xl text-balance text-base text-foreground/60 sm:text-lg">
        An AI platform that sits on top of your agency management system and
        takes the repetitive work off your team&rsquo;s plate.
      </p>

      <p className="mt-10 font-mono text-xs uppercase tracking-widest text-foreground/40">
        Something is being built here.
      </p>
    </main>
  );
}

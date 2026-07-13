const Atmosphere = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden="true">
      {/* Slow drifting color orbs */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] animate-drift" />
      <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] rounded-full bg-accent/5 blur-[120px] animate-drift-reverse" />
      <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] rounded-full bg-primary/5 blur-[140px] animate-drift-slow" />

      {/* Floating dust particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/20 animate-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${14 + Math.random() * 24}s`,
            animationDelay: `${Math.random() * 12}s`,
          }}
        />
      ))}

      {/* Cinematic vertical light lines */}
      <div className="absolute top-0 left-[18%] w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-pulse-slow" />
      <div
        className="absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-pulse-slow"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="absolute top-0 left-[82%] w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-pulse-slow"
        style={{ animationDelay: "2.4s" }}
      />
    </div>
  );
};

export default Atmosphere;

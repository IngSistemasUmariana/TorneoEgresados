import { useEffect, useState } from "react";

export const ParticlesBackground = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generar partículas al montar
    const initialParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 80 + 20,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 2 + 0.5,
      directionX: Math.random() > 0.5 ? 1 : -1,
      directionY: Math.random() > 0.5 ? 1 : -1,
    }));
    setParticles(initialParticles);

    // Movimiento continuo
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          let newTop = p.top + p.directionY * p.speed * 0.1;
          let newLeft = p.left + p.directionX * p.speed * 0.1;

          // Rebote en bordes
          if (newTop < 0 || newTop > 100) p.directionY *= -1;
          if (newLeft < 0 || newLeft > 100) p.directionX *= -1;

          return {
            ...p,
            top: Math.max(0, Math.min(100, newTop)),
            left: Math.max(0, Math.min(100, newLeft)),
          };
        })
      );
    }, 50); // velocidad de actualización

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-white/25 rounded-full blur-3xl transition-all duration-300 ease-in-out"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.top}%`,
            left: `${p.left}%`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

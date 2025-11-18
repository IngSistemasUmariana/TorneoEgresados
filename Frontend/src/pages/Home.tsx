// Home.tsx — Intro cinematográfica “Marvel” (sin parpadeos; solo 1 vez por navegador)
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ChevronRight, Trophy, Users, Calendar } from "lucide-react";
import { useNavigation } from "../context/NavigationContext";
import "./Home.css";

interface Sport {
  name: string;
  description: string;
  image: string;
}

// ✅ Lazy initializer: evita que React pinte la intro antes de leer localStorage.
//    Así prevenimos el "flash" de la animación por unos segundos.
const getInitialShowHero = (): boolean => {
  try {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("introPlayed") === "true";
  } catch {
    return false;
  }
};

export const Home: React.FC = () => {
  const { navigateTo } = useNavigation();

  // ✅ showHero inicia en true si ya se reprodujo la intro antes.
  const [showHero, setShowHero] = useState<boolean>(getInitialShowHero);
  const [isVisible, setIsVisible] = useState(false);

  // 🔒 Asegura que no hay flash por hidración: refuerza estado antes del primer paint.
  useLayoutEffect(() => {
    try {
      const played = localStorage.getItem("introPlayed") === "true";
      if (played) setShowHero(true);
    } catch {}
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Refs
  const introRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const sports: Sport[] = [
    {
      name: "Microfútbol",
      description: "Equipos de 8 jugadores",
      image:
        "https://s3.amazonaws.com/rtvc-assets-senalcolombia.gov.co/s3fs-public/field/image/medidas-cancha-futbol-salon-articulo.jpg",
    },
    {
      name: "Baloncesto",
      description: "Equipos de 8 jugadores",
      image:
        "https://reglasdeldeporte.com/wp-content/uploads/Reglas-del-baloncesto.jpg",
    },
    {
      name: "Ping Pong",
      description: "Equipos de 1 jugador",
      image:
        "https://static.wixstatic.com/media/d9a908_9788d245789c4c4b92b72651bf14f704~mv2.jpg/v1/fill/w_752,h_502,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d9a908_9788d245789c4c4b92b72651bf14f704~mv2.jpg",
    },
  ];

  // ===== INTRO MARVEL-LIKE =====
  useEffect(() => {
    // Si ya debe mostrarse el hero, no inicializamos GSAP (evita parpadeos y costos)
    if (showHero) return;

    if (!introRef.current) return;
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".intro-panel");
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          gsap.to(introRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
              setShowHero(true);
              // Guardar bandera en localStorage para no repetir la intro
              try {
                localStorage.setItem("introPlayed", "true");
              } catch {}
            },
          });
        },
      });

      gsap.set(panels[0], { xPercent: -120, scale: 1.08, filter: "blur(6px)" });
      gsap.set(panels[1], { xPercent: 120, scale: 1.08, filter: "blur(6px)" });
      gsap.set(panels[2], { xPercent: -120, scale: 1.08, filter: "blur(6px)" });

      tl.to(panels[0], { xPercent: 0, duration: 1.2 }, 0.0)
        .to(panels[1], { xPercent: 0, duration: 1.2 }, 0.25)
        .to(panels[2], { xPercent: 0, duration: 1.2 }, 0.5)
        .to(
          panels,
          { scale: 1, filter: "blur(0px)", duration: 1.6, stagger: 0.1 },
          ">-0.1"
        );

      if (sweepRef.current) {
        gsap.set(sweepRef.current, { xPercent: -120, opacity: 0 });
        tl.to(
          sweepRef.current,
          { xPercent: 120, opacity: 0.6, duration: 1.4 },
          ">-0.4"
        ).to(sweepRef.current, { opacity: 0, duration: 0.4 }, ">-0.2");
      }

      if (logoRef.current) {
        gsap.set(logoRef.current, { opacity: 0, scale: 0.92, filter: "blur(8px)" });
        tl.to(
          logoRef.current,
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2 },
          ">-0.2"
        );
        tl.fromTo(
          ".logo-reveal-mask",
          { width: "0%" },
          { width: "100%", duration: 1.2 },
          "<"
        );
        tl.fromTo(
          ".logo-shine",
          { xPercent: -150, opacity: 0 },
          { xPercent: 150, opacity: 1, duration: 0.8 },
          ">-0.7"
        ).to(".logo-shine", { opacity: 0, duration: 0.2 }, ">-0.1");
      }
    }, introRef);

    return () => ctx.revert();
  }, [showHero]);

  // ===== HERO EFFECT =====
  useEffect(() => {
    if (!showHero) return;
    const onMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(heroRef.current, { x, y, duration: 1, ease: "power3.out" });
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [showHero]);

  return (
    <div className="homepage">
      {/* ===== INTRO MARVEL ===== */}
      <AnimatePresence>
        {!showHero && (
          <motion.div
            className="intro-marvel"
            ref={introRef}
            // Seguridad extra contra parpadeo si por alguna razón showHero cambia durante la animación
            style={{ willChange: "opacity, transform" }}
          >
            <div className="intro-sweep" ref={sweepRef} />
            <div className="intro-panels">
              {sports.map((s) => (
                <div className="intro-panel" key={s.name}>
                  <div
                    className="intro-panel-bg"
                    style={{ backgroundImage: `url('${s.image}')` }}
                  />
                  <div className="intro-panel-gradient" />
                  <div className="intro-panel-caption">
                    <h3>{s.name}</h3>
                    <p>{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="intro-logo-wrap" ref={logoRef}>
              <div className="logo-reveal-mask" />
              <h1 className="intro-logo-text">Torneo Leyendas Unimar 2025</h1>
              <div className="logo-shine" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HERO ===== */}
      {showHero && (
        <>
          <section className="hero-section" ref={heroRef}>
            <div className="bubbles">
              <div className="bubble bubble1" />
              <div className="bubble bubble2" />
              <div className="bubble bubble3" />
              <div className="bubble4" data-bits="01" />
              <div className="bubble5" data-bits="10" />
              <div className="bubble6" data-bits="11" />
              <div className="bubble7" data-bits="00" />
            </div>

            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <h1 className="hero-title shimmer">Torneo Leyendas Unimar 2025</h1>
              <p className="hero-subtitle">
                Vive la pasión, la competencia y la unión deportiva
              </p>
              <motion.button
                className="hero-btn shimmer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo("register")}
              >
                Inscribir Equipo <ChevronRight className="ml-2" />
              </motion.button>
            </motion.div>
          </section>

          {/* ===== TARJETAS DE DEPORTES ===== */}
          <section className="sports-section">
            <h2 className="section-title">Disciplinas Destacadas</h2>
            <p className="section-subtitle">
              Explora las categorías del Torneo Leyendas Unimar 2025
            </p>
            <div className="sports-grid">
              {sports.map((sport, i) => (
                <motion.div
                  key={sport.name}
                  className="sport-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                  }}
                >
                  <div
                    className="sport-banner"
                    style={{ backgroundImage: `url(${sport.image})` }}
                  ></div>
                  <div className="sport-info">
                    <h3>{sport.name}</h3>
                    <p>{sport.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ===== PARTICIPACIÓN INDIVIDUAL ===== */}
      <motion.section
        className="mt-16 text-center px-4 md:px-0"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl shadow-lg p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <motion.div
              className="absolute top-0 left-[-50%] w-full h-full bg-white opacity-10 rotate-12"
              animate={{ left: ["-50%", "150%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 z-10 relative">
            ¿Estás solo y quieres participar?
          </h2>
          <p className="text-lg md:text-xl mb-6 z-10 relative">
            ¡No te preocupes! Contamos con un sistema que te asigna automáticamente a un equipo aleatorio para que puedas competir, divertirte y conocer nuevos compañeros.
          </p>
          <motion.button
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition-colors z-10 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateTo("teams")}
          >
            Unirme Individualmente
          </motion.button>
        </div>
      </motion.section>

      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-1100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Premios Increíbles</h3>
          <p className="text-gray-600">Se ganarán premios</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Comunidad Activa</h3>
          <p className="text-gray-600">
            Únete a cientos de equipos y deportistas apasionados
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Fechas</h3>
          <p className="text-gray-600">Pendientes</p>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const UserLiveViewerBigScreen = () => {
  const [liveMatch, setLiveMatch] = useState<any>(null);
  const [score1, setScore1] = useState<number | null>(null);
  const [score2, setScore2] = useState<number | null>(null);
  const [prev1, setPrev1] = useState<number | null>(null);
  const [prev2, setPrev2] = useState<number | null>(null);

  const [time, setTime] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  const [goalFlash, setGoalFlash] = useState(false);
  const [goalShake, setGoalShake] = useState(false);
  const [scoringTeam, setScoringTeam] = useState<1 | 2 | null>(null);

  const loadLive = () => {
    const m = JSON.parse(localStorage.getItem("live_match") || "null");

    if (m && m.live) {
      setLiveMatch(m);

      if (prev1 !== null && prev2 !== null) {
        if (m.score1 !== prev1 || m.score2 !== prev2) {
          const audio = new Audio("/gol.mp3");
          audio.volume = 0.7;
          audio.play();

          setGoalFlash(true);
          setGoalShake(true);
          setScoringTeam(m.score1 !== prev1 ? 1 : 2);

          setTimeout(() => setGoalFlash(false), 400);
          setTimeout(() => setGoalShake(false), 600);
          setTimeout(() => setScoringTeam(null), 3000);
        }
      }

      setPrev1(m.score1);
      setPrev2(m.score2);
      setScore1(m.score1);
      setScore2(m.score2);
      setTime(m.time || 0);
    } else {
      setLiveMatch(null);
    }
  };

  useEffect(() => {
    loadLive();
    window.addEventListener("storage", loadLive);

    setTimeout(() => setShowIntro(false), 3500);

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }

    return () => window.removeEventListener("storage", loadLive);
  }, []);

  if (!liveMatch)
    return (
      <div className="w-screen h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-7xl mb-4">⚽</div>
          <div className="text-5xl font-bold">No hay partido en vivo</div>
        </motion.div>
      </div>
    );

  return (
    <div
      className="w-screen h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white flex justify-center items-center overflow-hidden relative"
      style={{
        animation: goalShake ? "shakeScreen 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97)" : "",
      }}
    >
      {showIntro && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute z-20 text-center px-8"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[100px] font-black mb-4"
            style={{
              textShadow: "0 0 60px rgba(255,255,255,0.8), 0 0 100px rgba(0,123,255,0.6)",
              letterSpacing: "0.05em",
              background: "linear-gradient(135deg, #fff 0%, #00d4ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MICROFÚTBOL
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-6xl font-bold tracking-wider"
            style={{
              textShadow: "0 0 40px rgba(239, 35, 60, 0.8)",
            }}
          >
            UNIMARIANA 🏆
          </motion.div>
        </motion.div>
      )}

      {goalFlash && (
        <motion.div
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute z-40 w-full h-full bg-gradient-to-br from-yellow-300 via-white to-yellow-200"
        />
      )}

      {!showIntro && (
        <>
          <div className="w-full h-24 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-lg absolute top-0 flex justify-between items-center px-12 border-b border-slate-700/40 shadow-xl">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-xl shadow-md">
                ⏱
              </div>
              <div className="text-3xl font-bold tracking-wider text-slate-100">
                {String(Math.floor(time / 60)).padStart(2, "0")}:
                {String(time % 60).padStart(2, "0")}
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(239, 68, 68, 0.4)",
                    "0 0 30px rgba(239, 68, 68, 0.7)",
                    "0 0 15px rgba(239, 68, 68, 0.4)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="px-6 py-2 bg-red-500 rounded-lg text-lg font-bold tracking-wide flex items-center gap-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2.5 h-2.5 bg-white rounded-full"
                />
                EN VIVO
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-xl font-semibold text-slate-300"
            >
              {liveMatch.partidoEtapa}
            </motion.div>
          </div>

          <div className="absolute top-28 w-full px-20 flex justify-between items-start">
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start"
            >
              <motion.div
                animate={
                  scoringTeam === 1
                    ? {
                        scale: [1, 1.08, 1],
                        color: ["#f5f5f5", "#86efac", "#f5f5f5"],
                      }
                    : {}
                }
                transition={{ duration: 0.6 }}
                className="text-5xl font-bold tracking-tight text-slate-100"
                style={{
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {liveMatch.equipo1.nombre}
              </motion.div>
              <div className="h-1 w-32 bg-gradient-to-r from-slate-600 to-transparent rounded-full mt-2" />
            </motion.div>

            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-end"
            >
              <motion.div
                animate={
                  scoringTeam === 2
                    ? {
                        scale: [1, 1.08, 1],
                        color: ["#f5f5f5", "#86efac", "#f5f5f5"],
                      }
                    : {}
                }
                transition={{ duration: 0.6 }}
                className="text-5xl font-bold tracking-tight text-slate-100"
                style={{
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {liveMatch.equipo2.nombre}
              </motion.div>
              <div className="h-1 w-32 bg-gradient-to-l from-slate-600 to-transparent rounded-full mt-2" />
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${score1}-${score2}`}
              initial={{ scale: 0.8, opacity: 0, rotateX: -45 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 45 }}
              transition={{
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative z-10"
            >
              <div
                className="px-20 py-10 rounded-2xl backdrop-blur-md border flex items-center gap-8 shadow-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(100,116,139,0.25) 0%, rgba(71,85,105,0.15) 100%)",
                  borderColor: "rgba(100,116,139,0.3)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3), inset 0 0 60px rgba(100,116,139,0.05)",
                }}
              >
                <motion.div
                  animate={scoringTeam === 1 ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.4 }}
                  className="text-9xl font-black leading-none text-white"
                  style={{
                    textShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  {score1}
                </motion.div>

                <div className="text-6xl font-light opacity-40 text-slate-300">-</div>

                <motion.div
                  animate={scoringTeam === 2 ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.4 }}
                  className="text-9xl font-black leading-none text-white"
                  style={{
                    textShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  {score2}
                </motion.div>
              </div>

              <motion.div
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -inset-3 bg-gradient-to-r from-slate-600/10 via-slate-500/10 to-slate-600/10 rounded-2xl blur-xl -z-10"
              />
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="w-full h-20 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-lg absolute bottom-0 flex justify-center items-center border-t border-slate-700/20 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-2xl shadow-md">
                ⚽
              </div>
              <div
                className="text-2xl font-semibold tracking-wide text-slate-200"
                style={{
                  textShadow: "0 1px 8px rgba(0,0,0,0.4)",
                }}
              >
                Universidad Mariana
              </div>
            </div>
          </motion.div>

          {scoringTeam && (
            <motion.div
              initial={{ y: -60, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -60, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-1/3 z-30"
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{ duration: 0.7, repeat: 2 }}
                className="text-7xl font-black px-12 py-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-900 rounded-2xl shadow-xl"
                style={{
                  textShadow: "0 2px 0 rgba(0,0,0,0.15)",
                }}
              >
                ⚽ GOOOOL! ⚽
              </motion.div>
            </motion.div>
          )}
        </>
      )}

      <style>{`
        @keyframes shakeScreen {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-15px, 5px) rotate(-1deg); }
          20% { transform: translate(15px, -5px) rotate(1deg); }
          30% { transform: translate(-12px, 8px) rotate(-0.5deg); }
          40% { transform: translate(12px, -8px) rotate(0.5deg); }
          50% { transform: translate(-8px, 4px) rotate(-0.3deg); }
          60% { transform: translate(8px, -4px) rotate(0.3deg); }
          70% { transform: translate(-5px, 2px) rotate(-0.2deg); }
          80% { transform: translate(5px, -2px) rotate(0.2deg); }
          90% { transform: translate(-2px, 1px) rotate(-0.1deg); }
        }
      `}</style>
    </div>
  );
};

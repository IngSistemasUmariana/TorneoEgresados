import { useEffect, useRef, useState } from "react";
import { Trophy, Clock, Radio, Play, Pause, RotateCcw, Power } from "lucide-react";

const ADMIN_USER = "admin";
const ADMIN_PASS = "Egresados2025";

export const AdminLivePanel = () => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/tournament/partidosfutsal");
        const data = await res.json();
        if (data.ok) setMatches(data.partidos || []);
      } catch (err) {
        console.error("Error cargando partidos:", err);
      }
    };
    fetchMatches();
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 1;

          const live = JSON.parse(localStorage.getItem("live_match"));
          if (live) {
            localStorage.setItem("live_match", JSON.stringify({ ...live, time: newTime }));
            window.dispatchEvent(new Event("storage"));
          }

          return newTime;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const login = () => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) setLogged(true);
    else alert("Credenciales incorrectas");
  };

  const activateLive = (match) => {
    setSelectedMatch(match);
    setScore1(match.score1);
    setScore2(match.score2);
    setTime(0);
    setRunning(false);

    localStorage.setItem("live_match", JSON.stringify({ ...match, live: true, time: 0 }));
    window.dispatchEvent(new Event("storage"));
  };

  const resetSystem = () => {
    localStorage.removeItem("live_match");
    window.dispatchEvent(new Event("storage"));
    setSelectedMatch(null);
    setScore1(0);
    setScore2(0);
    setTime(0);
    setRunning(false);
  };

  const updateScoreAPI = async () => {
    if (!selectedMatch) return;
    try {
      await fetch(`http://localhost:4000/api/matches/${selectedMatch.id}/score`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score1, score2 }),
      });

      const live = JSON.parse(localStorage.getItem("live_match"));
      if (live) {
        localStorage.setItem("live_match", JSON.stringify({ ...live, score1, score2 }));
        window.dispatchEvent(new Event("storage"));
      }
    } catch (err) {
      console.error("Error actualizando marcador:", err);
    }
  };

  const startTimer = () => setRunning(true);
  const pauseTimer = () => setRunning(false);

  const resetTimer = () => {
    setTime(0);
    setRunning(false);

    const live = JSON.parse(localStorage.getItem("live_match"));
    if (live) {
      localStorage.setItem("live_match", JSON.stringify({ ...live, time: 0 }));
      window.dispatchEvent(new Event("storage"));
    }
  };

  const formatTime = (t) => {
    const m = String(Math.floor(t / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-[#07101D] text-slate-100 flex items-center justify-center px-4 py-10">

      {!logged ? (
        <div className="w-full max-w-md px-8 py-8 bg-[#0E1526]/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="panel-title text-xl tracking-wide">Panel en vivo — Admin</h2>
              <p className="soft-muted text-xs">Ingresa tus credenciales</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="panel-subtitle block text-xs mb-1">Usuario</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-[#131B31] border border-slate-700 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="admin"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>

            <div>
              <label className="panel-subtitle block text-xs mb-1">Contraseña</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded-lg bg-[#131B31] border border-slate-700 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="********"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            <button
              onClick={login}
              className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-sm shadow-lg hover:scale-[1.02] transition-all"
            >
              <Radio className="w-4 h-4" />
              Entrar al panel
            </button>
          </div>
        </div>
      ) : (

        <div className="w-full max-w-7xl">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-xl">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="panel-title text-3xl tracking-wide leading-tight">Panel en vivo — Torneo</h2>
                <p className="soft-muted text-xs">Control total del marcador y cronómetro</p>
              </div>
            </div>

            <button
              onClick={resetSystem}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-semibold hover:bg-red-600/30 transition"
            >
              <Power className="w-3.5 h-3.5" />
              Reset del sistema
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

            <div className="md:col-span-2 space-y-3">
              <h3 className="panel-subtitle flex items-center gap-2 text-sm text-red-300    " >
                <Radio className="w-4 h-4 text-red-400" />
                Partidos programados
              </h3>

              <div className="bg-[#0D1422]/95 border border-slate-800 rounded-2xl shadow-xl max-h-[520px] overflow-auto">
                <ul className="divide-y divide-slate-800">
                  {matches.map((m) => (
                    <li
                      key={m.id}
                      className={`px-3 py-3 hover:bg-[#1A253A]/60 transition-all cursor-pointer
                      ${selectedMatch?.id === m.id ? "bg-blue-900/30 border-l-4 border-blue-500" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="team-name text-sm font-semibold">
                          {m.equipo1.nombre} <span className="soft-muted text-xs">vs</span> {m.equipo2.nombre}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="stage-text text-xs uppercase tracking-wide">{m.partidoEtapa}</span>

                        <button
                          onClick={() => activateLive(m)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-600 text-white text-[11px] hover:bg-blue-500 transition"
                        >
                          <Radio className="w-3 h-3" />
                          Activar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="bg-[#0D1422]/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-xl min-h-[380px]">

                {!selectedMatch ? (
                  <div className="h-48 flex items-center justify-center soft-muted text-sm text-center">
                    Selecciona un partido para administrarlo.
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
                      <div>
                        <p className="panel-label text-xs uppercase tracking-wide">Partido en vivo</p>
                        <h3 className="panel-title text-lg">
                          {selectedMatch.equipo1.nombre} <span className="soft-muted text-sm">vs</span> {selectedMatch.equipo2.nombre}
                        </h3>
                      </div>

                      <div className="px-3 py-1 rounded-full bg-[#131B31] text-xs soft-muted flex items-center gap-1 shadow">
                        <Clock className="w-3 h-3 text-blue-400" />
                        <span>{formatTime(time)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-6 sm:gap-10 mb-6">
                      <div className="flex flex-col items-center">
                        <span className="soft-muted text-xs mb-1 team-name">{selectedMatch.equipo1.nombre}</span>
                        <input
                          type="number"
                          className="w-16 sm:w-20 py-1 text-center text-3xl font-bold rounded-xl bg-[#131B31] border border-slate-700 focus:ring-2 focus:ring-blue-500"
                          value={score1}
                          onChange={(e) => setScore1(Number(e.target.value))}
                        />
                      </div>

                      <span className="text-4xl font-bold soft-muted">-</span>

                      <div className="flex flex-col items-center">
                        <span className="soft-muted text-xs mb-1 team-name">{selectedMatch.equipo2.nombre}</span>
                        <input
                          type="number"
                          className="w-16 sm:w-20 py-1 text-center text-3xl font-bold rounded-xl bg-[#131B31] border border-slate-700 focus:ring-2 focus:ring-blue-500"
                          value={score2}
                          onChange={(e) => setScore2(Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center mb-8">
                      <button
                        onClick={updateScoreAPI}
                        className="px-8 py-2 bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-900 font-semibold rounded-xl shadow-xl hover:scale-[1.03] transition"
                      >
                        Actualizar marcador
                      </button>
                    </div>

                    <div className="border-t border-slate-800 pt-4">
                      <h4 className="panel-subtitle flex items-center gap-2 text-sm mb-2">
                        <Clock className="w-4 h-4 text-blue-300" />
                        Control del tiempo
                      </h4>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                        <span className="text-3xl font-mono font-semibold text-blue-300">{formatTime(time)}</span>

                        <div className="flex gap-2">
                          <button
                            onClick={startTimer}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 text-xs font-semibold hover:bg-blue-500 shadow"
                          >
                            <Play className="w-3.5 h-3.5 inline mr-1" />
                            Iniciar
                          </button>

                          <button
                            onClick={pauseTimer}
                            className="px-3 py-1.5 rounded-lg bg-amber-500 text-xs font-semibold hover:bg-amber-400 shadow"
                          >
                            <Pause className="w-3.5 h-3.5 inline mr-1" />
                            Pausar
                          </button>

                          <button
                            onClick={resetTimer}
                            className="px-3 py-1.5 rounded-lg bg-slate-700 text-xs font-semibold hover:bg-slate-600 shadow"
                          >
                            <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                            Reiniciar
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ⬇️  ESTILOS PREMIUM */}
      <style>
        {`
          .panel-title {
            color: #F8FAFC !important;
            font-weight: 800 !important;
          }

          .panel-subtitle {
            color: #D4D8E1 !important;
            font-weight: 600 !important;
          }

          .panel-label {
            color: #9CA3AF !important;
            font-weight: 600 !important;
          }

          .team-name {
            color: #E8EDF5 !important;
          }

          .stage-text {
            color: #A7B3C7 !important;
          }

          .soft-muted {
            color: #B5C0D0 !important;
          }
        `}
      </style>

    </div>
  );
};

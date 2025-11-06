import { useState, useEffect } from "react";
import { Users, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TeamTable } from "../components/teams/TeamTable";
import { TeamModal } from "../components/teams/TeamModal";
import { AutoEnrollModal } from "../components/teams/AutoEnrollModal";

export const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState("microfutbol");
  const [viewTeam, setViewTeam] = useState(null);
  const [autoEnrollModal, setAutoEnrollModal] = useState(false);

  /* =========================================================
     🔹 Cargar equipos y deportes
  ========================================================= */
  const fetchData = async () => {
    try {
      const [teamsRes, sportsRes] = await Promise.all([
        fetch("https://torneoegresados.onrender.com/api/teams", { cache: "no-store" }),
        fetch("https://torneoegresados.onrender.com/api/sports", { cache: "no-store" }),
      ]);

      if (!teamsRes.ok || !sportsRes.ok) throw new Error("Error al cargar datos");

      const teamsData = await teamsRes.json();
      const sportsData = await sportsRes.json();

      console.log("⚽ TEAMS:", teamsData);
      console.log("🏆 SPORTS:", sportsData);

      setTeams(teamsData);
      setSports(sportsData);
    } catch (err) {
      toast.error("Error al cargar datos del servidor");
      console.error("❌ Error al cargar:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =========================================================
     🎨 Estilos y etiquetas por deporte
  ========================================================= */
  const sportStyles = {
    microfutbol: {
      label: "Microfútbol",
      color: "from-green-500 to-emerald-700",
      icon: "⚽",
    },
    baloncesto: {
      label: "Baloncesto",
      color: "from-orange-500 to-yellow-600",
      icon: "🏀",
    },
    pingpong: {
      label: "Ping Pong",
      color: "from-cyan-500 to-blue-600",
      icon: "🏓",
    },
  };

  // Normaliza texto: minúsculas, sin espacios ni guiones
  const normalize = (str) => str?.toLowerCase().replace(/\s|-/g, "") || "";

  const sport = sportStyles[selectedSport] || {
    label: selectedSport,
    color: "from-gray-400 to-gray-600",
    icon: "🏆",
  };

  const filteredTeams = teams.filter(
    (t) => normalize(t.sport?.name || t.sport) === normalize(selectedSport)
  );

  /* =========================================================
     🧱 Render principal
  ========================================================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-6">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* ===== Header ===== */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <div
          className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${sport.color} rounded-full mb-4 shadow-lg`}
        >
          <Users className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Tabla de Equipos
        </h1>
        <p className="text-gray-600">
          Equipos registrados en {sport.label} {sport.icon}
        </p>

        {/* ===== Selector de deportes ===== */}
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          {Object.keys(sportStyles).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedSport(key)}
              className={`px-5 py-2 rounded-lg font-semibold shadow-sm transition-all ${
                selectedSport === key
                  ? `bg-gradient-to-r ${sportStyles[key].color} text-white`
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {sportStyles[key].icon} {sportStyles[key].label}
            </button>
          ))}
        </div>

        {/* ===== Botón Auto-enroll ===== */}
        <motion.button
          onClick={() => setAutoEnrollModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          <UserPlus className="w-5 h-5" />
          Participar Individualmente
        </motion.button>
      </div>

      {/* ===== Tabla de equipos ===== */}
      <TeamTable
        teams={filteredTeams}
        sport={sport}
        onViewTeam={setViewTeam}
      />

      {/* ===== Modal de detalles ===== */}
      {viewTeam && (
        <TeamModal
          team={viewTeam}
          onClose={() => {
            setViewTeam(null);
            fetchData();
          }}
        />
      )}

      {/* ===== Modal de auto-inscripción ===== */}
      {autoEnrollModal && (
        <AutoEnrollModal
          sports={sports}
          sportStyles={sportStyles}
          onClose={() => {
            setAutoEnrollModal(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

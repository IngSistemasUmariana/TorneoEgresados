import { motion } from "framer-motion";
import { X, Users, User, Mail, Phone, Calendar } from "lucide-react";

export const TeamModal = ({ team, onClose }) => {
  const sportName = team.sport?.name?.toLowerCase() || "deporte";

  const color =
    {
      microfutbol: "bg-gradient-to-r from-green-600 to-emerald-700",
      baloncesto: "bg-gradient-to-r from-orange-600 to-amber-500",
      pingpong: "bg-gradient-to-r from-blue-500 to-cyan-500",
    }[sportName] || "bg-gradient-to-r from-blue-600 to-indigo-600";

  const icon =
    {
      microfutbol: "⚽",
      baloncesto: "🏀",
      pingpong: "🏓",
    }[sportName] || "🏆";

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col"
      >
        {/* HEADER */}
        <div className={`${color} h-24 flex items-center justify-between px-6`}>
          <div className="flex items-center gap-4 text-white">
            <div className="text-4xl">{icon}</div>
            <div>
              <h2 className="text-sm uppercase tracking-widest font-semibold opacity-90">
                {team.sport?.name}
              </h2>
              <h1 className="text-2xl font-bold">{team.teamName}</h1>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY SCROLLABLE */}
        <div className="flex-1 overflow-y-auto max-h-[75vh] scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-transparent scrollbar-thumb-indigo-400 hover:scrollbar-thumb-indigo-500 transition-all duration-300">
          <div className="p-8 bg-gray-50">
            {/* PANEL DE INFORMACIÓN */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Información del equipo
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                {[
                  {
                    icon: <User className="w-5 h-5 text-white" />,
                    title: "Capitán",
                    value: team.captainName,
                    color: "bg-indigo-500",
                  },
                  {
                    icon: <Mail className="w-5 h-5 text-white" />,
                    title: "Correo",
                    value: team.email,
                    color: "bg-blue-500",
                  },
                  {
                    icon: <Phone className="w-5 h-5 text-white" />,
                    title: "Teléfono",
                    value: team.phone,
                    color: "bg-green-500",
                  },
                  {
                    icon: <Calendar className="w-5 h-5 text-white" />,
                    title: "Registro",
                    value: new Date(team.createdAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }),
                    color: "bg-amber-500",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 border-b border-gray-100 pb-3 last:border-none"
                  >
                    <div
                      className={`flex items-center justify-center ${item.color} w-10 h-10 rounded-full shadow-sm`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        {item.title}
                      </p>
                      <p className="text-sm font-medium text-gray-800 break-words">
                        {item.value || "—"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TABLA DE JUGADORES */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center px-5 py-3 border-b border-gray-200">
                <Users className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="font-semibold text-gray-800">
                  Jugadores del equipo
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">#</th>
                      <th className="px-4 py-3 text-left font-semibold">Nombre</th>
                      <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">
                        Programa
                      </th>
                      <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">
                        Correo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.players?.length ? (
                      team.players.map((p, idx) => (
                        <tr
                          key={idx}
                          className="border-t hover:bg-indigo-50/40 transition"
                        >
                          <td className="px-4 py-3">{idx + 1}</td>
                          <td className="px-4 py-3 font-medium">{p.name}</td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            {p.program || "—"}
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            {p.email || "—"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-4 text-gray-500 italic"
                        >
                          No hay jugadores registrados
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

import { Eye } from "lucide-react";

export const TeamTable = ({ teams, sport, onViewTeam }) => {
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border">
      <div
        className={`bg-gradient-to-r ${sport.color} text-white text-lg font-semibold px-6 py-4`}
      >
        {sport.icon} {sport.label.toUpperCase()}
      </div>

      {teams.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No hay equipos registrados en {sport.label}.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-center">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4 text-left">Equipo</th>
                <th className="py-3 px-4 text-left">Capitán</th>
                <th className="py-3 px-4 text-left">Programa</th>
                <th className="py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {teams.map((team, i) => (
                <tr
                  key={team._id}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="py-3 px-4 font-semibold">{i + 1}</td>
                  <td className="py-3 px-4 text-left font-bold">
                    {team.teamName}
                  </td>
                  <td className="py-3 px-4 text-left">{team.captainName}</td>
                  <td className="py-3 px-4 text-left">
                    {team.players?.[0]?.program || "Egresado"}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onViewTeam(team)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Eye className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

import React, { memo, useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, UserPlus, Crown } from "lucide-react";
import Select from "react-select";

/* =========================================================
   🔹 Programas Universidad Mariana (Egresados)
========================================================= */
const programasData = {
  pregrado: {
    "Facultad de Humanidades y Ciencias Sociales": [
      "Derecho",
      "Trabajo Social",
      "Comunicación Social",
      "Psicología",
    ],
    "Facultad de Ciencias Contables, Económicas y Administrativas": [
      "Mercadeo",
      "Contaduría Pública",
      "Administración de Negocios Internacionales",
    ],
    "Facultad de Educación": [
      "Licenciatura en Teología",
      "Licenciatura en Educación Infantil",
      "Licenciatura en Educación Básica Primaria",
    ],
    "Facultad de Ciencias de la Salud": [
      "Enfermería",
      "Terapia Ocupacional",
      "Fisioterapia",
      "Nutrición y Dietética",
    ],
    "Facultad de Ingeniería": [
      "Ingeniería Mecatrónica",
      "Ingeniería Civil",
      "Ingeniería de Sistemas",
      "Ingeniería Ambiental",
      "Ingeniería de Procesos",
    ],
  },
  posgrado: {
    "Facultad de Ciencias de la Salud": [
      "Especialización en Enfermería Oncológica",
      "Especialización en Enfermería Materno Perinatal",
      "Especialización en Enfermería para el Cuidado del Paciente en Estado Crítico",
      "Maestría en Administración en Salud",
    ],
    "Facultad de Ingeniería": [
      "Especialización en Sistemas Integrados de Gestión",
      "Maestría en Diseño, Gestión y Optimización de Procesos",
      "Maestría en Ciencias Ambientales (Convenio UTP)",
    ],
    "Facultad de Humanidades y Ciencias Sociales": [
      "Especialización en Familia",
      "Maestría en Derecho Público y Privado",
      "Maestría en Gobernanza y Políticas Públicas",
      "Maestría en Salud Mental (Convenio CES Medellín)",
    ],
    "Facultad de Ciencias Contables, Económicas y Administrativas": [
      "Especialización en Gerencia de Marketing Estratégico",
      "Especialización en Alta Gerencia",
      "Especialización en Gerencia Tributaria",
      "Especialización en Gerencia Financiera",
      "Especialización en Gerencia Financiera (Virtual)",
      "Maestría en Gerencia Financiera",
      "Maestría en Gerencia y Auditoría Tributaria",
      "Maestría en Administración",
    ],
    "Facultad de Educación": [
      "Maestría en Gestión Educativa y Liderazgo",
      "Maestría en Pedagogía (Virtual)",
      "Doctorado en Pedagogía",
    ],
  },
};

/* =========================================================
   🔹 Tipos
========================================================= */
interface Player {
  name: string;
  cedula: string;
  egresado: string;
}

interface Props {
  formData: { players: Player[] };
  handlePlayerChange: (
    index: number,
    field: "name" | "cedula" | "egresado",
    value: string
  ) => void;
  addPlayer: () => void;
  removePlayer: (index: number) => void;
  prevStep: () => void;
  nextStep: () => void;
  currentSport: { min: number; max: number };
}

/* =========================================================
   🔹 Fila de jugador individual
========================================================= */
const PlayerRow = memo(
  ({
    index,
    player,
    onChange,
    onRemove,
  }: {
    index: number;
    player: Player;
    onChange: (
      index: number,
      field: "name" | "cedula" | "egresado",
      value: string
    ) => void;
    onRemove: (index: number) => void;
  }) => {
    const handleChange = useCallback(
      (field: "name" | "cedula" | "egresado") =>
        (e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(index, field, e.target.value),
      [index, onChange]
    );

    const programOptions = useMemo(() => {
      const groups: any[] = [];
      const addGroup = (nivel: string, facultades: Record<string, string[]>) => {
        Object.entries(facultades).forEach(([facultad, programas]) => {
          groups.push({
            label: `${nivel} - ${facultad}`,
            options: programas.map((nombre) => ({
              value: nombre,
              label: nombre,
            })),
          });
        });
      };
      addGroup("Pregrado", programasData.pregrado);
      addGroup("Posgrado", programasData.posgrado);
      return groups;
    }, []);

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex flex-wrap md:flex-nowrap items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all ${
          index === 0 ? "relative" : ""
        }`}
      >
        {index === 0 && (
          <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-0.5 rounded-full flex items-center gap-1 shadow-md">
            <Crown className="w-3.5 h-3.5 text-yellow-300" />
            Capitán
          </div>
        )}

        <input
          type="text"
          placeholder={index === 0 ? "Capitán (ya registrado)" : "Nombre completo"}
          value={player.name}
          onChange={handleChange("name")}
          disabled={index === 0}
          className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 outline-none ${
            index === 0
              ? "border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />

        <input
          type="text"
          placeholder={index === 0 ? "Cédula (ya registrada)" : "Cédula"}
          value={player.cedula}
          onChange={handleChange("cedula")}
          disabled={index === 0}
          className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 outline-none ${
            index === 0
              ? "border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />

        {index !== 0 && (
          <div className="flex-1 min-w-[220px]">
            <label className="block text-xs text-gray-600 mb-1 ml-1">
              Programa del cual egresó
            </label>
            <Select
              options={programOptions}
              placeholder="Seleccione o busque un programa..."
              value={
                player.egresado
                  ? { value: player.egresado, label: player.egresado }
                  : null
              }
              onChange={(option) =>
                onChange(index, "egresado", (option as any)?.value || "")
              }
              isSearchable
              classNamePrefix="select"
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderRadius: "8px",
                  borderColor: state.isFocused ? "#2563eb" : "#d1d5db",
                  boxShadow: state.isFocused
                    ? "0 0 0 2px rgba(37,99,235,0.3)"
                    : "none",
                  "&:hover": { borderColor: "#2563eb" },
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 50,
                  borderRadius: "8px",
                }),
              }}
            />
          </div>
        )}

        {index !== 0 && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-600 p-2 rounded-md transition"
            title="Eliminar jugador"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </motion.div>
    );
  }
);

PlayerRow.displayName = "PlayerRow";

/* =========================================================
   🔹 Contenedor principal
========================================================= */
export const StepJugadores: React.FC<Props> = ({
  formData,
  handlePlayerChange,
  addPlayer,
  removePlayer,
  prevStep,
  nextStep,
  currentSport,
}) => {
  const [error, setError] = useState("");

  const handleNext = () => {
    const { players } = formData;
    const count = players.length;

    if (count < currentSport.min) {
      setError(`Debes registrar al menos ${currentSport.min} jugadores.`);
      return;
    }

    if (count > currentSport.max) {
      setError(`Solo puedes registrar hasta ${currentSport.max} jugadores.`);
      return;
    }

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (!player.name.trim() || !player.cedula.trim()) {
        setError(`Todos los jugadores deben tener nombre y cédula.`);
        return;
      }

      if (i !== 0 && !player.egresado.trim()) {
        setError(`Selecciona el programa de egreso del jugador ${i + 1}.`);
        return;
      }
    }

    setError("");
    nextStep();
  };

  return (
    <div className="p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
        Jugadores ({currentSport.min}-{currentSport.max})
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Todos los participantes deben ser egresados de la Universidad Mariana.
      </p>

      <div className="space-y-4">
        {formData.players.map((player, i) => (
          <PlayerRow
            key={i}
            index={i}
            player={player}
            onChange={handlePlayerChange}
            onRemove={removePlayer}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-600 text-sm font-medium mt-4">
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={addPlayer}
          className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Agregar jugador
        </motion.button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={prevStep}
            className="px-5 py-2.5 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all w-full sm:w-auto"
          >
            ← Atrás
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all w-full sm:w-auto"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
};

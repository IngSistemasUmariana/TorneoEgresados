// src/modules/register/components/StepDeporte.tsx
import { Sport } from "../../types";
import { NavButtons } from "./NavButtons";
import { ReactNode } from "react";

interface Props {
  formData: { sport: Sport };
  sportInfo: Record<string, { label: string; icon: ReactNode; min: number; max: number }>;
  handleSportChange: (sport: Sport) => void;
  nextStep: () => void;
  TrophyIcon: ReactNode;
}

export const StepDeporte: React.FC<Props> = ({
  formData,
  sportInfo,
  handleSportChange,
  nextStep,
  TrophyIcon,
}) => {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mb-4 shadow-xl">
          {TrophyIcon}
        </div>

        <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
          Inscripción de Equipos
        </h1>
        <p className="text-gray-600">Selecciona el deporte de tu equipo</p>
      </div>

      {/* Grid deportes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {(Object.keys(sportInfo) as Sport[]).map((sport) => {
          const selected = formData.sport === sport;

          return (
            <button
              key={sport}
              type="button"
              onClick={() => handleSportChange(sport)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 shadow-sm
                ${selected
                  ? "bg-gradient-to-br from-blue-500 to-blue-700 border-transparent text-white shadow-xl scale-[1.03]"
                  : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-md"
                }
              `}
            >
              <div className={`flex justify-center mb-3 text-blue-700 ${selected && "text-white"}`}>
                {sportInfo[sport].icon}
              </div>

              <div className={`text-lg font-bold text-center ${selected ? "text-white" : "text-gray-800"}`}>
                {sportInfo[sport].label}
              </div>

              <div className={`text-sm text-center mt-1 ${selected ? "text-white/90" : "text-gray-500"}`}>
                {sportInfo[sport].min}-{sportInfo[sport].max} jugadores
              </div>
            </button>
          );
        })}
      </div>

      <NavButtons next={nextStep} />
    </div>
  );
};

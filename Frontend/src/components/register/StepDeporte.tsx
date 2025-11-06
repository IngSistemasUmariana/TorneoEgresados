// src/modules/register/components/StepDeporte.tsx
import { Sport } from "../../types";
import { NavButtons } from "./NavButtons";
import { ReactNode } from "react";

interface Props {
  formData: {
    sport: Sport;
  };
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
}) => (
  <div>
    <div className="text-center mb-6 sm:mb-8">
      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full mb-4 shadow-lg">
        {TrophyIcon}
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-1">Inscripción de Equipos</h1>
      <p className="text-gray-600">Selecciona el deporte en el que competirá tu equipo</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {(Object.keys(sportInfo) as Sport[]).map((sport) => (
        <button
          key={sport}
          type="button"
          onClick={() => handleSportChange(sport)}
          className={`p-5 rounded-xl border-2 transition-all duration-300 ${
            formData.sport === sport
              ? `border-transparent bg-gradient-to-br from-blue-500 to-sky-600 text-white shadow-lg scale-105`
              : "border-gray-200 bg-white hover:border-blue-400 hover:shadow-md"
          }`}
        >
          <div className="flex justify-center mb-2 text-blue-700">{sportInfo[sport].icon}</div>
          <div className="font-bold text-lg text-center">{sportInfo[sport].label}</div>
          <div
            className={`text-sm text-center ${
              formData.sport === sport ? "text-white/90" : "text-gray-500"
            }`}
          >
            {sportInfo[sport].min}-{sportInfo[sport].max} jugadores
          </div>
        </button>
      ))}
    </div>

    <NavButtons next={nextStep} />
  </div>
);

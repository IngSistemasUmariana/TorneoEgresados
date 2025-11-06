// src/modules/register/components/StepResumen.tsx
import { Edit3 } from "lucide-react";
import { NavButtons } from "./NavButtons";

interface Props {
  formData: {
    name: string;
    sport: string;
    captain: string;
    captainCedula: string;
    phone: string;
    email: string;
    players: { name: string; cedula: string; egresado: string }[];
  };
  prevStep: () => void;
  handleSubmit: () => void;
  setStep: (s: number) => void;
}

export const StepResumen: React.FC<Props> = ({
  formData,
  prevStep,
  handleSubmit,
  setStep,
}) => (
  <div>
    <h2 className="text-xl font-bold text-gray-800 mb-4">Revisión final</h2>
    <div className="bg-gray-50 border rounded-lg p-4 sm:p-5 space-y-3">
      <p>
        <strong>Equipo:</strong> {formData.name}{" "}
        <button
          onClick={() => setStep(2)}
          className="text-blue-600 ml-2 hover:underline inline-flex items-center gap-1 text-sm"
        >
          <Edit3 className="w-4 h-4" /> Editar
        </button>
      </p>
      <p>
        <strong>Deporte:</strong> {formData.sport}
      </p>
      <p>
        <strong>Capitán:</strong> {formData.captain} — {formData.captainCedula}
      </p>
      <p>
        <strong>Contacto:</strong> {formData.phone} / {formData.email}
      </p>
      <div>
        <strong>Jugadores:</strong>
        <button
          onClick={() => setStep(3)}
          className="ml-2 text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
        >
          <Edit3 className="w-4 h-4" /> Editar
        </button>
        <ul className="ml-6 mt-2 list-disc text-gray-700">
          {formData.players.map((p, i) => (
            <li key={i}>
              {p.name} — {p.cedula} {p.egresado ? `(${p.egresado})` : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <NavButtons back={prevStep} next={handleSubmit} nextLabel="Confirmar" />
  </div>
);

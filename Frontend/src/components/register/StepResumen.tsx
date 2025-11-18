import { Edit3 } from "lucide-react";
import { NavButtons } from "./NavButtons";

export const StepResumen = ({ formData, prevStep, handleSubmit, setStep }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Revisión final</h2>

    <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
      <p>
        <strong>Equipo:</strong> {formData.name}
        <button
          onClick={() => setStep(2)}
          className="text-blue-600 ml-2 hover:underline"
        >
          <Edit3 className="w-4 h-4 inline" /> Editar
        </button>
      </p>

      <p>
        <strong>Deporte:</strong> {formData.sport}
      </p>

      <p>
        <strong>Capitán:</strong> {formData.captain} — {formData.captainCedula}
        {formData.captainProgram ? ` (${formData.captainProgram})` : ""}
      </p>

      <p>
        <strong>Contacto:</strong> {formData.phone} / {formData.email}
      </p>

      <div>
        <strong>Jugadores:</strong>
        <button
          onClick={() => setStep(3)}
          className="text-blue-600 ml-2 hover:underline"
        >
          <Edit3 className="w-4 h-4 inline" /> Editar
        </button>

        <ul className="ml-6 mt-2 list-disc">
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

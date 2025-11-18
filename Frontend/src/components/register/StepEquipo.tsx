// src/modules/register/components/StepEquipo.tsx
import { Dispatch, ReactNode, SetStateAction } from "react";
import { motion } from "framer-motion";
import { ProgramSelector } from "./ProgramSelector";
import { toast } from "react-toastify";

interface Props {
  formData: {
    name: string;
    captain: string;
    captainCedula: string;
    captainProgram: string;
    phone: string;
    email: string;
  };
  setFormData: Dispatch<SetStateAction<any>>;
  prevStep: () => void;
  nextStep: () => void;
  icons: {
    team: ReactNode;
    captain: ReactNode;
    id: ReactNode;
    phone: ReactNode;
    mail: ReactNode;
  };
}

export const StepEquipo: React.FC<Props> = ({
  formData,
  setFormData,
  prevStep,
  nextStep,
  icons,
}) => {
  const validar = () => {
    if (!formData.name.trim()) {
      toast.error("Debes ingresar el nombre del equipo");
      return;
    }
    if (!formData.captain.trim()) {
      toast.error("Debes ingresar el nombre del capitán");
      return;
    }
    if (!formData.captainCedula.trim()) {
      toast.error("Debes ingresar la cédula del capitán");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Debes ingresar el teléfono");
      return;
    }
    if (!formData.captainProgram.trim()) {
      toast.error("Debes seleccionar el programa del capitán");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Debes ingresar el correo electrónico");
      return;
    }

    nextStep(); // deja seguir si todo está lleno ✔
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800">Información del Equipo</h2>
        <p className="text-gray-600 text-sm">
          Ingresa los datos del equipo y del capitán.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5"
      >
        {/* Nombre Equipo */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            {icons.team} Nombre del Equipo
          </label>
          <input
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="Ej: Los Titanes"
            value={formData.name}
            onChange={(e) =>
              setFormData((p: any) => ({ ...p, name: e.target.value }))
            }
          />
        </div>

        {/* Capitán */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            {icons.captain} Nombre del Capitán
          </label>
          <input
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="Nombre completo"
            value={formData.captain}
            onChange={(e) =>
              setFormData((p: any) => ({ ...p, captain: e.target.value }))
            }
          />
        </div>

        {/* Cedula */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            {icons.id} Cédula del Capitán
          </label>
          <input
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="1234567890"
            value={formData.captainCedula}
            onChange={(e) =>
              setFormData((p: any) => ({ ...p, captainCedula: e.target.value }))
            }
          />
        </div>

        {/* Teléfono */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            {icons.phone} Teléfono
          </label>
          <input
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="3001234567"
            value={formData.phone}
            onChange={(e) =>
              setFormData((p: any) => ({ ...p, phone: e.target.value }))
            }
          />
        </div>

        {/* Selector Programa */}
        <div className="md:col-span-2 flex flex-col gap-1">
          <ProgramSelector
            label="Programa del cual egresó (Capitán)"
            value={formData.captainProgram}
            onChange={(program) =>
              setFormData((p: any) => ({ ...p, captainProgram: program }))
            }
          />
        </div>

        {/* Correo */}
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            {icons.mail} Correo Electrónico
          </label>
          <input
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="correo@ejemplo.com"
            value={formData.email}
            onChange={(e) =>
              setFormData((p: any) => ({ ...p, email: e.target.value }))
            }
          />
        </div>
      </motion.div>

      {/* Botones */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="px-5 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300"
        >
          ← Atrás
        </button>

        <button
          onClick={validar}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

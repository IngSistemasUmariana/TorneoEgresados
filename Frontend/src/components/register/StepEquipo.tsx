// src/modules/register/components/StepEquipo.tsx
import { Dispatch, ReactNode, SetStateAction } from "react";
import { motion } from "framer-motion";
import { NavButtons } from "./NavButtons";
import { InputField } from "./InputField";

interface Props {
  formData: {
    name: string;
    captain: string;
    captainCedula: string;
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
}) => (
  <div className="p-6">
    {/* Encabezado */}
    <div className="mb-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800">
        Información del Equipo
      </h2>
      <p className="text-gray-600 text-sm">
        Ingresa los datos del equipo y del capitán. Asegúrate de que la
        información sea correcta.
      </p>
    </div>

    {/* Formulario */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          {icons.team}
          Nombre del Equipo
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((p: any) => ({ ...p, name: e.target.value }))
          }
          placeholder="Ej: Los Titanes"
          className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          {icons.captain}
          Nombre del Capitán
        </label>
        <input
          type="text"
          value={formData.captain}
          onChange={(e) =>
            setFormData((p: any) => ({ ...p, captain: e.target.value }))
          }
          placeholder="Nombre completo"
          className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          {icons.id}
          Cédula del Capitán
        </label>
        <input
          type="text"
          value={formData.captainCedula}
          onChange={(e) =>
            setFormData((p: any) => ({
              ...p,
              captainCedula: e.target.value,
            }))
          }
          placeholder="Ej: 1234567890"
          className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          {icons.phone}
          Teléfono
        </label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) =>
            setFormData((p: any) => ({ ...p, phone: e.target.value }))
          }
          placeholder="Ej: 3001234567"
          className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          {icons.mail}
          Correo Electrónico
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((p: any) => ({ ...p, email: e.target.value }))
          }
          placeholder="correo@ejemplo.com"
          className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>
    </motion.div>

    {/* Botones de navegación */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={prevStep}
        className="w-full sm:w-auto px-6 py-2.5 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all"
      >
        ← Atrás
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={nextStep}
        className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all"
      >
        Siguiente →
      </motion.button>
    </div>
  </div>
);

import React, { useMemo } from "react";
import Select from "react-select";

/* =========================================================
   🔹 Programas Universidad Mariana (Egresados) - Reusables
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

interface Props {
  label?: string;
  value: string;
  onChange: (program: string) => void;
}

export const ProgramSelector: React.FC<Props> = ({ label, value, onChange }) => {
  /* =========================================================
     🔹 Convertir estructura en opciones para react-select
  ========================================================= */
  const options = useMemo(() => {
    const groups: any[] = [];

    const addGroup = (nivel: string, facultades: Record<string, string[]>) => {
      Object.entries(facultades).forEach(([facultad, programas]) => {
        groups.push({
          label: `${nivel} - ${facultad}`,
          options: programas.map((p) => ({ value: p, label: p })),
        });
      });
    };

    addGroup("Pregrado", programasData.pregrado);
    addGroup("Posgrado", programasData.posgrado);

    return groups;
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-gray-700 ml-1">
          {label}
        </label>
      )}

      <Select
        options={options}
        placeholder="Seleccione o busque un programa..."
        value={value ? { label: value, value } : null}
        onChange={(opt: any) => onChange(opt?.value || "")}
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
  );
};

// src/modules/register/components/NavButtons.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  back?: () => void;
  next?: () => void;
  backLabel?: string;
  nextLabel?: string;
}

export const NavButtons: React.FC<Props> = ({
  back,
  next,
  backLabel = "Atrás",
  nextLabel = "Siguiente",
}) => (
  <div className="flex justify-between mt-6 sm:mt-8">
    {back ? (
      <button
        onClick={back}
        className="px-4 sm:px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" /> {backLabel}
      </button>
    ) : (
      <div />
    )}
    {next && (
      <button
        onClick={next}
        className="px-4 sm:px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
      >
        {nextLabel} <ChevronRight className="w-4 h-4" />
      </button>
    )}
  </div>
);

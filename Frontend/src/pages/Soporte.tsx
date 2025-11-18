import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  User,
  FileText,
  MessageCircle,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SERVICE_ID = "service_mdbynpn";
const TEMPLATE_USER_ID = "template_m9a1iq2"; // confirmacion
const TEMPLATE_ADMIN_ID = "template_dae8see"; // ticket_admin_notificacion
const PUBLIC_KEY = "d3rUPJlbBg_wcnMJW";
const ADMIN_EMAIL = "egresadosingsistemas@umariana.edu.co";

export const Soporte = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.nombre || !form.correo || !form.asunto || !form.mensaje) {
      toast.error("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);

    const commonParams = {
      nombre: form.nombre,
      correo: form.correo,
      asunto: form.asunto,
      mensaje: form.mensaje,
      fecha: new Date().toLocaleString("es-CO"),
    };

    try {
      // Correo al usuario
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_USER_ID,
        {
          ...commonParams,
        },
        PUBLIC_KEY
      );

      // Correo al administrador
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ADMIN_ID,
        {
          ...commonParams,
          admin_email: ADMIN_EMAIL,
        },
        PUBLIC_KEY
      );

      toast.success("Tu ticket fue enviado con éxito. Revisa tu correo.");
      setForm({ nombre: "", correo: "", asunto: "", mensaje: "" });
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al enviar el ticket. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-4 py-10">
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Soporte de Egresados Leyendas
              </h1>
              <p className="text-sm text-gray-500">
                “Compitiendo para ayudarte más rápido” ⚽🏀🎖️
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 px-4 py-3 text-xs sm:text-sm text-blue-800 border border-blue-100">
            <p className="font-semibold flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Centro de ayuda para el torneo de egresados
            </p>
            <p>Envíanos tu duda y recibirás una confirmación en tu correo.</p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <User className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Carlos Gómez"
                  className="w-full bg-transparent outline-none text-sm text-gray-800"
                />
              </div>
            </div>

            {/* Correo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                  className="w-full bg-transparent outline-none text-sm text-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Asunto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Asunto del ticket
            </label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <FileText className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="asunto"
                value={form.asunto}
                onChange={handleChange}
                placeholder="Ej: Problema con la inscripción al torneo"
                className="w-full bg-transparent outline-none text-sm text-gray-800"
              />
            </div>
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Describe tu solicitud
            </label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              rows={5}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Cuéntanos qué sucede, en qué deporte estás inscrito y cualquier detalle que nos ayude a ayudarte más rápido."
            />
          </div>

          {/* Botón */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando ticket...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Enviar ticket de soporte
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Al enviar este formulario, recibirás un correo de confirmación con
            el resumen de tu ticket. Nuestro equipo de soporte de Egresados
            Leyendas se comunicará contigo a la brevedad.
          </p>
        </form>
      </div>
    </div>
  );
};

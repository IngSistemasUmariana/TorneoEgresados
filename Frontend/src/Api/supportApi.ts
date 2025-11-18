// src/api/supportApi.ts

const API_URL = "https://script.google.com/macros/s/AKfycbxVQxl4uo3VFeQyu8uEUCeHgOWLUEs07r0A5mWGXAppyB1ZlcFlmOcpO3Lf6C69L7vN8A/exec";

export interface Ticket {
  id: string;
  usuario: string;
  asunto: string;
  descripcion: string;
  estado: string;
  fecha: string;
}

export interface Message {
  ticketId: string;
  autor: string;
  mensaje: string;
  fecha: string;
  tipo: "admin" | "user";
}

// ================================
// Cargar tickets
// ================================
export async function getTickets(): Promise<Ticket[]> {
  const res = await fetch(`${API_URL}?action=getTickets`);
  const data = await res.json();
  return data as Ticket[];
}

// ================================
// Crear ticket
// ================================
export async function createTicket(
  usuario: string,
  asunto: string,
  descripcion: string
): Promise<{ success: boolean; id: string }> {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "createTicket",
      usuario,
      asunto,
      descripcion,
    }),
  });
  const data = await res.json();
  return data as { success: boolean; id: string };
}

// ================================
// Cargar mensajes
// ================================
export async function getMessages(ticketId: string): Promise<Message[]> {
  const res = await fetch(
    `${API_URL}?action=getMessages&ticketId=${encodeURIComponent(ticketId)}`
  );
  const data = await res.json();
  return data as Message[];
}

// ================================
// Enviar mensaje
// ================================
export async function sendMessage(
  ticketId: string,
  autor: string,
  mensaje: string,
  tipo: "admin" | "user"
): Promise<{ success: boolean }> {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "sendMessage",
      ticketId,
      autor,
      mensaje,
      tipo,
    }),
  });
  const data = await res.json();
  return data as { success: boolean };
}

// ================================
// Validar admin
// ================================
export async function validateAdmin(
  usuario: string,
  password: string
): Promise<{ valid: boolean }> {
  const res = await fetch(
    `${API_URL}?action=validateAdmin&user=${encodeURIComponent(usuario)}&pass=${encodeURIComponent(password)}`
  );
  const data = await res.json();
  return data as { valid: boolean };
}

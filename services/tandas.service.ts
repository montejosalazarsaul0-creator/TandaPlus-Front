import { api } from "./api";

// obtener mis tandas
export const getMisTandas = async () => {

  const response = await api.get(
    "/api/tandas/mis-tandas"
  );

  return response.data;

};


// obtener detalle de tanda
export const getTandaById = async (
  tandaId: string
) => {

  const response = await api.get(
    `/api/tandas/${tandaId}`
  );

  return response.data;

};


// crear tanda
export const createTanda = async (data: {
  nombre: string;
  monto_total: number;
  cantidad_participantes: number;
  pago_por_participante: number;
  periodo_pago: string;
  fecha_inicio: Date;
}) => {

  const response = await api.post(
    "/api/tandas",
    data
  );

  return response.data;

};


// verificar código
export const verificarCodigo = async (
  codigo: string
) => {

  const response = await api.get(
    `/api/tandas/verificar-codigo/${codigo}`
  );

  return response.data;

};


// unirse a tanda
export const joinTanda = async (
  codigo: string
) => {

  const response = await api.post(
    "/api/tandas/join-by-code",
    { codigo }
  );

  return response.data;

};


// marcar pago
export const marcarPago = async (
  pagoId: string
) => {

  const response = await api.put(
    `/api/pagos/${pagoId}`
  );

  return response.data;

};

// eliminar particiapante
export const removeParticipante = async (
  tandaId: string, userId: string
) => {
  
  
  const response = await api.delete(`/api/tandas/${tandaId}/participantes/${userId}`);
  
  
  return response.data;
};


// eliminar tanda admin
export const deleteTanda = async (tandaId: string) => {
  const response = await api.delete(`/api/tandas/${tandaId}`);
  return response.data;
};

// Obtener solicitudes pendientes
export const getSolicitudes = async (tandaId: string) => {
  const response = await api.get(`/api/tandas/${tandaId}/solicitudes`);
  return response.data;
};

// Aceptar solicitud
export const aceptarSolicitud = async (tandaId: string, userId: string) => {
  const response = await api.put(`/api/tandas/${tandaId}/solicitudes/${userId}/aceptar`);
  return response.data;
};

// Rechazar solicitud
export const rechazarSolicitud = async (tandaId: string, userId: string) => {
  const response = await api.put(`/api/tandas/${tandaId}/solicitudes/${userId}/rechazar`);
  return response.data;
};
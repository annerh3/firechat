import { format, formatDistanceToNow, isYesterday } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import firebase from "firebase/compat/app";
import { es } from 'date-fns/locale';

export const formatDate = (timestamp) => {
  if (!timestamp) return "Cargando..."; 

  // timestamp de firestore a un objeto Date
  const date = new firebase.firestore.Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate();

  // Obtener la zona horaria local
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Convertir la fecha a la zona horaria local
  const zonedDate = fromZonedTime(date, timeZone);

  // Obtener la diferencia de tiempo en milisegundos
  const now = new Date();
  const diffInMs = now - zonedDate;

  // Si es hoy y dentro de las ultimas 24 horas, mostrar "hace X tiempo"
  if (diffInMs < 24 * 60 * 60 * 1000) {
    return ` ${formatDistanceToNow(zonedDate, { locale: es, addSuffix: true })}`;
  }

  // Si la fecha fue ayer
  if (isYesterday(zonedDate)) {
    return "Ayer";
  }

  // Para fechas más antiguas, formatear en "dd/MM/yyyy hh:mm aaaa"
  return format(zonedDate, 'dd/MM/yyyy hh:mm aaaa', { locale: es });
};
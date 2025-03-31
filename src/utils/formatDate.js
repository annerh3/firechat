import { format } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import firebase from "firebase/compat/app";

export const formatDate = (timestamp) => {
  if (!timestamp) return "Cargando..."; 
  // timestamp de firestore a un objeto Date
  const date = new firebase.firestore.Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate();

  // Obtener la zona horaria local
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // fecha a la hora local según la zona horaria
  const zonedDate = fromZonedTime(date, timeZone);

  // formatear la fecha en formato 12 horas
  return format(zonedDate, 'MM/dd/yyyy hh:mm:ss aaaa'); // Formato: "04/04/2023 09:34:57 PM"
};

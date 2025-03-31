import { formatDate } from "../utils/formatDate";
import { MessageSkeleton } from "./ui/skeletons/MessageSkeleton";

export const Message = ({ message, isLoading, totalMessages, index }) => {

  if (isLoading && index === totalMessages - 1) {
    return null; // Si está cargando (enviando un mensaje) y es el ultimo mensaje, no mostrarlo
  }
  
  return (
    <div
      key={message.id}
      className="group hover:bg-obsidian flex cursor-default items-start gap-3 rounded-lg p-2"
    >
      <div className="mt-1 h-8 w-8 overflow-hidden rounded-full border border-gray-800">
        <img
          src={message.avatar || "/placeholder.svg"}
          alt={message.sender}
          className="pointer-events-none h-full w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium">{message.sender}</span>
          <span className="text-xs text-gray-500">
            {formatDate(message.createdDate)}
          </span>
        </div>
        <div className="mt-1 text-sm text-gray-300">{message.message}</div>
      </div>
    </div>
  );
};

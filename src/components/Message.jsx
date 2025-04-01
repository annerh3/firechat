import { useMessageStore } from "../store/useMessageStore";
import { formatDate } from "../utils/formatDate";
import { EditMessageForm } from "./forms/EditMessageForm";
import { MessageSkeleton } from "./ui/skeletons/MessageSkeleton";
import { ThreeDotMenu } from "./ui/ThreeDotMenu";
import { useAuthStore } from "../store/useAuthStore";

export const Message = ({ message, isLoading, totalMessages, index }) => {
  if (isLoading && index === totalMessages - 1) {
    return null; // Si está cargando (enviando un mensaje) y es el ultimo mensaje, no mostrarlo
  }
  const { isEditing, setEditing, setEditingId, editingId } = useMessageStore();
  const userFromStore = useAuthStore((state) => state.user);
console.log("Mensaje => ", message);


  return (
    <div
      key={message.id}
      className="group hover:bg-obsidian flex cursor-default items-start gap-3 rounded-lg p-2"
    >
      <div className="mt-1 h-8 w-8 overflow-hidden rounded-full border border-gray-800">
        <img
          src={message.avatar}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://i.pinimg.com/474x/81/8a/1b/818a1b89a57c2ee0fb7619b95e11aebd.jpg";
          }}
          alt={message.user}
          className="pointer-events-none h-full w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium">{message.sender}</span>
          <span className="text-xs text-gray-500">
            {formatDate(message.createdDate)}
            {message.isEdited  && " (editado)"}
          </span>
         
        </div>

        {isEditing && (message.email === userFromStore.email) && (message.id === editingId) ? (
          <div className="mt-1 w-full">
            <EditMessageForm editValue={message.message} messageId={message.id} />
          </div>
        ) : (
          <div className="mt-1 flex w-full items-center justify-between">
            <div className="pr-2 text-sm text-gray-300">{message.message}</div>
          </div>
        )}
      </div>
      {message.email === userFromStore.email  && (
        <div
          className="mr-4 flex items-center justify-center pt-1 opacity-0 group-hover:opacity-100"
        >
          <ThreeDotMenu messageId={message.id} />
        </div>
      )}
    </div>
  );
};

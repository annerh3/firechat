import { Send } from "lucide-react";
import { useMessageStore } from "../../store/useMessageStore";

export const MessageInput = ({
  handleSubmit,
  inputValue,
  handleInputChange,
  isMessagesLoading,
}) => {
  const { isEditing } = useMessageStore();
  return (
    <div className="w-full border-t border-gray-800 pt-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          disabled={isEditing}
          placeholder="Escribe un mensaje..."
          className="bg-obsidian flex-1 rounded-md border border-gray-900 px-4 py-2 text-white focus:ring-1 focus:ring-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className={`rounded-md ${isMessagesLoading || isEditing ? "bg-gray-500" : "cursor-pointer bg-amber-800 hover:bg-amber-700"} p-2 transition-colors`}
          disabled={isMessagesLoading || isEditing}
        >
          <Send className="h-4 w-6" />
        </button>
      </form>
    </div>
  );
};

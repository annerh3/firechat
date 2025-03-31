import { Send } from "lucide-react";

export const MessageInput = ({
  handleSubmit,
  inputValue,
  handleInputChange,
}) => {
  return (
    <div className="border-t border-gray-800 pt-4 w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Escribe un mensaje..."
          className="bg-obsidian flex-1 rounded-md border border-gray-900 px-4 py-2 text-white focus:ring-1 focus:ring-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-amber-800 p-2 transition-colors hover:bg-amber-700"
        >
          <Send className="h-4 w-6" />
        </button>
      </form>
    </div>
  );
};

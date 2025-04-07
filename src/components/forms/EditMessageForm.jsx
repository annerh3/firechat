import { Check, X } from "lucide-react";
import React, { useState } from "react";
import { useMessageStore } from "../../store/useMessageStore";
import { useMessages } from "../../hooks/useMessages";

export const EditMessageForm = ({ editValue, messageId }) => {
  const { setEditing, setEditingId } = useMessageStore();
  const [text, setText] = useState(editValue); // Estado para almacenar cambios
  const hasChanged = text !== editValue; // Comparacion con el valor original
  const { handleEdit } = useMessages();
  const handleSubmit = (e) => {
    if (!text.trim()) return; 
    e.preventDefault();
    setEditing(false);
    handleEdit(messageId,text);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-2 mt-1 flex items-center gap-2"
    >
      <textarea
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="bg-obsidian h-[45px] w-full resize-none rounded-md border border-gray-800 px-3 py-1 text-sm text-white focus:ring-1 focus:ring-gray-600 focus:outline-none"
        autoFocus
      />
      <button
        type="submit"
        className={`rounded-md p-1 transition-colors ${
          hasChanged && text.trim() !== "" 
            ? "cursor-pointer bg-amber-600 hover:bg-amber-700"
            : "cursor-not-allowed bg-gray-500"
        }`}
        disabled={!hasChanged || text.trim() === ""}
      >
        <Check />
      </button>
      <button
        type="reset"
        className="bg-charcoal cursor-pointer rounded-md p-1 transition-colors hover:bg-gray-700"
        onClick={() => {setEditing(false); setEditingId("")}}
      >
        <X />
      </button>
    </form>
  );
};

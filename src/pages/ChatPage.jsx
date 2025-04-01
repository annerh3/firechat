import { useEffect } from "react";
import { Message } from "../components";
import { Header } from "../components/ui/Header";
import { generateId } from "../utils/generateid";
import { useMessages } from "../hooks/useMessages";
import { MessageSkeleton } from "../components/ui/skeletons/MessageSkeleton";
import { MessageInput } from "../components/inputs/MessageInput";
import { Loading } from "../components/ui/Loading";
import { NotFound } from "../components/ui/NotFound";
import { useMessageStore } from "../store/useMessageStore";
import ConfirmDeleteModal from "../components/ui/ConfirmDeleteModal";

export default function ChatPage() {
  const {
    messages,
    handleSubmit,
    handleInputChange,
    messagesEndRef,
    inputValue,
    isLoading,
    isMessagesLoading,
    handleDelete
  } = useMessages();
  
  const { isConfirmOpen, setIsConfirmOpen, deleteId } = useMessageStore();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-black text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col p-4">
        <Header messages={messages} />

        <div className="flex-1 overflow-y-auto py-4">
          {isMessagesLoading ? (
            <Loading chatPage />
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center min-h-full">
              <NotFound message="No hay mensajes. Escribe uno."  />
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <Message
                  key={generateId()}
                  message={message}
                  isLoading={isLoading}
                  index={index}
                  totalMessages={messages.length}
                />
              ))}
            </div>
          )}

          {isLoading && <MessageSkeleton />}
          <div ref={messagesEndRef} />
        </div>

        <MessageInput
          handleSubmit={handleSubmit}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          isMessagesLoading={isMessagesLoading}
        />
      </div>

      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onClose={()=>setIsConfirmOpen(false)}
        onConfirm={async () => {await handleDelete(deleteId); setIsConfirmOpen(false)}}
      />
    </div>
  );
}

import { useEffect } from "react";
import { MessageInput, Message } from "../components";
import { Header } from "../components/ui/Header";
import { generateId } from "../utils/generateid";
import { useMessages } from "../hooks/useMessages";
import { MessageSkeleton } from "../components/ui/skeletons/MessageSkeleton";

export default function ChatPage() {
  const { messages, handleSubmit, handleInputChange, messagesEndRef, inputValue, isLoading } = useMessages();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-black text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col p-4">
        <Header messages={messages} />

        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <Message key={generateId()} message={message} isLoading={isLoading}  index={index} totalMessages={messages.length} />
              ))
            ) : (
              <div>No hay mensajes</div>
            )}
            {isLoading && <MessageSkeleton/>}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <MessageInput
          handleSubmit={handleSubmit}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
}

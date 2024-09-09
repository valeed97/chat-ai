import { ChatMessage } from "components/Chat/Message";
import { Separator } from "components/ui/separator";

const ChatMessageList = ({
  messages,
  setCurrentArtifact,
  containerRef,
}) => {
  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col gap-4 max-w-3xl mx-auto w-full pt-1"
    >
      {messages.map((message, index) => (
        <>
          <ChatMessage
            key={index}
            role={message.role}
            model={"claude"}
            text={message.content}
            attachments={message.experimental_attachments || []}
            setCurrentArtifact={setCurrentArtifact}
          />

          {index !== messages.length - 1 && <Separator />}
        </>
      ))}
    </div>
  );
};

export default ChatMessageList;

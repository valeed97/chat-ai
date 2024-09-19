import React, { useEffect } from "react";
import AttachmentPreviewButton from "components/Chat/AttachmentPreviewButton";
import Markdown from "components/Markdown/Markdown";
import { Button } from "components/ui/button";
import { parseMessage } from "lib/utils";
import { BotIcon, CodeIcon, Loader2Icon, UserIcon } from "lucide-react";

export const ChatMessage = ({
  role,
  text,
  attachments,
  setCurrentArtifact,
  isInteractive,
}) => {
  useEffect(() => {
    if (role === "assistant" && !isInteractive) {
      const parts = parseMessage(text);
      parts.forEach(part => {
        if (part.type === "artifact") {
          setCurrentArtifact(part.data);
        }
      });
    }
  }, [role, text, setCurrentArtifact]);

  if (!isInteractive) {
    return null;
  }
  return (
    <div
      className={`flex ${role === "user" ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`flex items-start gap-2 px-4 py-3 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg border border-white border-opacity-20 ${
          role === "tool" ? "bg-opacity-15" : ""
        } ${role === "user" ? 'flex-row-reverse' : 'flex-row'} max-w-[90%] w-fit`}
      >
        {isInteractive && (
          <div
            className={`rounded-full p-2 ${
              role === "user" ? "bg-blue-500" : "bg-indigo-500"
            } flex-shrink-0`}
          >
            {role === "user" ? (
              <UserIcon size={20} className="text-white" />
            ) : (
              <BotIcon size={20} className="text-white" />
            )}
          </div>
        )}

        <div className={`flex flex-col gap-2 overflow-hidden ${role === "user" ? 'items-end' : 'items-start'}`}>
          {attachments.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {attachments.map((attachment, index) => (
                <AttachmentPreviewButton key={index} value={attachment} />
              ))}
            </div>
          )}
          <div className="w-full overflow-hidden">
            {role === "user" ? (
              <Markdown text={text} className="text-white text-left" />
            ) : (
              parseMessage(text).map((part, index) => (
                <MessagePart
                  data={part}
                  key={index}
                  setCurrentArtifact={setCurrentArtifact}
                  isInteractive={isInteractive}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MessagePart = ({ data, setCurrentArtifact, isInteractive}) => {
  useEffect(() => {
    if (data.type === "artifact") {
      setCurrentArtifact(data.data);
    }
  }, []);
  if (data.type === "text") return <Markdown text={data.data} />;

  if (data.type === "artifact" && isInteractive)
    return (
      <Button
        variant="outline"
        className="flex justify-start h-fit w-fit py-0 px-0 my-2"
        // onClick={setCurrentArtifact(data.data)}
      >
        {/* <div className="w-14 h-full flex items-center justify-center border-r">
          {data.data.generating ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <CodeIcon />
          )}
        </div> */}

        <div className="flex flex-col gap-0.5 items-start px-4 py-3">
          <span className="break-words text-md font-semibold leading-tight">
            {data.data?.title || "Generating"}
          </span>
          {/* <span className="text-text-400 line-clamp-1 text-xs">
            {data.data?.content ? "Click to show code" : ""}
          </span> */}
        </div> 
      </Button>
    );

  return null;
};

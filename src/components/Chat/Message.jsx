
import AttachmentPreviewButton  from "components/Chat/AttachmentPreviewButton";
import Markdown from "components/Markdown/Markdown";
import { Button } from "components/ui/button";
import {
  parseMessage,
} from "lib/utils";
import { BotIcon, CodeIcon, Loader2Icon, UserIcon } from "lucide-react";


export const ChatMessage = ({
  role,
  text,
  attachments,
  setCurrentArtifact,
}) => {
  return (
    <div
      className={`flex items-start gap-2 px-2 py-2 rounded-md ${
        role === "tool" ? "bg-[#F4F4F4]" : "bg-white"
      }`}
    >
      <div
        className={`border rounded-md p-1 ${
          role === "user" ? "bg-white" : "bg-black border-black"
        }`}
      >
        {role === "user" ? (
          <UserIcon size={20} />
        ) : (
          <BotIcon size={20} color="white" />
        )}
      </div>

      <div className="flex flex-col gap-2">
        {attachments.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {attachments.map((attachment, index) => (
              <AttachmentPreviewButton key={index} value={attachment} />
            ))}
          </div>
        )}

        {role === "user" && <Markdown text={text} />}

        {role === "assistant" &&
          parseMessage(text).map((part, index) => (
            <MessagePart
              data={part}
              key={index}
              setCurrentArtifact={setCurrentArtifact}
            />
          ))}
      </div>
    </div>
  );
};

const MessagePart = ({
  data,
  setCurrentArtifact,
}) => {
  if (data.type === "text") return <Markdown text={data.data} />;

  if (data.type === "artifact")
    return (
      <Button
        variant="outline"
        className="flex justify-start h-fit w-fit py-0 px-0 my-2"
        onClick={() => setCurrentArtifact(data.data)}
      >
        <div className="w-14 h-full flex items-center justify-center border-r">
          {data.data.generating ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <CodeIcon />
          )}
        </div>

        <div className="flex flex-col gap-0.5 items-start px-4 py-3">
          <span className="break-words text-md font-semibold leading-tight">
            {data.data?.title || "Generating"}
          </span>
          <span className="text-text-400 line-clamp-1 text-xs">
            {data.data?.content ? "Click to show code" : ""}
          </span>
        </div>
      </Button>
    );

  return null;
};

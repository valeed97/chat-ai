import React, { useState } from "react";
import { ArtifactPanel } from "components/Artifact/Index";
import { ChatInput } from "components/Chat/ChatInput";
import ChatMessageList from "components/Chat/ChatMessageList";
import { Loader2Icon } from "lucide-react";
import { useScrollAnchor } from "lib/hooks/useScrollAnchor";
import { sampleMessages } from "lib/SampleMessage";
import { dummyResponses } from "lib/DummyResponse"

const Panel = ({ id }) => {

  // State management
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(id);
  const [initialMessages, setInitialMessages] = useState([]);
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [currentArtifact, setCurrentArtifact] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [selectedArtifacts, setSelectedArtifacts] = useState([]);
  const [isLoading, setIsLoading] = [false]

  const generatingResponse = ()=> {setIsLoading(true)};
  const stopGenerating = () => {setIsLoading(false)};

  // Scroll as new messages are added
  const { messagesRef, scrollRef, showScrollButton, handleManualScroll } =
    useScrollAnchor(messages);

  // Handle artifact capture
  const handleCapture = ({
    selectionImg,
    artifactImg,
  }) => {
    setAttachments((prev) => [
      ...prev,
      {
        contentType: "image/png",
        url: selectionImg,
      },
    ]);

    setSelectedArtifacts((prev) => {
      if (prev.includes(artifactImg)) return prev;
      return [...prev, artifactImg];
    });
  };

  // Handle attachment management
  const handleAddAttachment = (
    newAttachments
  ) => {
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleRemoveAttachment = (
    attachment
  ) => {
    setAttachments((prev) =>
      prev.filter((item) => item.url !== attachment.url)
    );
  };

  const generateDummyResponse = () => {
    const randomIndex = Math.floor(Math.random() * dummyResponses.length);
    return dummyResponses[randomIndex];
  };

  // Handle sending messages
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
        id: Date.now().toString(),
        role: "user",
        content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAttachments([]);
    setSelectedArtifacts([]);

    // Simulate bot response
    // setIsLoading(true);
    setTimeout(() => {
        const botMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateDummyResponse(input),
        };
        setMessages((prev) => [...prev, botMessage]);
        // setIsLoading(false);
    }, 1000); 

    setInput("");
    setAttachments([]);
    setSelectedArtifacts([]);
  };

  return (
    <>
      <div
        className="relative flex w-full flex-1 overflow-x-hidden overflow-y-scroll pt-6"
        ref={scrollRef}
      >
        <div className="relative mx-auto flex h-full w-full min-w-[400px] max-w-3xl flex-1 flex-col md:px-2">
          {fetchingMessages && <Loader2Icon className="animate-spin mx-auto" />}

          <ChatMessageList
            messages={messages}
            setCurrentArtifact={setCurrentArtifact}
            containerRef={messagesRef}
          />

          <ChatInput
            input={input}
            setInput={setInput}
            onSubmit={handleSend}
            isLoading={generatingResponse}
            // recording={recording}
            // onStartRecord={startRecording}
            // onStopRecord={stopRecording}
            attachments={attachments}
            onAddAttachment={handleAddAttachment}
            onRemoveAttachment={handleRemoveAttachment}
            showScrollButton={showScrollButton}
            handleManualScroll={handleManualScroll}
            stopGenerating={stopGenerating}
          />
        </div>
      </div>

      {currentArtifact && (
        <div className="w-full max-w-xl h-full max-h-full pt-6 pb-4">
          <ArtifactPanel
            title={currentArtifact.title}
            id={currentArtifact.id}
            type={currentArtifact.type}
            generating={currentArtifact.generating}
            content={currentArtifact.content}
            language={currentArtifact.language}
            onClose={() => setCurrentArtifact(null)}
            onCapture={handleCapture}
          />
        </div>
      )}
    </>
  );
};

export default Panel 

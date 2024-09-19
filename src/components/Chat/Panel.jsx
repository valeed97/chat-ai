import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Star, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ArtifactPanel from "components/Artifact/Index";
import { ChatInput } from "components/Chat/ChatInput";
import ChatMessageList from "components/Chat/ChatMessageList";
import { useScrollAnchor } from "lib/hooks/useScrollAnchor";
import { PPTResponse } from "lib/PPTResponse";
import { autoResponse } from "lib/autoResponse";
import Tooltip from "./Tooltip";

const Panel = ({ id }) => {
  // State management
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(id);
  const [currentArtifact, setCurrentArtifact] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [selectedArtifacts, setSelectedArtifacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const responseIndexRef = useRef(0);
  const autoResponseIndexRef = useRef(-1);
  const generatingResponse = () => {
    setIsLoading(true);
  };
  const stopGenerating = () => {
    setIsLoading(false);
  };
  const [isInteractive, setIsInteractive] = useState(false);
  const [selectedSubchats, setSelectedSubchats] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [example, setExample] = useState("");
  const messagesEndRef = useRef(null);

  const suggestions = [
    {
      id: 1,
      text: "Operational Efficiency",
      recommended: true,
      example: "E.g., Streamlining production processes",
    },
    {
      id: 2,
      text: "Customer Value",
      recommended: true,
      example: "E.g., Enhancing product features based on feedback",
    },
    {
      id: 3,
      text: "Competitive Advantage",
      recommended: true,
      example: "E.g., Unique selling proposition in the market",
    },
    {
      id: 4,
      text: "Innovation",
      recommended: false,
      example: "E.g., Developing new technologies or products",
    },
    {
      id: 5,
      text: "Market Share",
      recommended: false,
      example: "E.g., Strategies to increase market penetration",
    },
    {
      id: 6,
      text: "Employee Satisfaction",
      recommended: false,
      example: "E.g., Implementing flexible work arrangements",
    },
    {
      id: 7,
      text: "Sustainability",
      recommended: false,
      example: "E.g., Reducing carbon footprint in operations",
    },
  ];
  const handleSuggestionClick = () => {};
  // Scroll as new messages are added
  const { messagesRef, scrollRef, showScrollButton, handleManualScroll } =
    useScrollAnchor(messages);

  // Handle artifact capture
  const handleCapture = ({ selectionImg, artifactImg }) => {
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
  const handleAddAttachment = (newAttachments) => {
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleRemoveAttachment = (attachment) => {
    setAttachments((prev) =>
      prev.filter((item) => item.url !== attachment.url)
    );
  };

  const handleInteractive = (value) => {
    setIsInteractive(value);
  };
  const generateSequentialResponse = () => {
    const response = PPTResponse[responseIndexRef.current];
    responseIndexRef.current =
      (responseIndexRef.current + 1) % PPTResponse.length;
    return response;
  };

  const generateSequentialAutoResponse = () => {
    const paths = [
      "/chat/growth-plan",
      "/chat/linked-ai-value",
      "/chat/ai-responsible-use",
      "/chat/ai-tech-enablement",
    ];

    const response = autoResponse[autoResponseIndexRef.current];
    navigate(paths[autoResponseIndexRef.current]);
    autoResponseIndexRef.current =
      (autoResponseIndexRef.current + 1) % autoResponse.length;
    return response;
  };

  const handleSend = async (index) => {
    if (isInteractive && !input.trim()) return;
    if (!isInteractive) {
      setSelectedSubchats((prev) => {
        if (prev.includes(index)) {
          return prev; // If already selected, do nothing
        }
        return [...prev, index]; // Add the new selection
      });
    } else {
      const userMessage = {
        id: Date.now().toString(),
        role: "user",
        content: input,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setAttachments([]);
      setSelectedArtifacts([]);
    }

    setIsLoading(true);
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: !isInteractive
          ? generateSequentialAutoResponse()
          : generateSequentialResponse(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (autoResponseIndexRef.current == 0) {
      setIsLoading(true);
      setTimeout(() => {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: generateSequentialAutoResponse(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    }
    return () => {
      autoResponseIndexRef.current = autoResponseIndexRef.current + 1;
    };
  }, []);

  return (
    <>
      <div
        className="relative flex w-full flex-1 overflow-x-hidden overflow-y-scroll pt-6 bg-gray-800 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm"
        ref={scrollRef}
      > 
        <div className="mb-4">
            <h3 className="text-white text-lg mb-3">Suggestions:</h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <Tooltip key={suggestion.id} text={suggestion.example}>
                  <button
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`flex items-center justify-between px-4 py-2 rounded-full text-sm transition-all duration-200 
                      ${selectedSuggestion?.id === suggestion.id 
                        ? 'bg-blue-500 text-white ring-2 ring-green-500' 
                        : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'}`}
                  >
                    <span className="flex items-center">
                      {suggestion.recommended && <Star size={14} className="mr-2 text-yellow-400" />}
                      {suggestion.text}
                    </span>
                    <HelpCircle size={16} className="ml-2 text-gray-400" />
                  </button>
                </Tooltip>
              ))}
            </div>
        </div>
        <div className="relative mx-auto flex h-full w-full min-w-[400px] max-w-2xl flex-1 flex-col md:px-2">
          <ChatMessageList
            messages={messages}
            setCurrentArtifact={setCurrentArtifact}
            containerRef={messagesRef}
            isInteractive={isInteractive}
          />
          
          {isInteractive ? (
            <ChatInput
              input={input}
              setInput={setInput}
              onSubmit={handleSend}
              isLoading={isLoading}
              attachments={attachments}
              onAddAttachment={handleAddAttachment}
              onRemoveAttachment={handleRemoveAttachment}
              showScrollButton={showScrollButton}
              handleManualScroll={handleManualScroll}
              stopGenerating={stopGenerating}
            />
          ) : null}
        </div>
      </div>
      {/* {currentArtifact && (
        <ArtifactPanel
          title={currentArtifact.title}
          id={currentArtifact.id}
          type={currentArtifact.type}
          generating={currentArtifact.generating}
          content={currentArtifact.content}
          language={currentArtifact.language}
          onClose={() => setCurrentArtifact(null)}
          onCapture={handleCapture}
          isInteractive={isInteractive}
          handleInteractive={handleInteractive}
          handleSubChatClick={handleSend}
        />
      )} */}
    </>
  );
};

export default Panel;

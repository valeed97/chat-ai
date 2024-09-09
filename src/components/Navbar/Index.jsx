import React, { useState } from 'react'
import { Link, useParams } from "react-router-dom"
import ChatItem from "components/Navbar/ChatItem"
import { Button } from "components/ui/button";
import {  SidebarIcon, SquarePenIcon } from "lucide-react";

function Index() {
    const [chats, setChats] = useState([]);
    const params = useParams();
    return (
        <div className="h-screen max-h-screen overflow-hidden flex flex-col gap-4 justify-between px-2 py-2 pb-4 bg-slate-50 w-[200px]">
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-lg font-semibold text-center">
              Open Artifacts
            </Link>
  
            <div className="flex items-center justify-between gap-2">
              <Button size="icon" variant="ghost">
                <SidebarIcon className="w-4 h-4" />
              </Button>
  
              <Link href="/new">
                <Button size="icon" variant="ghost">
                  <SquarePenIcon className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
  
          <div className="flex flex-col flex-1 gap-2 overflow-hidden">
            <span className="font-medium">Chats</span>
            {chats && (
              <div className="flex flex-col flex-1 gap-2 overflow-auto">
                {chats.map((item, index) => (
                  <ChatItem
                    key={index}
                    id={item.id}
                    title={item.title}
                    selected={item.id === params.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      );
}

export default Index


import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import { Button } from "components/ui/button";
import {  SidebarIcon, SquarePenIcon } from "lucide-react";

function Index() {
    const location = useLocation();

    const navItems = [
        { path: "/", label: "Fill Details" },
        { path: "/chat", label: "Chat" },
        { path: "/finish", label: "Download" }
    ];
    return (
        <div className="h-screen max-h-screen overflow-hidden flex flex-col gap-4 justify-between px-2 py-2 pb-4 bg-slate-50 w-[200px]">
          <div className="flex flex-col gap-6">
            <Link href="/" className="text-lg font-semibold text-center">
              Open Artifacts
            </Link>
            <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`text-base font-medium text-center py-2 rounded transition-colors
                                ${location.pathname === item.path 
                                    ? "bg-blue-500 text-white" 
                                    : "hover:bg-slate-200"}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
          </div>
          
        </div>
      );
}

export default Index


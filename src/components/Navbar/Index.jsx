import React, { useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { Button } from "components/ui/button";
import {  SidebarIcon, SquarePenIcon } from "lucide-react";

function Index() {
    const params = useParams();
    return (
        <div className="h-screen max-h-screen overflow-hidden flex flex-col gap-4 justify-between px-2 py-2 pb-4 bg-slate-50 w-[200px]">
          <div className="flex flex-col gap-6">
            <Link href="/" className="text-lg font-semibold text-center">
              Open Artifacts
            </Link>
            <nav className="flex flex-col gap-2">
                    <Link to="/" className="text-base font-medium text-center py-2 hover:bg-slate-200 rounded transition-colors">
                        Fill Details
                    </Link>
                    <Link to="/chat" className="text-base font-medium text-center py-2 hover:bg-slate-200 rounded transition-colors">
                        Chat
                    </Link>
                    <Link to="/finish" className="text-base font-medium text-center py-2 hover:bg-slate-200 rounded transition-colors">
                        Download
                    </Link>
                </nav>
          </div>
          
        </div>
      );
}

export default Index


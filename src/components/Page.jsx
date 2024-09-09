import React from "react";
import Panel from "components/Chat/Panel";
import SideNavBar from "components/Navbar/Index";

const Page = () => {
  return (
    <div className="flex gap-4 w-full h-screen max-h-screen overflow-hidden px-2 pl-0">
      <SideNavBar />
      <Panel id={null} />
    </div>
  );
};

export default Page;

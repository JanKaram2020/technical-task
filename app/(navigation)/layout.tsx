import React, { ReactNode } from "react";
import Navigation from "@/components/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"flex flex-col items-center justify-center gap-4"}>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;

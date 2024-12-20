import React from "react";
import Header from "../components/Header";

interface LayoutProps {
  children: React.ReactNode;
  isHeaderTransparent?: boolean;
}

const StandardLayout: React.FC<LayoutProps> = ({
  children,
  isHeaderTransparent = false,
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Header transparent={isHeaderTransparent} />
      <main>{children}</main>
    </div>
  );
};

export default StandardLayout;

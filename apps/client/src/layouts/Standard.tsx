import React from "react";
import Footer from "../components/Footer";
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
      <Footer />
    </div>
  );
};

export default StandardLayout;

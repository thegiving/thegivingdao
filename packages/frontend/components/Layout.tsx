import React from "react";
import Header from "./Header";
// import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}  
    </>
  );
};

export default Layout;

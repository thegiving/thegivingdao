import React from "react";
import Header from "./Header";
// import Footer from "./Footer";

interface ILayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;

import Header from "../pages/components/Header";
// import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;

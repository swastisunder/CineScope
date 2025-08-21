import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-black via-[#0b0b0b] to-black">
      <Header />
      <div className="pt-2 flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

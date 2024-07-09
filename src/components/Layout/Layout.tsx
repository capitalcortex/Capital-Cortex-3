import React from "react";
import Footer from "@/components/Footer/Footer";
import LandingHeader from "@/components/Landing/LandingHeader";

function Layout({ children }: any) {
  return (
    <>
      <LandingHeader />
      <main className="flex flex-col flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;

import React from "react";
import "@styles/globals.css";
import Nav from "@components/Nav";

export const metadata = {
  title: "Share Prompts",
  description: "Discover & Share AI prompts",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <div className="app">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

"use client";
import { usePathname } from "next/navigation";
import Ticker from "../components/Ticker";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import TerminalShell from "./TerminalShell";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Full-screen easter eggs keep their own chrome
  if (pathname === "/terminal") {
    return <TerminalShell />;
  }
  if (pathname === "/geocities" || pathname.startsWith("/geocities/")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Ticker />
      <Nav />
      <main className="flex-1 pt-[84px]">{children}</main>
      <Footer />
    </div>
  );
}

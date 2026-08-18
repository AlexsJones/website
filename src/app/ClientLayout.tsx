"use client";
import { usePathname } from "next/navigation";
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
      <Nav />
      <main className="flex-1 pt-14">{children}</main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://axjns.dev"),
  title: "axjns.dev",
  description:
    "Alex Jones — Principal Engineer @ AWS. Building things with code.",
  openGraph: {
    title: "axjns.dev",
    description:
      "Alex Jones — Principal Engineer @ AWS. Building things with code.",
    url: "https://axjns.dev",
    siteName: "axjns.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "axjns.dev",
    description:
      "Alex Jones — Principal Engineer @ AWS. Building things with code.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0d1117] min-h-screen antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

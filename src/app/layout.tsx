import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://axjns.dev"),
  title: "Alex Jones — axjns.dev",
  description:
    "Alex Jones — engineer, speaker, and open-source contributor. Principal Engineer at AWS and founder of K8sGPT.",
  openGraph: {
    title: "Alex Jones — axjns.dev",
    description:
      "Engineer, speaker, and open-source contributor. Principal Engineer at AWS and founder of K8sGPT.",
    url: "https://axjns.dev",
    siteName: "axjns.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Jones — axjns.dev",
    description:
      "Engineer, speaker, and open-source contributor. Principal Engineer at AWS and founder of K8sGPT.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${archivo.variable}`}
    >
      <body className="min-h-screen antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

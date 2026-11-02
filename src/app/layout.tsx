import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { THEME_INIT_SCRIPT } from "../lib/theme";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
});

// Variable Archivo with the width axis, as on the v2 pages (condensed heads)
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://axjns.dev"),
  title: "Alex Jones — axjns.dev",
  description:
    "Alex Jones — engineer, speaker, open-source contributor, and creator of K8sGPT.",
  openGraph: {
    title: "Alex Jones — axjns.dev",
    description:
      "Engineer, speaker, open-source contributor, and creator of K8sGPT.",
    url: "https://axjns.dev",
    siteName: "axjns.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Jones — axjns.dev",
    description:
      "Engineer, speaker, open-source contributor, and creator of K8sGPT.",
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
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

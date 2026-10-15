import { Orbitron, Space_Grotesk, Rajdhani } from "next/font/google";
import "./globals.css";
import ScrollProgressBar from './components/ui/ScrollProgressBar';

const orbitron = Orbitron({ variable: "--font-orbitron", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space", subsets: ["latin"], display: "swap" });
const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://www.salahbounouh.com";
const TITLE = "Salah Bounouh – Full-Stack Software Engineer";
const DESCRIPTION =
  "Full-stack software engineer (Node.js/TypeScript, Java/Spring Boot, Next.js) based in Tunisia (UTC+1), open to remote roles. Projects, experience and CV.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: "Salah Bounouh", url: SITE_URL }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Salah Bounouh",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Salah Bounouh – Full-Stack Software Engineer, open to remote roles",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} ${rajdhani.variable} antialiased`}
      >
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}

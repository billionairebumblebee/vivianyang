import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { profileSchema } from "./identity";

export const metadata = {
  metadataBase: new URL("https://vivianyang.vercel.app"),
  alternates: { canonical: "/" },
  title: "Vivian Yang — Engineer, Founder & Digital Creator",
  description: "Vivian Yang builds products, makes videos, and brings people together. Explore Cloak, Interaction Club, beauty and lifestyle content, and building in public.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema).replace(/</g, "\\u003c") }} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

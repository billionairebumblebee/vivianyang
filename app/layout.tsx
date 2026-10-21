import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { profileSchema } from "./identity";

export const metadata = {
  metadataBase: new URL("https://vivianyang.vercel.app"),
  alternates: { canonical: "/" },
  title: "Vivian Yang — Berkeley Engineer & Product Builder",
  description: "UC Berkeley Mechanical Engineering student building across consumer software, AI product consulting, hardware prototypes, and creator distribution. Explore Cloak, STING, and selected work.",
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

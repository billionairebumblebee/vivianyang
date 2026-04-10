import "./globals.css";

export const metadata = {
  title: "Vivian Yang",
  description: "Founder, engineer, builder.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import "./globals.css";
import AuthProvider from "@/context/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-[#F4F2ED]">
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}

"use client";
import { useRouteGuard } from "../_hooks/useRouteGuard";
import { Footer } from "./_components/Footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useRouteGuard();
  return (
    <div className="">
      {children}
      <Footer />
    </div>
  );
}

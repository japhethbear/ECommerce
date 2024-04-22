import { Inter } from "next/font/google";
import AdminNavbar from "../../components/AdminNavbar";
import { Metadata } from "next";
import "../../globals.css";
import SessionProvider from "../../components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bear Essentials Market Admin Page",
  description: "Unbearably convenient, unbearably good.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <AdminNavbar />
          <main className="m-auto min-w-[300px] max-w-7xl p-4">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}

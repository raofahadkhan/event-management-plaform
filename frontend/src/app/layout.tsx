"use client"
import "./globals.css";
import AuthProvider from "@/global_state/auth/authState";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-[product-sans]">
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              // theme: {
              //   primary: "green",
              //   secondary: "black",
              // },
            },
          }}
        />
      </body>
    </html>
  );
}

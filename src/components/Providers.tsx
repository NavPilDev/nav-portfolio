"use client";

import { ChatProvider } from "@/contexts/ChatContext";
import { ThemeProvider, useTheme } from "next-themes";
import React from "react";
import { Toaster } from "sonner";
import Chat from "./Chat";

export default function Providers({ children }: { children: React.ReactNode }) {
  const isChatbotEnabled = process.env.NEXT_PUBLIC_ENABLE_CHATBOT === "true";

  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <ChatProvider>
        {children}
        {isChatbotEnabled && <Chat />}
      </ChatProvider>
      <ToastProvider />
    </ThemeProvider>
  );
}

function ToastProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      className="mt-12"
      position="top-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}

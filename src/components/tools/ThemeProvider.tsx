"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  useEffect(() => {
    // Add default classes to body
    document.body.classList.add('font-primary', 'bg-background', 'text-text');
    
    // Add default theme class to html
    document.documentElement.classList.add('light');
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

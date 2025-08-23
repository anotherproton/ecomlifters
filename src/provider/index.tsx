"use client";
import { ThemeProvider } from "@/components/tools/ThemeProvider";
import { AppContextProvider, useMode } from "@/context/app.context";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AppContextProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeWrapper>{children}</ThemeWrapper>
      </ThemeProvider>
    </AppContextProvider>
  );
};

export default Provider;

const ThemeWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { theme, setTheme } = useTheme();
  const { setMode } = useMode();
  
  useEffect(() => {
    // Set initial theme
    if (!theme) {
      setTheme('light');
    }
    // Update mode when theme changes
    setMode(theme as string);
  }, [theme, setTheme, setMode]);

  return <>{children}</>;
};

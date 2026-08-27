import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const MOBILE_BREAKPOINT = 768;

interface ResponsiveContextType {
  isMobile: boolean;
  isDesktop: boolean;
}

const ResponsiveContext = createContext<ResponsiveContextType | null>(null);

export function ResponsiveProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <ResponsiveContext.Provider
      value={{
        isMobile,
        isDesktop: !isMobile,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
}

export function useResponsive() {
  const context = useContext(ResponsiveContext);

  if (!context) {
    throw new Error(
      "useResponsive는 ResponsiveProvider 내부에서 사용해야 합니다.",
    );
  }

  return context;
}

// const { isMobile } = useResponsive();

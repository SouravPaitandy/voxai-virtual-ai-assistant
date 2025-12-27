import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MemoryProvider } from "./context/MemoryContext";
import { useStore } from "./store";

// New Pages
import LandingPage from "./LandingPage";
import AssistantPage from "./pages/Assistant";
import SettingsPage from "./pages/Settings";
import HistoryPage from "./pages/History";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { SplashScreen } from "./components/ui/SplashScreen";

function App() {
  // Watch theme changes and apply to HTML element
  const theme = useStore((state) => state.theme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <MemoryProvider>
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen key="splash" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      {!isLoading && (
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />

            {/* App Routes */}
            <Route path="/app" element={<AssistantPage />} />
            <Route path="/app/history" element={<HistoryPage />} />
            <Route path="/app/settings" element={<SettingsPage />} />

            {/* Public Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Router>
      )}
    </MemoryProvider>
  );
}

export default App;

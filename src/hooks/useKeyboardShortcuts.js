import { useEffect } from "react";

/**
 * Custom hook for keyboard shortcuts
 */
export const useKeyboardShortcuts = (handlers) => {
  useEffect(() => {
    const handleKeydown = (e) => {
      // Ctrl + Space: Toggle listening
      if (e.ctrlKey && e.code === "Space") {
        e.preventDefault();
        handlers.onToggleListening?.();
      }
      // Ctrl + S: Open settings
      else if (e.ctrlKey && e.code === "KeyS") {
        e.preventDefault();
        handlers.onOpenSettings?.();
      }
      // Ctrl + Shift + C: Clear session
      else if (e.ctrlKey && e.shiftKey && e.code === "KeyC") {
        e.preventDefault();
        handlers.onClearSession?.();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handlers]);
};

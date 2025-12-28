import { create } from "zustand";

/**
 * Toast Store
 * Manages notification queue for the application
 */
export const useToast = create((set) => ({
  toasts: [],

  /**
   * Add a new toast
   * @param {string} title - Notification title
   * @param {string} description - Notification detail
   * @param {string} variant - 'default', 'success', 'destructive', 'warning'
   */
  addToast: ({ title, description, variant = "default", duration = 3000 }) => {
    const id = Math.random().toString(36).substr(2, 9);

    set((state) => ({
      toasts: [...state.toasts, { id, title, description, variant }],
    }));

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },

  /**
   * Remove a toast by ID
   */
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

// Helper for direct usage
export const toast = (props) => useToast.getState().addToast(props);

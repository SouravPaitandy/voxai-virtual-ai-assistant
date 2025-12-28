import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useToast } from "../../store/toastStore";

const icons = {
  default: Info,
  success: CheckCircle,
  destructive: AlertCircle,
  warning: AlertTriangle,
};

const variants = {
  default: "bg-white/10 border-white/10 text-foreground",
  success: "bg-green-500/10 border-green-500/20 text-green-500",
  destructive: "bg-red-500/10 border-red-500/20 text-red-500",
  warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
};

export const Toaster = () => {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none p-4">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => {
          const Icon = icons[t.variant] || Info;

          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              layout
              className={`
                pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-lg
                ${variants[t.variant]}
              `}
            >
              <Icon className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                {t.title && (
                  <h4 className="text-sm font-semibold">{t.title}</h4>
                )}
                {t.description && (
                  <p
                    className={`text-sm opacity-90 leading-relaxed font-medium`}
                  >
                    {t.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => dismissToast(t.id)}
                className="opacity-50 hover:opacity-100 transition-opacity p-1 -mr-2 -mt-2"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

import { Sidebar } from "../components/app/Sidebar";
import { useStore } from "../store";
import { Menu } from "lucide-react";

/* eslint-disable react/prop-types */
export const DashboardLayout = ({ children }) => {
  // We can access global state here if needed for layout adjustments
  // e.g., const showSidebar = useStore(state => state.showSidebar);
  const toggleMobileMenu = useStore((state) => state.toggleMobileMenu);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 relative">
      {/* Background Ambient Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <Sidebar />

      <main className="flex-1 relative z-10 flex flex-col h-full overflow-hidden w-full">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-background/80 backdrop-blur-xl z-50 shrink-0 sticky top-0">
          <div className="flex items-center gap-2">
            <img src="/Designer(2).png" alt="VoxAI" className="w-8 h-8" />
            <span className="font-display font-bold text-lg">VoxAI</span>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground active:scale-95 transition-transform"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {children}
      </main>
    </div>
  );
};

import { Navbar } from "./pages/Landing/Navbar";
import { Hero } from "./pages/Landing/Hero";
import { Features } from "./pages/Landing/Features";
import { TechStack } from "./pages/Landing/TechStack";
import { Footer } from "./pages/Landing/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TechStack />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

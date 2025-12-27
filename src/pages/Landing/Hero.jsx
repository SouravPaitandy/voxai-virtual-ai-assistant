import { motion } from "framer-motion";
import { ArrowRight, Mic, Play, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 px-4 overflow-hidden">
      {/* Aurora Background Effects - Pure CSS/Tailwind */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      <div className="container mx-auto z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            <span>Next Generation Voice AI - VoxAI 2.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold leading-tight tracking-tight"
          >
            Your Voice, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-gradient">
              Amplified by AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            Transform the way you work with a voice assistant that actually
            understands context. Experience fluid conversations, real-time
            intelligence, and zero latency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link to="/app">
              <Button
                size="lg"
                variant="glow"
                className="w-full sm:w-auto text-lg group"
              >
                Try VoxAI Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <a href="#features" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:text-primary transition-colors" />
                Explore Features
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-8 flex items-center justify-center lg:justify-start gap-8"
          >
            <div>
              <p className="text-3xl font-display font-bold">99%</p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-3xl font-display font-bold">1000+</p>
              <p className="text-sm text-muted-foreground">Searches</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-3xl font-display font-bold">2ms</p>
              <p className="text-sm text-muted-foreground">Latency</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Interactive Visual (3D-ish feel) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-[600px] mx-auto">
            {/* Center Orb */}
            <div className="absolute inset-0 m-auto w-64 h-64 rounded-full bg-gradient-to-tr from-primary to-purple-600 blur-2xl opacity-40 animate-pulse-slow" />

            <div className="absolute inset-0 m-auto w-48 h-48 rounded-full bg-background border border-white/10 shadow-2xl flex items-center justify-center z-20">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                <Mic className="text-white w-12 h-12 relative z-10" />

                {/* Ripple Effect */}
                <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-[ping_3s_ease-in-out_infinite]" />
              </div>
            </div>

            {/* Floating Cards */}
            <Card className="absolute top-10 right-10 p-4 w-48 animate-float z-30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <span className="text-xs font-medium">Weather Analysis</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-blue-500 rounded-full" />
              </div>
            </Card>

            <Card className="absolute bottom-20 left-0 p-4 w-64 animate-float [animation-delay:2s] z-10">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  AI
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Generating Response...
                  </p>
                  <div className="flex gap-1.5 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Decorative Rings */}
            <div className="absolute inset-0 m-auto w-[80%] h-[80%] border border-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-0 m-auto w-[60%] h-[60%] border border-dashed border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { Card } from "../../components/ui/Card";
import { Code2, Cpu, Database, Globe, Layers, Zap } from "lucide-react";

const technologies = [
  {
    name: "React 18+",
    description:
      "Built on the latest React ecosystem for optimal performance and concurrent rendering.",
    icon: Code2,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    name: "Gemini API",
    description:
      "Powered by Google's advanced multimodal models for distinctively human-like interactions.",
    icon: Cpu,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    name: "ElevenLabs",
    description:
      "Integrated with industry-leading TTS for ultra-realistic voice synthesis.",
    icon: AudioWaveformIcon,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    name: "Open-Meteo",
    description: "Real-time weather data integration with geocoding support.",
    icon: Globe,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    name: "Zustand",
    description:
      "Lightweight, scalable state management for predictable app behavior.",
    icon: Database,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    name: "Framer Motion",
    description: "Production-ready animation library for fluid UI transitions.",
    icon: Layers,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
];

// Custom icon for ElevenLabs since it's specific
function AudioWaveformIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Z" />
      <path d="M8 17a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
      <path d="M14 19a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
      <path d="M20 15a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

export const TechStack = () => {
  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Built for Performance
          </div>
          <h2 className="text-4xl font-display font-bold mb-4">
            Powered by Modern Tech
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            VoxAI leverages the latest web technologies to deliver a fast,
            responsive, and intelligent experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full p-6 flex flex-col gap-4 hover:border-primary/30 transition-colors group bg-white/5 border-white/10">
                <div
                  className={`w-12 h-12 rounded-xl ${tech.bg} flex items-center justify-center ${tech.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <tech.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display mb-2 text-foreground">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

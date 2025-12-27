import { motion } from "framer-motion";
import { Card } from "../../components/ui/Card";
import {
  Bot,
  CloudRain,
  Keyboard,
  Shield,
  Smartphone,
  Sparkles,
} from "lucide-react";

const features = [
  {
    title: "Smart Message Indexing",
    description:
      "Instantly recall any past conversation with our powerful on-device vector indexer, which solves the problem of random searching for an important message inside a conversation. Search by concept, not just keywords, using advanced semantic search technology that understands the context of your queries for pinpoint accuracy.",
    icon: Smartphone,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Context-Aware Conversations",
    description:
      "VoxAI maintains full conversation history, allowing for natural, multi-turn dialogues with deep context retention.",
    icon: Bot,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Privacy Focused",
    description:
      "Your API keys and conversation history are stored locally on your device. Zero server-side retention.",
    icon: Shield,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Real-time Weather",
    description:
      "Integrated Open-Meteo API for instant, accurate weather reports worldwide.",
    icon: CloudRain,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Rich Markdown Support",
    description:
      "Beautifully renders code blocks, tables, and formatted text with syntax highlighting.",
    icon: Keyboard,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Hybrid TTS Engine (Coming Soon)",
    description:
      "Seamlessly switches between ElevenLabs' premium voices and browser synthesis for optimal performance.",
    icon: Sparkles,
    className: "md:col-span-1 md:row-span-1",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-bold mb-4"
          >
            More Than Just a Voice Assistant
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Designed to integrate seamlessly into your workflow with tools that
            enhance productivity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 auto-rows-[200px]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-transparent ${feature.className}`}
            >
              <Card className="h-full flex flex-col justify-between p-8 group relative overflow-hidden bg-white/5 border-white/10 hover:border-primary/50 transition-colors duration-500">
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-display mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
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

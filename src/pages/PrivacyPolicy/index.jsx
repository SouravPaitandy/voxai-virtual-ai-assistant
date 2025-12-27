/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  Lock,
  Database,
  Globe,
  Cpu,
  Eye,
} from "lucide-react";
import { Card } from "../../Components/ui/Card";

const Section = ({ icon: Icon, title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="mb-8"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Icon className="w-5 h-5" />
      </div>
      <h2 className="text-xl font-bold font-display">{title}</h2>
    </div>
    <div className="text-muted-foreground leading-relaxed pl-12 space-y-4">
      {children}
    </div>
  </motion.div>
);

const PrivacyPolicy = () => {
  // useForceScrollTop();
  const lastUpdated = "December 28, 2025";

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Privacy First Architecture
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
        </motion.div>

        <div className="space-y-12">
          {/* Executive Summary */}
          <Card className="p-8 border-primary/20 bg-primary/5 backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              The VoxAI Promise
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              VoxAI is built on a &quot;Local-First&quot; philosophy. Unlike
              traditional voice assistants that stream your audio to the cloud,
              VoxAI processes as much as possible directly on your device. When
              cloud services are required (e.g., for premium TTS), we minimize
              data transfer and retain zero logs. Your conversation history,
              settings, and personal data live in your browser&apos;s local
              storage, giving you complete ownership.
            </p>
          </Card>

          <Section
            icon={Database}
            title="1. Data Collection & Storage"
            delay={0.1}
          >
            <p>
              <strong>Local Storage (IndexDB & LocalStorage):</strong>
              <br />
              All conversation logs, user preferences (display name, voice
              settings), and cached data are stored locally in your browser.
              This data is never automatically synced to our servers.
            </p>
            <p>
              <strong>Vector Indexing:</strong>
              <br />
              As part of our &quot;Smart Message Indexer&quot; feature, your
              messages are converted into vector embeddings for semantic search.
              These mathematical representations of your chats are generated and
              stored 100% locally.
            </p>
          </Section>

          <Section icon={Cpu} title="2. Voice & AI Processing" delay={0.2}>
            <p>
              <strong>Speech-to-Text (STT):</strong>
              <br />
              We utilize the Web Speech API provided by your browser. Voice data
              is processed by your device&apos;s operating system or browser
              vendor (e.g., Google Chrome, Apple, Microsoft) according to their
              respective privacy policies. VoxAI does not retain this audio.
            </p>
            <p>
              <strong>Text-to-Speech (TTS):</strong>
              <br />- <strong>Browser Voices:</strong> Generated locally by your
              OS. Zero network usage.
              <br />- <strong>ElevenLabs (Coming Soon):</strong> If enabled,
              text is sent to ElevenLabs API for audio generation. No personal
              identifiers are attached to these requests.
            </p>
            <p>
              <strong>Gemini API:</strong>
              <br />
              Text prompts are sent to Google&apos;s Gemini API to generate
              responses. These requests are stateless and subject to
              Google&apos;s rigorous enterprise data privacy commitments.
            </p>
          </Section>

          <Section icon={Eye} title="3. User Controls" delay={0.3}>
            <p>
              You have granular control over your data via the{" "}
              <Link to="/app/settings" className="text-primary hover:underline">
                Settings Page
              </Link>
              :
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Auto-save:</strong> Can be toggled off to prevent
                persistent storage of chats.
              </li>
              <li>
                <strong>Clear History:</strong> You can wipe your local database
                instantly.
              </li>
              <li>
                <strong>Data Export:</strong> You can export your chat history
                (coming soon).
              </li>
            </ul>
          </Section>

          <Section icon={Globe} title="4. Third-Party Services" delay={0.4}>
            <p>
              We act as a privacy shield between you and necessary third-party
              providers:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Google Gemini:</strong> LLM inference.
              </li>
              <li>
                <strong>ElevenLabs:</strong> Premium voice synthesis.
              </li>
              <li>
                <strong>Open-Meteo:</strong> Weather data (Lat/Long only, no
                identity).
              </li>
            </ul>
          </Section>

          <Section icon={Shield} title="5. Contact & Rights" delay={0.5}>
            <p>
              Since we do not store your data on our servers, &quot;deletion
              requests&quot; are handled by you - simply clearing your browser
              data wipes everything we know about you.
            </p>
            <p>
              For questions, contact the developer at{" "}
              <a
                href="mailto:souravpaitandy@gmail.com/subject:VoxAI Privacy Policy Query"
                className="text-primary hover:underline"
              >
                souravpaitandy@gmail.com
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

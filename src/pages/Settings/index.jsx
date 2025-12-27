/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { useStore } from "../../store";
import {
  Save,
  User,
  Volume2,
  Settings,
  Type,
  RotateCcw,
  Mic,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { motion } from "framer-motion";

const SettingsToggle = ({ checked, onChange, label, description }) => (
  <div
    className="flex items-center justify-between p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group"
    onClick={() => onChange(!checked)}
  >
    <div>
      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
        {label}
      </p>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
    <div
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        checked ? "bg-primary" : "bg-white/10"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </div>
  </div>
);

const SettingsPage = () => {
  const settings = useStore((state) => state.settings);
  const updateSettings = useStore((state) => state.updateSettings);
  const resetSettings = useStore((state) => state.resetSettings);
  const userName = useStore((state) => state.userName);
  const setUserName = useStore((state) => state.setUserName);
  const selectedVoice = useStore((state) => state.selectedVoice);
  const setSelectedVoice = useStore((state) => state.setSelectedVoice);

  const [localUserName, setLocalUserName] = useState(userName);
  const [hasChanges, setHasChanges] = useState(false);
  const [voices, setVoices] = useState([]);
  const [localSelectedVoice, setLocalSelectedVoice] = useState(selectedVoice);
  // const [usageStats, setUsageStats] = useState(null);

  // // Load usage stats
  // useEffect(() => {
  //   const stats = usageTracker.getUsageStats();
  //   setUsageStats(stats);
  // }, [settings.ttsEngine]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Set default voice if none selected
      if (!selectedVoice && availableVoices.length > 0) {
        const defaultVoice =
          availableVoices.find((v) => v.default) || availableVoices[0];
        setLocalSelectedVoice(defaultVoice);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [selectedVoice]);

  const handleSettingChange = (key, value) => {
    updateSettings({ [key]: value });
    setHasChanges(true);
  };

  const handleUserNameChange = (e) => {
    setLocalUserName(e.target.value);
    setHasChanges(true);
  };

  const handleSave = () => {
    setUserName(localUserName);
    if (localSelectedVoice) {
      setSelectedVoice(localSelectedVoice);
    }
    setHasChanges(false);
  };

  const handleReset = () => {
    resetSettings();
    setLocalUserName("");
    setUserName("");
    setSelectedVoice(null);
    setLocalSelectedVoice(voices.find((v) => v.default) || voices[0]);
    setHasChanges(false);
  };

  const handleVoiceChange = (e) => {
    const voiceName = e.target.value;
    const voice = voices.find((v) => v.name === voiceName);
    setLocalSelectedVoice(voice);
    setHasChanges(true);
  };

  const previewVoice = () => {
    if (localSelectedVoice) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        "Hello! This is how I sound."
      );
      utterance.voice = localSelectedVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl font-bold font-display mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/60">
              Settings
            </h1>
            <p className="text-muted-foreground text-lg">
              Customize your VoxAI experience
            </p>
          </motion.div>

          {/* User Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-2xl shadow-sm dark:shadow-none">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 flex items-center justify-center ring-2 ring-black/5 dark:ring-white/10 shadow-lg shadow-primary/5">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Profile</h2>
                    <p className="text-sm text-muted-foreground">
                      Personalize your assistant
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={localUserName}
                      onChange={handleUserNameChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50/50 dark:bg-black/20 border border-black/5 dark:border-white/10 focus:border-primary/50 focus:bg-white dark:focus:bg-white/5 focus:outline-none transition-all duration-200 text-lg font-medium placeholder:text-muted-foreground/30 text-foreground"
                    />
                    <p className="text-xs text-muted-foreground mt-2 pl-1">
                      VoxAI will greet you by this name
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Voice Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Voice</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure voice interactions
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Voice Selector */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    AI Voice
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={localSelectedVoice?.name || ""}
                      onChange={handleVoiceChange}
                      className="flex-1 min-w-0 max-w-[300px] md:max-w-none px-4 py-3 rounded-xl bg-gray-50/50 dark:bg-black/20 border border-black/5 dark:border-white/10 focus:border-primary/50 focus:bg-white dark:focus:bg-white/5 focus:outline-none transition-all duration-200 text-foreground cursor-pointer truncate"
                    >
                      {voices.length === 0 ? (
                        <option>Loading voices...</option>
                      ) : (
                        voices.map((voice) => (
                          <option
                            key={voice.name}
                            value={voice.name}
                            className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-white"
                          >
                            {voice.name} ({voice.lang})
                          </option>
                        ))
                      )}
                    </select>
                    <button
                      onClick={previewVoice}
                      disabled={!localSelectedVoice}
                      className="px-4 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Preview voice"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 pl-1">
                    Choose how VoxAI sounds when speaking
                  </p>
                </div>

                {/* Auto-submit toggle */}
                <SettingsToggle
                  checked={settings.autoSubmitVoice}
                  onChange={(val) =>
                    handleSettingChange("autoSubmitVoice", val)
                  }
                  label="Auto-submit Voice Input"
                  description="Automatically send voice transcript when you stop speaking"
                />
              </div>
            </CardContent>
          </Card>
          {/* TTS Engine */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Text-to-Speech Engine</h2>
                  <p className="text-sm text-muted-foreground">
                    Choose voice quality
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Voice Engine
                  </label>
                  <select
                    value={settings.ttsEngine}
                    onChange={(e) =>
                      handleSettingChange("ttsEngine", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50/50 dark:bg-black/20 border border-black/5 dark:border-white/10 focus:border-primary/50 focus:bg-white dark:focus:bg-white/5 focus:outline-none transition-all duration-200 text-foreground cursor-pointer"
                  >
                    {/* <option value="elevenlabs">
                      ElevenLabs (Premium AI Voices)
                    </option> */}
                    <option
                      value="browser"
                      className="bg-background text-foreground"
                    >
                      Browser (Free, Unlimited)
                    </option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-2 pl-1">
                    {settings.ttsEngine === "elevenlabs"
                      ? "Ultra-realistic AI voices with 10,000 chars/month free"
                      : "System voices, unlimited usage • We are trying hard to add more voices and TTS engine"}
                  </p>
                </div>

                {/* ElevenLabs Voice Selector */}
                {/* {settings.ttsEngine === "elevenlabs" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      ElevenLabs Voice
                    </label>
                    <select
                      value={settings.elevenLabsVoice}
                      onChange={(e) =>
                        handleSettingChange("elevenLabsVoice", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                    >
                      {getElevenLabsVoices().map((voice) => (
                        <option key={voice.id} value={voice.id}>
                          {voice.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {settings.ttsEngine === "elevenlabs" && usageStats && (
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Monthly Usage</span>
                      <span className="text-sm text-muted-foreground">
                        {usageStats.used.toLocaleString()} /{" "}
                        {usageStats.limit.toLocaleString()} chars
                      </span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{
                          width: `${Math.min(usageStats.percentage, 100)}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {usageStats.remaining.toLocaleString()} characters
                      remaining this month
                      {usageStats.percentage >= 100 &&
                        " • Auto-switched to browser TTS"}
                    </p>
                  </div>
                )} */}
              </div>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-2xl shadow-sm dark:shadow-none">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 flex items-center justify-center ring-2 ring-black/5 dark:ring-white/10 shadow-lg shadow-green-500/5">
                    <Type className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">General</h2>
                    <p className="text-sm text-muted-foreground">
                      App preferences
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-w-md">
                  <SettingsToggle
                    checked={settings.autoSave}
                    onChange={(val) => handleSettingChange("autoSave", val)}
                    label="Auto-save Conversations"
                    description="Automatically save your chat history locally"
                  />

                  <SettingsToggle
                    checked={settings.notifications}
                    onChange={(val) =>
                      handleSettingChange("notifications", val)
                    }
                    label="Notifications"
                    description="Receive browser notifications for updates"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              onClick={handleSave}
              variant="glow"
              disabled={!hasChanges}
              className="flex-1"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;

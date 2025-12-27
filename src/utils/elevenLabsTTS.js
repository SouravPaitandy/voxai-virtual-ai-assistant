/**
 * ElevenLabs TTS Integration
 * Free tier: 10,000 characters/month
 */

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || "";
const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1";

// Popular free voices
const ELEVENLABS_VOICES = {
  rachel: "EXAVITQu4vr4xnSDxMaL", // American Female
  adam: "pNInz6obpgDQGcFmaJgB", // American Male
  bella: "EXAVITQu4vr4xnSDxMaL", // Soft Female
  josh: "21m00Tcm4TlvDq8ikWAM", // Deep Male
};

/**
 * Usage tracker for ElevenLabs
 */
class ElevenLabsUsageTracker {
  constructor() {
    this.storageKey = "elevenlabs_usage";
    this.monthlyLimit = 10000;
    this.loadUsage();
  }

  loadUsage() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      const data = JSON.parse(stored);
      const now = new Date();
      const storedDate = new Date(data.month);

      // Reset if new month
      if (
        now.getMonth() !== storedDate.getMonth() ||
        now.getFullYear() !== storedDate.getFullYear()
      ) {
        this.resetUsage();
      } else {
        this.used = data.used || 0;
        this.month = data.month;
      }
    } else {
      this.resetUsage();
    }
  }

  resetUsage() {
    this.used = 0;
    this.month = new Date().toISOString();
    this.saveUsage();
  }

  saveUsage() {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        used: this.used,
        month: this.month,
      })
    );
  }

  canUse(charCount) {
    return this.used + charCount <= this.monthlyLimit;
  }

  recordUsage(charCount) {
    this.used += charCount;
    this.saveUsage();
  }

  getRemaining() {
    return Math.max(0, this.monthlyLimit - this.used);
  }

  getUsageStats() {
    return {
      used: this.used,
      limit: this.monthlyLimit,
      remaining: this.getRemaining(),
      percentage: Math.round((this.used / this.monthlyLimit) * 100),
    };
  }
}

// Singleton instance
export const usageTracker = new ElevenLabsUsageTracker();

/**
 * Generate speech using ElevenLabs API
 * @param {string} text - Text to convert to speech
 * @param {string} voiceId - Voice ID (default: Rachel)
 * @returns {Promise<Blob>} Audio blob
 */
export async function generateElevenLabsSpeech(
  text,
  voiceId = ELEVENLABS_VOICES.rachel
) {
  if (!ELEVENLABS_API_KEY) {
    throw new Error("ElevenLabs API key not configured");
  }

  const charCount = text.length;

  // Check if we have enough quota
  if (!usageTracker.canUse(charCount)) {
    throw new Error("QUOTA_EXCEEDED");
  }

  try {
    const response = await fetch(
      `${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      const error = await response.json();
      throw new Error(error.detail?.message || "ElevenLabs API error");
    }

    // Record usage
    usageTracker.recordUsage(charCount);

    return await response.blob();
  } catch (error) {
    console.error("ElevenLabs TTS Error:", error);
    throw error;
  }
}

/**
 * Play audio blob
 * @param {Blob} audioBlob - Audio blob to play
 * @returns {Promise<void>}
 */
export function playAudioBlob(audioBlob) {
  return new Promise((resolve, reject) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      resolve();
    };

    audio.onerror = (error) => {
      URL.revokeObjectURL(audioUrl);
      reject(error);
    };

    audio.play().catch(reject);
  });
}

/**
 * Get available ElevenLabs voices
 */
export function getElevenLabsVoices() {
  return [
    { id: ELEVENLABS_VOICES.rachel, name: "Rachel (Female)", gender: "female" },
    { id: ELEVENLABS_VOICES.adam, name: "Adam (Male)", gender: "male" },
    {
      id: ELEVENLABS_VOICES.bella,
      name: "Bella (Soft Female)",
      gender: "female",
    },
    { id: ELEVENLABS_VOICES.josh, name: "Josh (Deep Male)", gender: "male" },
  ];
}

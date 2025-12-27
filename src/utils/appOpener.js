/**
 * App Opener Utility
 * Opens applications and URLs based on user commands
 */

const APP_MAPPINGS = {
  // Browsers
  chrome: "https://www.google.com/chrome/",
  firefox: "https://www.mozilla.org/firefox/",
  edge: "microsoft-edge:",

  // Social Media
  facebook: "https://www.facebook.com",
  twitter: "https://twitter.com",
  x: "https://x.com",
  instagram: "https://www.instagram.com",
  linkedin: "https://www.linkedin.com",
  youtube: "https://www.youtube.com",
  reddit: "https://www.reddit.com",

  // Productivity
  gmail: "https://mail.google.com",
  outlook: "https://outlook.live.com",
  calendar: "https://calendar.google.com",
  drive: "https://drive.google.com",
  docs: "https://docs.google.com",
  sheets: "https://sheets.google.com",
  slides: "https://slides.google.com",

  // Development
  github: "https://github.com",
  stackoverflow: "https://stackoverflow.com",
  vscode: "vscode://",

  // Entertainment
  netflix: "https://www.netflix.com",
  spotify: "https://open.spotify.com",
  twitch: "https://www.twitch.tv",

  // Communication
  discord: "https://discord.com/app",
  slack: "https://slack.com",
  zoom: "https://zoom.us",
  teams: "https://teams.microsoft.com",

  // Others
  amazon: "https://www.amazon.com",
  flipkart: "https://www.flipkart.com",
  maps: "https://maps.google.com",
  translate: "https://translate.google.com",
  weather: "https://weather.com",
};

/**
 * Check if text contains an app open command
 * @param {string} text - User input text
 * @returns {object|null} { appName, url } or null
 */
export function detectAppCommand(text) {
  const lowerText = text.toLowerCase().trim();

  // Pattern: "open [app name]"
  const openMatch = lowerText.match(/^open\s+(.+)$/);
  if (openMatch) {
    const appName = openMatch[1].trim();

    // Check if it's a known app
    if (APP_MAPPINGS[appName]) {
      return {
        appName,
        url: APP_MAPPINGS[appName],
        action: "open",
      };
    }

    // Check if it's a URL
    if (
      appName.startsWith("http://") ||
      appName.startsWith("https://") ||
      appName.includes(".com") ||
      appName.includes(".org") ||
      appName.includes(".in") ||
      appName.includes(".me") ||
      appName.includes(".")
    ) {
      return {
        appName,
        url: appName.startsWith("http") ? appName : `https://${appName}`,
        action: "open",
      };
    }

    // If not any thing matches just search it on google
    return {
      appName,
      url: `https://www.google.com/search?q=${encodeURIComponent(appName)}`,
      action: "search",
    };
  }

  return null;
}

/**
 * Open an app or URL
 * @param {string} url - URL to open
 * @returns {boolean} Success status
 */
export function openApp(url) {
  try {
    window.open(url, "_blank", "noopener,noreferrer");
    return true;
  } catch (error) {
    console.error("Failed to open app:", error);
    return false;
  }
}

/**
 * Get list of available apps
 * @returns {string[]} Array of app names
 */
export function getAvailableApps() {
  return Object.keys(APP_MAPPINGS).sort();
}

/**
 * Generate response for app open command
 * @param {string} appName - Name of the app
 * @param {boolean} success - Whether opening was successful
 * @returns {string} Response message
 */
export function getAppOpenResponse(appName, success) {
  if (success) {
    return `Opening ${appName}...`;
  } else {
    return `Sorry, I couldn't open ${appName}. Please check if pop-ups are blocked.`;
  }
}

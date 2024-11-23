export const MessageCategories = {
    GENERAL: {
      id: 'general',
      icon: '💭',
      label: 'General', 
      bgClass: 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
    },
    CODE: {
      id: 'code',
      icon: '💻',
      label: 'Code',
      bgClass: 'bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
    },
    SYSTEM: {
      id: 'system', 
      icon: '⚙️',
      label: 'System',
      bgClass: 'bg-purple-50 dark:bg-purple-900 text-purple-900 dark:text-purple-100'
    },
    ACTION: {
      id: 'action',
      icon: '▶️', 
      label: 'Action',
      bgClass: 'bg-emerald-50 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100'
    },
    ERROR: {
      id: 'error',
      icon: '⚠️',
      label: 'Error', 
      bgClass: 'bg-red-50 dark:bg-red-900 text-red-900 dark:text-red-100'
    }
  };
  
  export const categorizeMessage = (message) => {
    if (!message) return MessageCategories.GENERAL;
    
    const lowerMessage = message.toLowerCase();
    const patterns = {
      CODE: [/```/, /\bcode\b/, /function\b/, /const\b/, /let\b/, /var\b/],
      ERROR: [/\b(sorry|apologize|fail(ed)?)\b/i, /\bencountered\s+an?\s+error\b/i],
      // /error/i, 
      SYSTEM: [/\bsettings?\b/, /\bsystem\b/, /\bconfigure\b/],
      // /\bvoxai:/,
      ACTION: [/\b(opening|launching|starting|performing)\b/i]
    };

    for (const [category, regexList] of Object.entries(patterns)) {
      if (regexList.some(regex => regex.test(lowerMessage))) {
        return MessageCategories[category];
      }
    }

    return MessageCategories.GENERAL;
  };
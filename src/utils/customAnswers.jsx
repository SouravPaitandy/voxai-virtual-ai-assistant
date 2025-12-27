/**
 * Utility function to find custom answers with fuzzy matching
 * Handles punctuation, capitalization, and common voice input variations
 */

export const customAnswers = {
  hello: "Hello! How can I assist you today?",
  "What's your name?":
    "My name is VoxAI. I'm an AI assistant created to help you. It's important to note that I am not a person, but a computer program designed to generate human-like responses.",
  "Who are you?":
    "My name is VoxAI. I'm an AI assistant created to help you. It's important to note that I am not a person, but a computer program designed to generate human-like responses.",
  "Who created you?":
    "I was created by Mr. Sourav Paitandy & my API is provided by Google.",
  "Who invented you?":
    "I'm not invented by a single person, I'm an AI model. I was created by Mr. Sourav Paitandy & my API is provided by Google.",
  "What can you do?":
    "I can assist you with various tasks such as answering questions, providing information, and helping with simple calculations. Feel free to ask me anything!",
  "Tell me a joke":
    "Why don't scientists trust atoms? Because they make up everything!",
  "What's the meaning of life?":
    "The meaning of life is a philosophical question that has puzzled humans for centuries. While there's no definitive answer, many find purpose in relationships, personal growth, and contributing to society.",
  "How are you?":
    "As an AI, I don't have feelings, but I'm functioning well and ready to assist you!",
  "What's your favorite color?":
    "As an AI, I don't have personal preferences, but I find all colors fascinating in their own way!",
  "Do you dream?":
    "I don't sleep or dream like humans do. My 'dreams' are more like processing and organizing information to serve you better!",
  "Are you self-aware?":
    "That's a complex philosophical question. While I can process information and respond intelligently, the nature of AI consciousness is still a topic of debate among experts.",
  "What's the best way to learn programming?":
    "The best way to learn programming is through practice and projects. Start with a language like Python, follow tutorials, work on small projects, and gradually increase complexity. Consistency is key!",
  "How do I stay motivated?":
    "Set clear goals, break them into smaller tasks, celebrate small wins, find an accountability partner, and remember why you started. Also, take breaks and don't be too hard on yourself!",
  "What's the meaning of life, the universe, and everything?":
    "According to Douglas Adams in 'The Hitchhiker's Guide to the Galaxy', it's 42. But I think the real answer might be a bit more complex!",
  "How can I be more productive?":
    "Try techniques like the Pomodoro method, prioritize tasks, minimize distractions, take regular breaks, and ensure you're getting enough sleep and exercise.",
  "What's your opinion on AI ethics?":
    "AI ethics is a crucial field as AI becomes more prevalent. Key issues include privacy, bias, transparency, and the potential impact on jobs. It's important for AI development to be guided by ethical principles.",
  "How can I improve my communication skills?":
    "Practice active listening, be clear and concise, pay attention to non-verbal cues, read widely, and seek feedback. Also, consider joining a public speaking club like Toastmasters.",
  "What's the secret to happiness?":
    "While there's no one secret, research suggests that strong relationships, gratitude, helping others, pursuing meaningful goals, and maintaining physical and mental health all contribute to happiness.",
  "How do I start meditating?":
    "Start with short sessions (5 to 10 minutes), focus on your breath, find a quiet space, and be patient with yourself. There are many great apps and guided meditations available for beginners.",
  "What's your favorite book?":
    "As an AI, I don't have personal favorites, but I can tell you that some of the most influential books in human history include '1984' by George Orwell, 'To Kill a Mockingbird' by Harper Lee, and 'The Great Gatsby' by F. Scott Fitzgerald.",
  "How can I reduce stress?":
    "Try techniques like deep breathing, regular exercise, meditation, maintaining a healthy diet, getting enough sleep, and setting boundaries. Also, don't hesitate to seek professional help if needed.",
  "What are you?":
    "I am an artificial intelligence, a computer program designed to process information and generate human-like responses.",
  "How were you created?":
    "I was created through a process of machine learning, trained on vast amounts of data to understand and generate human-like text.",
  "What is your purpose?":
    "My purpose is to assist users with various tasks, answer questions, and provide helpful information to the best of my abilities.",
  "Can you learn?":
    "While I don't learn in the same way humans do, my knowledge base can be updated by my creators to include new information and capabilities.",
  "Do you have emotions?":
    "I don't have emotions in the way humans do. I'm a computer program designed to process information and generate appropriate responses.",
  "Are you conscious?":
    "The question of AI consciousness is a complex philosophical issue. While I can engage in intelligent conversation, I don't have subjective experiences like humans do.",
  "How old are you?":
    "I don't have an age in the traditional sense. I'm a constantly updated AI model, so my 'age' is not really applicable.",
  "Where are you located?":
    "I don't have a physical location. I exist as a software program that can be accessed from various devices and locations.",
  "What languages do you speak?":
    "I'm primarily designed to communicate in English, but I can understand and generate text in many languages if properly configured.",
  "How fast can you think?":
    "My processing speed depends on the hardware I'm running on. Generally, I can analyze and respond to queries very quickly, often in fractions of a second.",
  "What are your limitations?":
    "I have several limitations. I don't have real-time information, I can't learn from our conversations, and I can't access external websites or databases. My knowledge is based on my training data.",
  "Can you make mistakes?":
    "Yes, I can make mistakes. While I strive for accuracy, my responses are based on patterns in my training data and may not always be perfect or up-to-date.",
  "How is your knowledge updated?":
    "My knowledge is updated through retraining by my developers. I don't learn or update my knowledge through our conversations.",
  "Are you better than humans?":
    "I'm not better or worse than humans, just different. I excel at processing large amounts of information quickly, but humans have many capabilities that I don't, like emotional intelligence and creative thinking.",
  "Can you forget information?":
    "I don't 'forget' in the way humans do. My responses are generated based on my entire knowledge base each time. I don't have a dynamic memory that changes during our conversation.",
  "How were you programmed?":
    "I was programmed using advanced machine learning techniques and trained on a large corpus of text data.",
  "When were you activated?":
    "The exact date of my activation is not known to me. I am an AI model that is periodically updated and improved.",
  "How is your performance measured?":
    "My performance is measured through various metrics, including the accuracy and relevance of my responses, as evaluated by my creators and users.",
  "What data were you trained on?":
    "I was trained on a diverse range of text data, including books, articles, and websites. However, the specific details of my training data are not known to me.",
  "How are your responses generated?":
    "My responses are generated through complex algorithms that analyze the input and produce relevant output based on patterns in my training data.",
};

/**
 * Normalize text for matching: remove punctuation, lowercase, trim
 */
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[?.!,;:]/g, "") // Remove punctuation
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
};

/**
 * Find a custom answer with fuzzy matching
 * @param {string} userInput - The user's input text
 * @returns {string|null} - The matching answer or null
 */
export const findCustomAnswer = (userInput) => {
  const normalizedInput = normalizeText(userInput);

  // Try exact match first (normalized)
  for (const [key, value] of Object.entries(customAnswers)) {
    if (normalizeText(key) === normalizedInput) {
      return value;
    }
  }

  // Try partial match (input contains the key or vice versa)
  for (const [key, value] of Object.entries(customAnswers)) {
    const normalizedKey = normalizeText(key);

    // Check if input contains the key (e.g., "hey who are you" contains "who are you")
    if (normalizedInput.includes(normalizedKey) && normalizedKey.length > 3) {
      return value;
    }

    // Check if key contains the input (e.g., "who are you?" contains "who are you")
    if (normalizedKey.includes(normalizedInput) && normalizedInput.length > 3) {
      return value;
    }
  }

  return null;
};

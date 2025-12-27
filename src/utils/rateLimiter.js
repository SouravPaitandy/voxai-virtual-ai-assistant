/**
 * Rate Limiter for Gemini API
 * Free tier limits: 5 RPM, 20 RPD, 250k TPM
 */

class RateLimiter {
  constructor() {
    this.requestsPerMinute = [];
    this.requestsPerDay = [];
    this.tokensPerMinute = [];

    // Limits
    this.MAX_RPM = 5;
    this.MAX_RPD = 20;
    this.MAX_TPM = 250000;
  }

  /**
   * Check if request can be made
   * @returns {object} { allowed: boolean, reason: string }
   */
  canMakeRequest() {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    // Clean old requests
    this.requestsPerMinute = this.requestsPerMinute.filter(
      (t) => t > oneMinuteAgo
    );
    this.requestsPerDay = this.requestsPerDay.filter((t) => t > oneDayAgo);
    this.tokensPerMinute = this.tokensPerMinute.filter(
      (t) => t.timestamp > oneMinuteAgo
    );

    // Check RPM
    if (this.requestsPerMinute.length >= this.MAX_RPM) {
      const oldestRequest = this.requestsPerMinute[0];
      const waitTime = Math.ceil((oldestRequest + 60000 - now) / 1000);
      return {
        allowed: false,
        reason: `Rate limit: ${this.MAX_RPM} requests per minute. Please wait ${waitTime} seconds.`,
      };
    }

    // Check RPD
    if (this.requestsPerDay.length >= this.MAX_RPD) {
      return {
        allowed: false,
        reason: `Daily limit reached: ${this.MAX_RPD} requests per day. Try again tomorrow.`,
      };
    }

    // Check TPM
    const tokensThisMinute = this.tokensPerMinute.reduce(
      (sum, t) => sum + t.count,
      0
    );
    if (tokensThisMinute >= this.MAX_TPM) {
      return {
        allowed: false,
        reason: `Token limit: ${this.MAX_TPM} tokens per minute exceeded. Please wait.`,
      };
    }

    return { allowed: true };
  }

  /**
   * Record a request
   * @param {number} tokenCount - Approximate token count
   */
  recordRequest(tokenCount = 1000) {
    const now = Date.now();
    this.requestsPerMinute.push(now);
    this.requestsPerDay.push(now);
    this.tokensPerMinute.push({ timestamp: now, count: tokenCount });
  }

  /**
   * Get current usage stats
   */
  getStats() {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    const rpm = this.requestsPerMinute.filter((t) => t > oneMinuteAgo).length;
    const rpd = this.requestsPerDay.filter((t) => t > oneDayAgo).length;
    const tpm = this.tokensPerMinute
      .filter((t) => t.timestamp > oneMinuteAgo)
      .reduce((sum, t) => sum + t.count, 0);

    return {
      requestsPerMinute: `${rpm}/${this.MAX_RPM}`,
      requestsPerDay: `${rpd}/${this.MAX_RPD}`,
      tokensPerMinute: `${tpm}/${this.MAX_TPM}`,
    };
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

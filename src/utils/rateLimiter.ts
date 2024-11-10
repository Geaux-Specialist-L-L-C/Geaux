// src/utils/rateLimiter.ts
export class RateLimiter {
  private timestamps: number[] = [];
  private readonly limit: number;
  private readonly interval: number;

  constructor(limit: number, intervalMs: number) {
    this.limit = limit;
    this.interval = intervalMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.interval);
    
    if (this.timestamps.length >= this.limit) {
      return false;
    }
    
    this.timestamps.push(now);
    return true;
  }
}
// Base interface to avoid circular dependencies
export interface ADKClientBase {
  fetch(path: string, method: string, body?: any, headers?: Record<string, string>): Promise<Response>;
  getBaseURL(): string;
} 
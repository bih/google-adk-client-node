import { GoogleADKClientConfig } from './types';
import { AppResource } from './resources/app';
import { DebugResource } from './resources/debug';
import { RunResource } from './resources/run';
import { buildURL, handleResponse, createFetchOptions } from './utils';
import { ADKClientBase } from './base';

export class GoogleADKClient implements ADKClientBase {
  private config: GoogleADKClientConfig;
  
  constructor(config: GoogleADKClientConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };
  }

  /**
   * Get app resource for a specific app
   */
  app(appName: string): AppResource {
    return new AppResource(this, appName);
  }

  /**
   * Get debug resource for debugging operations
   */
  debug(): DebugResource {
    return new DebugResource(this);
  }

  /**
   * Get run resource for agent operations
   */
  run(): RunResource {
    return new RunResource(this);
  }

  /**
   * List all available apps
   */
  async listApps(): Promise<string[]> {
    const response = await this.fetch('/list-apps', 'GET');
    return handleResponse(response);
  }

  /**
   * Internal fetch method with error handling
   */
  async fetch(
    path: string,
    method: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<Response> {
    const url = buildURL(this.config.baseURL, path);
    const options = createFetchOptions(method, {
      ...this.config.headers,
      ...headers,
    }, body);

    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the base URL for this client
   */
  getBaseURL(): string {
    return this.config.baseURL;
  }

  /**
   * Get the client configuration
   */
  getConfig(): GoogleADKClientConfig {
    return { ...this.config };
  }
}
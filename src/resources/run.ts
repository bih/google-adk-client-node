import { ADKClientBase } from '../base';
import { buildURL, handleResponse } from '../utils';
import { AgentRunRequest, Event } from '../types';

export class RunResource {
  constructor(private client: ADKClientBase) { }

  /**
   * Run agent with streaming disabled
   */
  async run(request: AgentRunRequest): Promise<Event[]> {
    const path = buildURL(this.client.getBaseURL(), '/run');

    const response = await this.client.fetch(path, 'POST', request);
    return handleResponse(response);
  }

  /**
   * Run agent with server-sent events (streaming)
   */
  async runSSE(request: AgentRunRequest): Promise<any> {
    const path = buildURL(this.client.getBaseURL(), '/run_sse');

    const response = await this.client.fetch(path, 'POST', {
      ...request,
      streaming: true
    });
    return handleResponse(response);
  }

  /**
   * Run agent (alias for run)
   */
  async execute(request: AgentRunRequest): Promise<Event[]> {
    return this.run(request);
  }

  /**
   * Run agent with streaming (alias for runSSE)
   */
  async stream(request: AgentRunRequest): Promise<any> {
    return this.runSSE(request);
  }
} 
import { ADKClientBase } from '../base';
import { buildURLWithParams, handleResponse } from '../utils';

export class DebugResource {
  constructor(private client: ADKClientBase) {}

  /**
   * Get trace dictionary for a specific event
   */
  async getTrace(eventId: string): Promise<any> {
    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/debug/trace/{event_id}',
      { event_id: eventId }
    );
    
    const response = await this.client.fetch(path, 'GET');
    return handleResponse(response);
  }

  /**
   * Get session trace for a specific session
   */
  async getSessionTrace(sessionId: string): Promise<any> {
    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/debug/trace/session/{session_id}',
      { session_id: sessionId }
    );
    
    const response = await this.client.fetch(path, 'GET');
    return handleResponse(response);
  }

  /**
   * Get trace for an event (alias for getTrace)
   */
  async trace(eventId: string): Promise<any> {
    return this.getTrace(eventId);
  }

  /**
   * Get trace for a session (alias for getSessionTrace)
   */
  async sessionTrace(sessionId: string): Promise<any> {
    return this.getSessionTrace(sessionId);
  }
}
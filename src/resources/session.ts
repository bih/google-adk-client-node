import { ADKClientBase } from '../base';
import { ArtifactResource } from './artifact';
import { buildURLWithParams, handleResponse } from '../utils';
import { Session } from '../types';

export class SessionResource {
  constructor(
    private client: ADKClientBase,
    private appName: string,
    private userId: string,
    private sessionId: string
  ) {}

  /**
   * Get the session data
   */
  async get(): Promise<Session> {
    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/users/{user_id}/sessions/{session_id}',
      { 
        app_name: this.appName,
        user_id: this.userId,
        session_id: this.sessionId
      }
    );
    
    const response = await this.client.fetch(path, 'GET');
    return handleResponse(response);
  }

  /**
   * Create or update session with specific ID
   */
  async create(state?: Record<string, any>): Promise<Session> {
    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/users/{user_id}/sessions/{session_id}',
      { 
        app_name: this.appName,
        user_id: this.userId,
        session_id: this.sessionId
      }
    );
    
    const response = await this.client.fetch(path, 'POST', state);
    return handleResponse(response);
  }

  /**
   * Delete the session
   */
  async delete(): Promise<void> {
    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/users/{user_id}/sessions/{session_id}',
      { 
        app_name: this.appName,
        user_id: this.userId,
        session_id: this.sessionId
      }
    );
    
    const response = await this.client.fetch(path, 'DELETE');
    await handleResponse(response);
  }

  /**
   * Get artifacts resource for this session
   */
  artifacts(): ArtifactResource {
    return new ArtifactResource(this.client, this.appName, this.userId, this.sessionId);
  }

  /**
   * Get artifact resource for a specific artifact
   */
  artifact(artifactName: string): ArtifactResource {
    return new ArtifactResource(this.client, this.appName, this.userId, this.sessionId, artifactName);
  }

  /**
   * Get debug trace for this session
   */
  async debugTrace(): Promise<any> {
    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/debug/trace/session/{session_id}',
      { session_id: this.sessionId }
    );
    
    const response = await this.client.fetch(path, 'GET');
    return handleResponse(response);
  }

  /**
   * Get event graph for a specific event
   */
  async getEventGraph(eventId: string): Promise<any> {
    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/users/{user_id}/sessions/{session_id}/events/{event_id}/graph',
      { 
        app_name: this.appName,
        user_id: this.userId,
        session_id: this.sessionId,
        event_id: eventId
      }
    );
    
    const response = await this.client.fetch(path, 'GET');
    return handleResponse(response);
  }

  /**
   * Get the session ID
   */
  getId(): string {
    return this.sessionId;
  }

  /**
   * Get the user ID
   */
  getUserId(): string {
    return this.userId;
  }

  /**
   * Get the app name
   */
  getAppName(): string {
    return this.appName;
  }
}
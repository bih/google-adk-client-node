import { ADKClientBase } from '../base';
import { SessionResource } from './session';
import { buildURLWithParams, handleResponse } from '../utils';
import { Session, Event } from '../types';

export class UserResource {
  constructor(
    private client: ADKClientBase,
    private appName: string,
    private userId: string
  ) {}

  /**
   * Get session resource for a specific session
   */
  session(sessionId: string): SessionResource {
    return new SessionResource(this.client, this.appName, this.userId, sessionId);
  }

  /**
   * Get sessions resource (shorthand for session)
   */
  sessions(sessionId?: string): SessionResource | SessionsResource {
    if (sessionId) {
      return this.session(sessionId);
    }
    return new SessionsResource(this.client, this.appName, this.userId);
  }

  /**
   * Get the user ID
   */
  getId(): string {
    return this.userId;
  }

  /**
   * Get the app name
   */
  getAppName(): string {
    return this.appName;
  }
}

export class SessionsResource {
  constructor(
    private client: ADKClientBase,
    private appName: string,
    private userId: string
  ) {}

  /**
   * List all sessions for this user
   */
  async list(): Promise<Session[]> {
    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/users/{user_id}/sessions',
      { 
        app_name: this.appName,
        user_id: this.userId
      }
    );
    
    const response = await this.client.fetch(path, 'GET');
    return handleResponse(response);
  }

  /**
   * Create a new session
   */
  async create(data?: {
    state?: Record<string, any>;
    events?: Event[];
  }): Promise<Session> {
    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/users/{user_id}/sessions',
      { 
        app_name: this.appName,
        user_id: this.userId
      }
    );
    
    const response = await this.client.fetch(path, 'POST', data);
    return handleResponse(response);
  }

  /**
   * Get a specific session
   */
  get(sessionId: string): SessionResource {
    return new SessionResource(this.client, this.appName, this.userId, sessionId);
  }
} 
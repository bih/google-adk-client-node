import { ADKClientBase } from '../base';
import { UserResource } from './user';
import { EvalSetResource } from './evalset';
import { buildURLWithParams, handleResponse } from '../utils';
import { EvalSetResult } from '../types';

export class AppResource {
  constructor(
    private client: ADKClientBase,
    private appName: string
  ) {}

  /**
   * Get user resource for a specific user
   */
  user(userId: string): UserResource {
    return new UserResource(this.client, this.appName, userId);
  }

  /**
   * Get users resource (shorthand for user)
   */
  users(userId: string): UserResource {
    return this.user(userId);
  }

  /**
   * Get eval sets resource
   */
  evalSets(): EvalSetResource {
    return new EvalSetResource(this.client, this.appName);
  }

  /**
   * Get eval set resource for a specific eval set
   */
  evalSet(evalSetId: string): EvalSetResource {
    return new EvalSetResource(this.client, this.appName, evalSetId);
  }

  /**
   * List all eval results for this app
   */
  async listEvalResults(): Promise<string[]> {
    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/eval_results',
      { app_name: this.appName }
    );
    
    const response = await this.client.fetch(path, 'GET');
    return handleResponse(response);
  }

  /**
   * Get specific eval result
   */
  async getEvalResult(evalResultId: string): Promise<EvalSetResult> {
    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/eval_results/{eval_result_id}',
      { 
        app_name: this.appName,
        eval_result_id: evalResultId
      }
    );
    
    const response = await this.client.fetch(path, 'GET');
    return handleResponse(response);
  }

  /**
   * Get the app name
   */
  getName(): string {
    return this.appName;
  }
}
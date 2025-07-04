import { ADKClientBase } from '../base';
import { buildURLWithParams, handleResponse } from '../utils';
import { 
  EvalCase, 
  AddSessionToEvalSetRequest, 
  RunEvalRequest, 
  RunEvalResult 
} from '../types';

export class EvalSetResource {
  constructor(
    private client: ADKClientBase,
    private appName: string,
    private evalSetId?: string
  ) {}

  /**
   * List all eval sets for this app
   */
  async list(): Promise<string[]> {
    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/eval_sets',
      { app_name: this.appName }
    );
    
    const response = await this.client.fetch(path, 'GET');
    return handleResponse(response);
  }

  /**
   * Create eval set with specific ID
   */
  async create(): Promise<void> {
    if (!this.evalSetId) {
      throw new Error('Eval set ID is required to create eval set');
    }

    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/eval_sets/{eval_set_id}',
      { 
        app_name: this.appName,
        eval_set_id: this.evalSetId
      }
    );
    
    const response = await this.client.fetch(path, 'POST');
    await handleResponse(response);
  }

  /**
   * Add session to eval set
   */
  async addSession(request: AddSessionToEvalSetRequest): Promise<void> {
    if (!this.evalSetId) {
      throw new Error('Eval set ID is required to add session');
    }

    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/eval_sets/{eval_set_id}/add_session',
      { 
        app_name: this.appName,
        eval_set_id: this.evalSetId
      }
    );
    
    const response = await this.client.fetch(path, 'POST', request);
    await handleResponse(response);
  }

  /**
   * List all evals in this eval set
   */
  async listEvals(): Promise<string[]> {
    if (!this.evalSetId) {
      throw new Error('Eval set ID is required to list evals');
    }

    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/eval_sets/{eval_set_id}/evals',
      { 
        app_name: this.appName,
        eval_set_id: this.evalSetId
      }
    );
    
    const response = await this.client.fetch(path, 'GET');
    return handleResponse(response);
  }

  /**
   * Get specific eval case
   */
  async getEval(evalCaseId: string): Promise<EvalCase> {
    if (!this.evalSetId) {
      throw new Error('Eval set ID is required to get eval');
    }

    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/eval_sets/{eval_set_id}/evals/{eval_case_id}',
      { 
        app_name: this.appName,
        eval_set_id: this.evalSetId,
        eval_case_id: evalCaseId
      }
    );
    
    const response = await this.client.fetch(path, 'GET');
    return handleResponse(response);
  }

  /**
   * Update eval case
   */
  async updateEval(evalCaseId: string, evalCase: EvalCase): Promise<void> {
    if (!this.evalSetId) {
      throw new Error('Eval set ID is required to update eval');
    }

    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/eval_sets/{eval_set_id}/evals/{eval_case_id}',
      { 
        app_name: this.appName,
        eval_set_id: this.evalSetId,
        eval_case_id: evalCaseId
      }
    );
    
    const response = await this.client.fetch(path, 'PUT', evalCase);
    await handleResponse(response);
  }

  /**
   * Delete eval case
   */
  async deleteEval(evalCaseId: string): Promise<void> {
    if (!this.evalSetId) {
      throw new Error('Eval set ID is required to delete eval');
    }

    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/eval_sets/{eval_set_id}/evals/{eval_case_id}',
      { 
        app_name: this.appName,
        eval_set_id: this.evalSetId,
        eval_case_id: evalCaseId
      }
    );
    
    const response = await this.client.fetch(path, 'DELETE');
    await handleResponse(response);
  }

  /**
   * Run eval
   */
  async runEval(request: RunEvalRequest): Promise<RunEvalResult[]> {
    if (!this.evalSetId) {
      throw new Error('Eval set ID is required to run eval');
    }

    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/eval_sets/{eval_set_id}/run_eval',
      { 
        app_name: this.appName,
        eval_set_id: this.evalSetId
      }
    );
    
    const response = await this.client.fetch(path, 'POST', request);
    return handleResponse(response);
  }

  /**
   * Get eval set for a specific ID
   */
  get(evalSetId: string): EvalSetResource {
    return new EvalSetResource(this.client, this.appName, evalSetId);
  }

  /**
   * Get the eval set ID
   */
  getId(): string | undefined {
    return this.evalSetId;
  }
} 
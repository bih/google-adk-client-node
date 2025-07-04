import { ADKClientBase } from '../base';
import { buildURLWithParams, handleResponse } from '../utils';
import { Part } from '../types';

export class ArtifactResource {
  constructor(
    private client: ADKClientBase,
    private appName: string,
    private userId: string,
    private sessionId: string,
    private artifactName?: string
  ) {}

  /**
   * List all artifact names for this session
   */
  async listNames(): Promise<string[]> {
    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts',
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
   * Load artifact data
   */
  async load(version?: number): Promise<Part | null> {
    if (!this.artifactName) {
      throw new Error('Artifact name is required to load artifact');
    }

    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}',
      { 
        app_name: this.appName,
        user_id: this.userId,
        session_id: this.sessionId,
        artifact_name: this.artifactName
      }
    );
    
    const url = version !== undefined ? `${path}?version=${version}` : path;
    const response = await this.client.fetch(url, 'GET');
    return handleResponse(response);
  }

  /**
   * Load specific artifact version
   */
  async loadVersion(versionId: number): Promise<Part | null> {
    if (!this.artifactName) {
      throw new Error('Artifact name is required to load artifact version');
    }

    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}/versions/{version_id}',
      { 
        app_name: this.appName,
        user_id: this.userId,
        session_id: this.sessionId,
        artifact_name: this.artifactName,
        version_id: versionId
      }
    );
    
    const response = await this.client.fetch(path, 'GET');
    return handleResponse(response);
  }

  /**
   * List all versions for this artifact
   */
  async listVersions(): Promise<number[]> {
    if (!this.artifactName) {
      throw new Error('Artifact name is required to list versions');
    }

    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}/versions',
      { 
        app_name: this.appName,
        user_id: this.userId,
        session_id: this.sessionId,
        artifact_name: this.artifactName
      }
    );
    
    const response = await this.client.fetch(path, 'GET');
    return handleResponse(response);
  }

  /**
   * Delete artifact
   */
  async delete(): Promise<void> {
    if (!this.artifactName) {
      throw new Error('Artifact name is required to delete artifact');
    }

    const path = buildURLWithParams(
      this.client.getBaseURL(),
      '/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}',
      { 
        app_name: this.appName,
        user_id: this.userId,
        session_id: this.sessionId,
        artifact_name: this.artifactName
      }
    );
    
    const response = await this.client.fetch(path, 'DELETE');
    await handleResponse(response);
  }

  /**
   * Get artifact for a specific name
   */
  get(artifactName: string): ArtifactResource {
    return new ArtifactResource(
      this.client,
      this.appName,
      this.userId,
      this.sessionId,
      artifactName
    );
  }

  /**
   * Get the artifact name
   */
  getName(): string | undefined {
    return this.artifactName;
  }
}
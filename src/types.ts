 // Core types derived from the FastAPI schema
export interface Session {
  id: string;
  appName: string;
  userId: string;
  state: Record<string, any>;
  events: Event[];
  lastUpdateTime: number;
}

export interface Event {
  id: string;
  invocationId: string;
  author: string;
  timestamp: number;
  content?: Content;
  actions?: EventActions;
  partial?: boolean;
  turnComplete?: boolean;
  errorCode?: string;
  errorMessage?: string;
  interrupted?: boolean;
  customMetadata?: Record<string, any>;
  branch?: string;
}

export interface Content {
  parts?: Part[];
  role?: string;
}

export interface Part {
  text?: string;
  inlineData?: Blob;
  fileData?: FileData;
  functionCall?: FunctionCall;
  functionResponse?: FunctionResponse;
  executableCode?: ExecutableCode;
  codeExecutionResult?: CodeExecutionResult;
  thought?: boolean;
  thoughtSignature?: string;
  videoMetadata?: VideoMetadata;
}

export interface EventActions {
  skipSummarization?: boolean;
  stateDelta: Record<string, any>;
  artifactDelta: Record<string, number>;
  transferToAgent?: string;
  escalate?: boolean;
  requestedAuthConfigs: Record<string, AuthConfig>;
}

export interface AuthConfig {
  authScheme: SecurityScheme;
  rawAuthCredential?: AuthCredential;
  exchangedAuthCredential?: AuthCredential;
  credentialKey?: string;
}

export interface SecurityScheme {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  description?: string;
  name?: string;
  in?: 'query' | 'header' | 'cookie';
  scheme?: string;
  bearerFormat?: string;
  flows?: OAuthFlows;
  openIdConnectUrl?: string;
}

export interface AuthCredential {
  authType: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect' | 'serviceAccount';
  resourceRef?: string;
  apiKey?: string;
  http?: HttpAuth;
  serviceAccount?: ServiceAccount;
  oauth2?: OAuth2Auth;
}

export interface HttpAuth {
  scheme: string;
  credentials: HttpCredentials;
}

export interface HttpCredentials {
  username?: string;
  password?: string;
  token?: string;
}

export interface ServiceAccount {
  serviceAccountCredential?: ServiceAccountCredential;
  scopes: string[];
  useDefaultCredential?: boolean;
}

export interface ServiceAccountCredential {
  type: string;
  projectId: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientId: string;
  authUri: string;
  tokenUri: string;
  authProviderX509CertUrl: string;
  clientX509CertUrl: string;
  universeDomain: string;
}

export interface OAuth2Auth {
  clientId?: string;
  clientSecret?: string;
  authUri?: string;
  state?: string;
  redirectUri?: string;
  authResponseUri?: string;
  authCode?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  expiresIn?: number;
}

export interface OAuthFlows {
  implicit?: OAuthFlow;
  password?: OAuthFlow;
  clientCredentials?: OAuthFlow;
  authorizationCode?: OAuthFlow;
}

export interface OAuthFlow {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes?: Record<string, string>;
}

export interface FunctionCall {
  id?: string;
  name?: string;
  args?: Record<string, any>;
}

export interface FunctionResponse {
  id?: string;
  name?: string;
  response?: Record<string, any>;
  willContinue?: boolean;
  scheduling?: 'SCHEDULING_UNSPECIFIED' | 'SILENT' | 'WHEN_IDLE' | 'INTERRUPT';
}

export interface ExecutableCode {
  code?: string;
  language?: 'LANGUAGE_UNSPECIFIED' | 'PYTHON';
}

export interface CodeExecutionResult {
  outcome?: 'OUTCOME_UNSPECIFIED' | 'OUTCOME_OK' | 'OUTCOME_FAILED' | 'OUTCOME_DEADLINE_EXCEEDED';
  output?: string;
}

export interface VideoMetadata {
  fps?: number;
  startOffset?: string;
  endOffset?: string;
}

export interface Blob {
  displayName?: string;
  data?: string;
  mimeType?: string;
}

export interface FileData {
  displayName?: string;
  fileUri?: string;
  mimeType?: string;
}

// Eval-related types
export interface EvalCase {
  evalId: string;
  conversation: Invocation[];
  sessionInput?: SessionInput;
  creationTimestamp: number;
}

export interface Invocation {
  invocationId: string;
  userContent: Content;
  finalResponse?: Content;
  intermediateData?: IntermediateData;
  creationTimestamp: number;
}

export interface IntermediateData {
  toolUses: FunctionCall[];
  intermediateResponses: [string, Part[]][];
}

export interface SessionInput {
  appName: string;
  userId: string;
  state: Record<string, any>;
}

export interface EvalMetric {
  metricName: string;
  threshold: number;
}

export interface EvalMetricResult {
  metricName: string;
  threshold: number;
  score?: number;
  evalStatus: EvalStatus;
}

export enum EvalStatus {
  PASS = 1,
  FAIL = 2,
  ERROR = 3
}

export interface EvalSetResult {
  evalSetResultId: string;
  evalSetResultName?: string;
  evalSetId: string;
  evalCaseResults: EvalCaseResult[];
  creationTimestamp: number;
}

export interface EvalCaseResult {
  evalSetId: string;
  evalId: string;
  finalEvalStatus: EvalStatus;
  overallEvalMetricResults: EvalMetricResult[];
  evalMetricResultPerInvocation: EvalMetricResultPerInvocation[];
  sessionId: string;
  sessionDetails?: Session;
  userId?: string;
}

export interface EvalMetricResultPerInvocation {
  actualInvocation: Invocation;
  expectedInvocation: Invocation;
  evalMetricResults: EvalMetricResult[];
}

export interface RunEvalRequest {
  evalIds: string[];
  evalMetrics: EvalMetric[];
}

export interface RunEvalResult {
  evalSetFile: string;
  evalSetId: string;
  evalId: string;
  finalEvalStatus: EvalStatus;
  evalMetricResults: [EvalMetric, EvalMetricResult][];
  overallEvalMetricResults: EvalMetricResult[];
  evalMetricResultPerInvocation: EvalMetricResultPerInvocation[];
  userId: string;
  sessionId: string;
}

export interface AddSessionToEvalSetRequest {
  evalId: string;
  sessionId: string;
  userId: string;
}

export interface AgentRunRequest {
  appName: string;
  userId: string;
  sessionId: string;
  newMessage: Content;
  streaming?: boolean;
}

// API Error type
export interface APIError {
  detail?: {
    loc: (string | number)[];
    msg: string;
    type: string;
  }[];
}

// Configuration
export interface GoogleADKClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}
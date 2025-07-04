import { APIError } from './types';

export class GoogleADKError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'GoogleADKError';
  }
}

export function buildURL(baseURL: string, path: string): string {
  const base = baseURL.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  return `${base}/${cleanPath}`;
}

export function buildURLWithParams(
  baseURL: string,
  path: string,
  params: Record<string, string | number>
): string {
  let url = buildURL(baseURL, path);
  
  // Replace path parameters
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`{${key}}`, encodeURIComponent(value.toString()));
  });
  
  return url;
}

export async function handleResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  
  if (!response.ok) {
    let errorData: APIError | undefined;
    
    try {
      errorData = JSON.parse(text);
    } catch {
      // If parsing fails, use the raw text
    }
    
    throw new GoogleADKError(
      errorData?.detail?.[0]?.msg || text || `HTTP ${response.status}`,
      response.status,
      errorData
    );
  }
  
  if (!text) {
    return {} as T;
  }
  
  try {
    return JSON.parse(text);
  } catch {
    throw new GoogleADKError('Invalid JSON response');
  }
}

export function createFetchOptions(
  method: string,
  headers?: Record<string, string>,
  body?: any
): RequestInit {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  
  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }
  
  return options;
}
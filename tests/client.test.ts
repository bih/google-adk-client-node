import { GoogleADKClient } from '../src/client';
import { GoogleADKClientConfig } from '../src/types';

// Mock fetch globally
global.fetch = jest.fn();

describe('GoogleADKClient', () => {
  let client: GoogleADKClient;
  const mockConfig: GoogleADKClientConfig = {
    baseURL: 'https://api.example.com',
    headers: {
      'Authorization': 'Bearer test-token'
    }
  };

  beforeEach(() => {
    client = new GoogleADKClient(mockConfig);
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with config', () => {
      expect(client.getBaseURL()).toBe(mockConfig.baseURL);
      expect(client.getConfig()).toEqual(expect.objectContaining(mockConfig));
    });

    it('should set default timeout', () => {
      const config = client.getConfig();
      expect(config.timeout).toBe(30000);
    });
  });

  describe('listApps', () => {
    it('should fetch and return apps list', async () => {
      const mockApps = ['app1', 'app2', 'app3'];
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockApps))
      });

      const result = await client.listApps();
      
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/list-apps',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token'
          })
        })
      );
      expect(result).toEqual(mockApps);
    });
  });

  describe('app', () => {
    it('should return AppResource', () => {
      const appResource = client.app('test-app');
      expect(appResource).toBeDefined();
      expect(appResource.getName()).toBe('test-app');
    });
  });

  describe('debug', () => {
    it('should return DebugResource', () => {
      const debugResource = client.debug();
      expect(debugResource).toBeDefined();
    });
  });

  describe('run', () => {
    it('should return RunResource', () => {
      const runResource = client.run();
      expect(runResource).toBeDefined();
    });
  });
});
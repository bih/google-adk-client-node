import { GoogleADKClient } from '../src/client';
import { SessionResource } from '../src/resources/session';
import { GoogleADKClientConfig, Session } from '../src/types';

// Mock fetch globally
global.fetch = jest.fn();

describe('SessionResource', () => {
  let client: GoogleADKClient;
  let sessionResource: SessionResource;
  const mockConfig: GoogleADKClientConfig = {
    baseURL: 'https://api.example.com'
  };

  beforeEach(() => {
    client = new GoogleADKClient(mockConfig);
    sessionResource = client.app('test-app').user('user-123').session('session-456');
    jest.clearAllMocks();
  });

  describe('fluent API', () => {
    it('should support chaining to access session methods', () => {
      const session = client.app('test-app').user('user-123').session('session-456');

      expect(session).toBeInstanceOf(SessionResource);
      expect(session.getId()).toBe('session-456');
      expect(session.getUserId()).toBe('user-123');
      expect(session.getAppName()).toBe('test-app');
    });

    it('should support calling debugTrace() on session', async () => {
      const mockTrace = { trace: 'data' };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockTrace))
      });

      const result = await sessionResource.debugTrace();

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/debug/trace/session/session-456',
        expect.objectContaining({
          method: 'GET'
        })
      );
      expect(result).toEqual(mockTrace);
    });
  });

  describe('get', () => {
    it('should fetch session data', async () => {
      const mockSession: Session = {
        id: 'session-456',
        appName: 'test-app',
        userId: 'user-123',
        state: {},
        events: [],
        lastUpdateTime: Date.now()
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockSession))
      });

      const result = await sessionResource.get();

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/apps/test-app/users/user-123/sessions/session-456',
        expect.objectContaining({
          method: 'GET'
        })
      );
      expect(result).toEqual(mockSession);
    });
  });

  describe('artifacts', () => {
    it('should return artifact resource', () => {
      const artifactResource = sessionResource.artifacts();
      expect(artifactResource).toBeDefined();
    });

    it('should return specific artifact resource', () => {
      const artifactResource = sessionResource.artifact('test-artifact');
      expect(artifactResource).toBeDefined();
      expect(artifactResource.getName()).toBe('test-artifact');
    });
  });

  describe('create', () => {
    it('should create session with state', async () => {
      const mockSession: Session = {
        id: 'session-456',
        appName: 'test-app',
        userId: 'user-123',
        state: { key: 'value' },
        events: [],
        lastUpdateTime: Date.now()
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockSession))
      });

      const result = await sessionResource.create({ key: 'value' });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/apps/test-app/users/user-123/sessions/session-456',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ key: 'value' })
        })
      );
      expect(result).toEqual(mockSession);
    });
  });

  describe('delete', () => {
    it('should delete session', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('')
      });

      await sessionResource.delete();

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/apps/test-app/users/user-123/sessions/session-456',
        expect.objectContaining({
          method: 'DELETE'
        })
      );
    });
  });
}); 
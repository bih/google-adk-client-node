# Google ADK Client Node.js

A TypeScript/JavaScript client library for interacting with Google ADK (Agent Development Kit) APIs.

## Features

- ✅ **Full TypeScript Support** - Complete type definitions derived from the FastAPI schema
- ✅ **Fluent API Design** - Chainable methods for intuitive usage
- ✅ **Comprehensive Coverage** - All endpoints from the FastAPI schema
- ✅ **Modern Async/Await** - Promise-based API with proper error handling
- ✅ **Lightweight** - Minimal dependencies, built on fetch API
- ✅ **Well Tested** - Unit tests for core functionality

## Installation

```bash
npm install google-adk-client-node
```

## Quick Start

```typescript
import { GoogleADKClient } from 'google-adk-client-node';

const client = new GoogleADKClient({
  baseURL: 'https://your-adk-api.com',
  headers: {
    'Authorization': 'Bearer your-token'
  }
});

// List all apps
const apps = await client.listApps();

// Get a session and call debugTrace() - fluent API style
const trace = await client
  .app('my-app')
  .user('user-123')
  .session('session-456')
  .debugTrace();

// Create a new session
const session = await client
  .app('my-app')
  .user('user-123')
  .sessions()
  .create({ 
    state: { key: 'value' } 
  });
```

## API Reference

### Client Initialization

```typescript
const client = new GoogleADKClient({
  baseURL: 'https://your-api.com',
  timeout: 30000, // optional, defaults to 30s
  headers: {      // optional
    'Authorization': 'Bearer token'
  }
});
```

### Fluent API Structure

The client follows a hierarchical, fluent API design:

```typescript
client
  .app(appName)
  .user(userId)
  .session(sessionId)
  .method()
```

### Core Resources

#### Apps
```typescript
// List all apps
const apps = await client.listApps();

// Get app resource
const app = client.app('my-app');

// List eval results for an app
const results = await app.listEvalResults();

// Get specific eval result
const result = await app.getEvalResult('result-id');
```

#### Sessions
```typescript
// Get session resource
const session = client.app('my-app').user('user-123').session('session-456');

// Get session data
const sessionData = await session.get();

// Create session with ID
const newSession = await session.create({ state: { key: 'value' } });

// Delete session
await session.delete();

// Get debug trace for session
const trace = await session.debugTrace();

// Get event graph
const graph = await session.getEventGraph('event-id');
```

#### Session Collections
```typescript
// List all sessions for a user
const sessions = await client.app('my-app').user('user-123').sessions().list();

// Create new session (auto-generated ID)
const newSession = await client.app('my-app').user('user-123').sessions().create({
  state: { key: 'value' },
  events: []
});
```

#### Artifacts
```typescript
// Get artifacts resource
const artifacts = session.artifacts();

// List artifact names
const names = await artifacts.listNames();

// Get specific artifact
const artifact = session.artifact('artifact-name');

// Load artifact data
const data = await artifact.load();

// Load specific version
const versionData = await artifact.loadVersion(1);

// List versions
const versions = await artifact.listVersions();

// Delete artifact
await artifact.delete();
```

#### Eval Sets
```typescript
// Get eval sets resource
const evalSets = client.app('my-app').evalSets();

// List eval sets
const sets = await evalSets.list();

// Get specific eval set
const evalSet = client.app('my-app').evalSet('eval-set-id');

// Create eval set
await evalSet.create();

// Add session to eval set
await evalSet.addSession({
  evalId: 'eval-id',
  sessionId: 'session-id',
  userId: 'user-id'
});

// List evals in set
const evals = await evalSet.listEvals();

// Get specific eval
const evalCase = await evalSet.getEval('eval-case-id');

// Update eval
await evalSet.updateEval('eval-case-id', evalCaseData);

// Delete eval
await evalSet.deleteEval('eval-case-id');

// Run eval
const results = await evalSet.runEval({
  evalIds: ['eval-1', 'eval-2'],
  evalMetrics: [{ metricName: 'accuracy', threshold: 0.8 }]
});
```

#### Debug Operations
```typescript
// Get debug resource
const debug = client.debug();

// Get trace for event
const trace = await debug.getTrace('event-id');

// Get session trace
const sessionTrace = await debug.getSessionTrace('session-id');
```

#### Agent Runs
```typescript
// Get run resource
const run = client.run();

// Run agent
const events = await run.run({
  appName: 'my-app',
  userId: 'user-123',
  sessionId: 'session-456',
  newMessage: {
    parts: [{ text: 'Hello, agent!' }],
    role: 'user'
  }
});

// Run with streaming
const streamResult = await run.runSSE({
  appName: 'my-app',
  userId: 'user-123',
  sessionId: 'session-456',
  newMessage: {
    parts: [{ text: 'Hello, agent!' }]
  },
  streaming: true
});
```

## Error Handling

The client throws `GoogleADKError` for API errors:

```typescript
import { GoogleADKError } from 'google-adk-client-node';

try {
  const session = await client.app('my-app').user('user-123').session('invalid-id').get();
} catch (error) {
  if (error instanceof GoogleADKError) {
    console.log('API Error:', error.message);
    console.log('Status Code:', error.statusCode);
    console.log('Response:', error.response);
  }
}
```

## TypeScript Support

The library is written in TypeScript and provides comprehensive type definitions:

```typescript
import { 
  GoogleADKClient, 
  Session, 
  Event, 
  Content, 
  EvalCase,
  AgentRunRequest 
} from 'google-adk-client-node';

// All API responses are properly typed
const session: Session = await client.app('my-app').user('user-123').session('session-456').get();
const events: Event[] = session.events;
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Watch mode for development
npm run dev
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


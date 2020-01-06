export class EventModel {
  tracer: Tracer = { from: {}, to: {} } as Tracer;
}
export interface Tracer {
  from: Server;
  to: Server;
  action: string;
  spanId: string;
  parentSpanId: string;
  traceId: string;
  error: string;
  priority: string;
  timestamp: number; // microseconds
  durationMs: number;
  direction: Direction;
  metadata: Metadata;
}

export interface Server {
  nickName: string;
  host: string;
  name: string;
  version: string;
}

export interface Metadata {
  generateParentSpanId: boolean;
  isFake: boolean;
  count: number;
  clientEndBeforeServer: number;
  serverStartAfterClient: number;
  // The server can have multiple nicknames, we have to find the best name to display
}


/// 'CLIENT': 'SERVER':  'PRODUCER':  'CONSUMER': log? what the right expirations?
export enum Direction {
  RequestTwoWay, ResponseTwoWay, RequestOneWay, ResponseOneWay
}
//  to do add validation

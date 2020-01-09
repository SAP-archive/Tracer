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
  // The server can have multiple nicknames, we have to find the best name to display
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
  visit: boolean;
}


/// 'CLIENT': 'SERVER':  'PRODUCER':  'CONSUMER': log? what the right expirations?
// ActionStart can be Doing
// ActionEnd can be Reacting

/*
Logical transaction:
All the inner interactions will be in the same operation block .
comprise of start and end, when one of them is missing it will auto generate it (The line courser will be with cross ⥇ ).
Case 0 logical transaction start (striate line → )
Case 1 logical transaction end (dashed line ⇠)
*/

export enum Direction {
  LogicalTransactionStart, LogicalTransactionEnd, ActionStart, ActionEnd
}
// TODO: add validation

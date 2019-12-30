export class EventModel {
  public from: Server;
  public to: Server;
  public action: string;
  public spanId: string;
  public parentSpanId: string;
  public callId: string;
  public error: string;
  public priority: string;
  public startedAt: Date;
  public durationMs: number;
  public direction: Direction;
  public metadata: Metadata;
  constructor() {
    this.from = {} as Server;
    this.to = {} as Server;
  }
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
  startedAtMs: number;

  // The server can have multiple nicknames, we have to find the best name to display
}


// Some time we need to change the span or span id from the original format think if all the Tracer will be
// inside of additional name space like Tracer.CallID

/// 'CLIENT': 'SERVER':  'PRODUCER':  'CONSUMER': log? what the right expirations?
export enum Direction {
  RequestTwoWay, ResponseTwoWay, RequestOneWay, ResponseOneWay
}
//  to do add validation

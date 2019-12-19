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
  public metadata: metadata;
  constructor() {
    this.from = {} as Server;
    this.to = {} as Server;
  }
}


export interface Server {
  host: string;
  name: string;
  version: string;
}

export interface metadata {
  generateParentSpanId: boolean;
  isFake: boolean;
  count: number;
  clientEndBeforeServer: number;
  serverStartAfterClient: number;
  startedAtMs: number;
}

export enum Direction {
  RequestTwoWay, ResponseTwoWay, RequestOneWay, ResponseOneWay
}
//  to do add validation

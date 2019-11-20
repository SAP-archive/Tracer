export class EventModel {
  public from: Server;
  public to: Server;
  public action: string;
  public spanId: string;
  public parentSpanId: string;
  public callId: string;
  public exception: ExceptionInfo;
  public priority: string;
  public startedAt: Date;
  public durationMs: number;
  public direction: Direction;
  public mateData: MateData;
}

export interface ExceptionInfo {
  innerException: ExceptionInfo;
  message: string;
  stackTrace: string;
  type: string;
}

export interface Server {
  host: string;
  name: string;
  version: string;
}

export interface MateData {
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

import { EventModel, Direction, Metadata, Server } from './model/event-model';
import { Injectable } from '@angular/core';
interface Dictionary<T> {
  [Key: string]: T;
}

const getRequestDestination = (event: EventModel) => {
  return `${event.direction}_${event.spanId}_${event.metadata.count}`;
};

const getRequestOppositeDestination = (event: EventModel) => {
  const direction = event.direction === Direction.RequestTwoWay ? Direction.ResponseTwoWay : Direction.RequestTwoWay;
  return `${direction}_${event.spanId}_${event.metadata.count}`;
};

@Injectable({
  providedIn: 'root'
})


export class OrderManagerService {
  constructor() { }

  private DeleteUserMetadata(events: EventModel[]) {
    // ignore the user metadata
    events.forEach(element => {
      delete element['metadata'];
    });
  }
  private CreateMetadata(events: EventModel[]) {
    // ignore the user metadata
    events.forEach(x => {
      x.metadata = { startedAtMs: new Date(x.startedAt).getTime() } as Metadata;
    });
  }

  private CreateLookUp(events: EventModel[]): Dictionary<EventModel> {
    const dictionary: Dictionary<EventModel> = {};
    let count = 1;

    events = events.sort((a, b) => a.metadata.startedAtMs - b.metadata.startedAtMs);

    events.forEach(event => {
      let id: string = getRequestDestination(event);

      // support duplicate event
      if (dictionary[id]) {
        event.metadata.count = count++;
        id = getRequestDestination(event);
      }

      dictionary[id] = event;
    });

    return dictionary;
  }

  private CopyDestinationAndTarget(A: EventModel, B: EventModel) {
    switch (A.direction) {
      case Direction.RequestTwoWay:
        A.to = B.from;
        break;
      case Direction.ResponseTwoWay:
        B.to = A.from;
        break;
    }
  }

  private CreateFakeEvent(oppositeEvent: EventModel): EventModel {
    return {
      direction: oppositeEvent.direction === Direction.RequestTwoWay ? Direction.ResponseTwoWay : Direction.RequestTwoWay,
      spanId: oppositeEvent.spanId,
      parentSpanId: oppositeEvent.parentSpanId,
      from: oppositeEvent.to,
      to: oppositeEvent.from,
      action: oppositeEvent.action,
      startedAt: oppositeEvent.startedAt,
      metadata: {
        startedAtMs: oppositeEvent.metadata.startedAtMs,
        count: oppositeEvent.metadata.count,
        isFake: true,
      }
    } as EventModel;
  }


  private CreateOppositeEvent(dictionary: Dictionary<EventModel>, events: EventModel[]) {
    events.filter(x => x.direction === Direction.RequestTwoWay || x.direction === Direction.ResponseTwoWay)
      .forEach(event => {

        const oppositeEventId: string = getRequestOppositeDestination(event);
        const oppositeEvent: EventModel = dictionary[oppositeEventId];

        if (!oppositeEvent) {
          dictionary[oppositeEventId] = this.CreateFakeEvent(event);
        }
      });
  }

  CreateMetaDataAndLookUp(events: EventModel[]): Dictionary<EventModel> {
    this.DeleteUserMetadata(events);
    this.CreateMetadata(events);
    const dictionary = this.CreateLookUp(events);
    this.CreateOppositeEvent(dictionary, events);
    return dictionary;
  }

  BuildHierarchy(events: Dictionary<EventModel>): EventModel[] {
    const flowSeen: any = {};
    const ServerNameToNode: ServerNameToEvents = new ServerNameToEvents();

    const rootsCandidate: EventModel[] = Object.keys(events).map(x => events[x])
      .filter(event => event.direction === Direction.RequestTwoWay
        || event.direction === Direction.RequestOneWay
        || event.direction === Direction.ResponseOneWay);

    // add all parent flows to ordered flow so we can initiate the processing

    let output: EventModel[] = [];
    let hasMissingFlows: Boolean = true;
    const visitRoots: EventModel[] = [];
    //  More Root can be added later if not connected to the root span chain
    const roots = rootsCandidate.filter(event => !event.parentSpanId)
      .sort((a, b) => b.metadata.startedAtMs - a.metadata.startedAtMs);

    while (hasMissingFlows) {
      if (roots.length !== 0) {
        const root = roots.pop();
        visitRoots.push(root);
        const result = this.BuildRootHierarchy(root, events, flowSeen, rootsCandidate, ServerNameToNode);
        output = output.concat(result);
      } else {
        // when your log is events that not order by Hierarchy we need to do best effort to extract them
        const missingEvent = rootsCandidate.
          filter(event => !flowSeen[event.spanId] && visitRoots.findIndex(x => x === event) === -1)
          .sort((a, b) => a.metadata.startedAtMs - b.metadata.startedAtMs);
        if (missingEvent && missingEvent.length > 0) {
          roots.push(missingEvent[0]);
        } else {
          hasMissingFlows = false;
        }
      }
    }
    ServerNameToNode.EnrichMetadataServerName();
    return output;
  }

  // sort the events according to flow hierarchy
  // It also build another hierarchy that map each event to server to create single nickname for server
  private BuildRootHierarchy(root: EventModel, events: Dictionary<EventModel>,
    flowSeen: any, requestToOtherSystems: EventModel[], serverToNodes: ServerNameToEvents) {
    const output: EventModel[] = [];
    const orderedFlows: EventModel[] = [];
    orderedFlows.push(root);
    while (orderedFlows.length > 0) {
      const flow: EventModel = orderedFlows.pop();
      output.push(flow);
      serverToNodes.AddNode(flow);
      // check if this flow has a closing event
      if (flow.direction !== Direction.ResponseTwoWay) {
        const closeEventId: string = getRequestOppositeDestination(flow);
        const closeEvent = events[closeEventId];
        if (closeEvent) {
          orderedFlows.push(closeEvent);
        }
        // get all child flow
        const uniqueFlow = flow.spanId && !(flowSeen[flow.spanId]);
        if (uniqueFlow) {
          const childFlows = requestToOtherSystems.filter(event => event.parentSpanId === flow.spanId);
          if (childFlows) {
            // order is opposite of stack
            childFlows.sort((a, b) => b.metadata.startedAtMs - a.metadata.startedAtMs).forEach((child: EventModel) => {
              orderedFlows.push(child);
            });
          }
        }
        flowSeen[flow.spanId] = 1;
      }
    }

    // missing all event the not seen
    return output;
  }

}

class ServerNameToEvents {
  Lookup: Dictionary<Server[]> = {};
  public AddNode(event: EventModel) {
    if (!(event.parentSpanId || event.spanId)) { return; }

    if (event.spanId) {
      const A = this.Lookup[event.spanId] || [] as Server[];
      this.Lookup[event.spanId] = A;
      if (event.direction === Direction.RequestOneWay || event.direction === Direction.RequestTwoWay) {
        A.push(event.to);
      } else {
        A.push(event.from);
      }
    }

    if (event.parentSpanId) {
      const A = this.Lookup[event.parentSpanId] || [] as Server[];
      this.Lookup[event.parentSpanId] = A;
      if (event.direction === Direction.RequestOneWay || event.direction === Direction.RequestTwoWay) {
        A.push(event.from);
      } else {
        A.push(event.to);
      }
    }

  }
  insertToLookup(event: EventModel, span: string, isParent: boolean) {
    const A = this.Lookup[span] || [] as Server[];
    this.Lookup[span] = A;


    if (event.direction === Direction.RequestOneWay || event.direction === Direction.RequestTwoWay) {
      A.push(event.from);
      A.push(event.to);
    } else {
      if (isParent) {
        A.push(event.to);
      } // client event of parent is good for Child, but child not intrest the parent
      A.push(event.from);
    }
  }

  public EnrichMetadataServerName() {
    const nameToNickNames: Dictionary<string> = {};
    Object.keys(this.Lookup).forEach(server => {

      let nickName: string;
      this.Lookup[server].forEach(event => {
        if (!nickName && event && event.name) {
          nickName = event.name;
        }
        if (event && event.name && nameToNickNames[event.name]) {
          nickName = nameToNickNames[event.name];
        }
      });



      this.Lookup[server].forEach(event => {
        event.nickName = nickName;
        // set nickname
        if (event && event.name && nameToNickNames[event.name]) {
          nameToNickNames[event.nickName] = nickName;
        }
      });
    });
  }

}

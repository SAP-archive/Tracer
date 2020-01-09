import { EventModel, Direction, Metadata, Server, Tracer } from './model/event-model';
import { Injectable } from '@angular/core';
import { E } from '@angular/cdk/keycodes';
interface Dictionary<T> {
  [Key: string]: T;
}


const getRequestDestination = (event: EventModel) => {
  if (event.tracer.spanId) {
    return `${event.tracer.direction}_${event.tracer.spanId}_${event.tracer.metadata.count}`;
  } else { // To support broken event
    return `${event.tracer.from.name && event.tracer.from.name.toLowerCase()}->${event.tracer.to && event.tracer.to.name && event.tracer.to.name.toLowerCase()
      }:.${event.tracer.direction}_${event.tracer.spanId}_${event.tracer.metadata.count}`;
  }
};

const getRequestOppositeDestination = (event: EventModel) => {
  const direction = event.tracer.direction === Direction.LogicalTransactionStart ?
    Direction.LogicalTransactionEnd : Direction.LogicalTransactionStart;

  if (event.tracer.spanId) {
    return `${direction}_${event.tracer.spanId}_${event.tracer.metadata.count}`;
  } else { // To support broken event
    return `${event.tracer.to && event.tracer.to.name && event.tracer.to.name.toLowerCase()
      }->${event.tracer.from.name && event.tracer.from.name.toLowerCase()}:.${direction}_${event.tracer.spanId}_${event.tracer.metadata.count}`;
  }
};

@Injectable({
  providedIn: 'root'
})


export class OrderManagerService {
  constructor() { }

  private DeleteUserMetadata(events: EventModel[]) {
    // ignore the user metadata
    events.forEach(element => {
      delete element.tracer['metadata'];
      delete element.tracer.to.nickName;
      delete element.tracer.from.nickName;
      element.tracer.metadata = {} as Metadata;

    });
  }


  private CreateLookUp(events: EventModel[]): Dictionary<EventModel> {
    const dictionary: Dictionary<EventModel> = {};
    let count = 1;

    events = events.sort((a, b) => a.tracer.timestamp - b.tracer.timestamp);

    events.forEach(event => {
      let id: string = getRequestDestination(event);

      // support duplicate event
      if (dictionary[id]) {
        event.tracer.metadata.count = count++;
        id = getRequestDestination(event);
      }

      dictionary[id] = event;
    });

    return dictionary;
  }



  private CreateFakeEvent(oppositeEvent: EventModel): EventModel {
    return {
      tracer: {
        direction: oppositeEvent.tracer.direction === Direction.LogicalTransactionStart ? Direction.LogicalTransactionEnd : Direction.LogicalTransactionStart,
        spanId: oppositeEvent.tracer.spanId,
        parentSpanId: oppositeEvent.tracer.parentSpanId,
        from: oppositeEvent.tracer.to,
        to: oppositeEvent.tracer.from,
        action: oppositeEvent.tracer.action,
        timestamp: oppositeEvent.tracer.timestamp,
        metadata: {
          count: oppositeEvent.tracer.metadata.count,
          isFake: true,
        }
      } as Tracer
    } as EventModel;
  }


  private CreateOppositeEvent(dictionary: Dictionary<EventModel>, events: EventModel[]) {
    events.filter(x => x.tracer.direction === Direction.LogicalTransactionStart || x.tracer.direction === Direction.LogicalTransactionEnd)
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
    const dictionary = this.CreateLookUp(events);
    this.CreateOppositeEvent(dictionary, events);
    return dictionary;
  }

  BuildHierarchy(events: Dictionary<EventModel>): EventModel[] {
    const ServerNameToNode: ServerNameToEvents = new ServerNameToEvents();

    const rootsCandidate: EventModel[] = Object.keys(events).map(x => events[x])
      .filter(event => event.tracer.direction === Direction.LogicalTransactionStart
        || event.tracer.direction === Direction.ActionStart
        || event.tracer.direction === Direction.ActionEnd);

    // add all parent flows to ordered flow so we can initiate the processing

    let output: EventModel[] = [];
    let hasMissingFlows: Boolean = true;
    const visitRoots: EventModel[] = [];
    //  More Root can be added later if not connected to the root span chain
    const roots = rootsCandidate.filter(event => !event.tracer.parentSpanId)
      .sort((a, b) => b.tracer.timestamp - a.tracer.timestamp);

    while (hasMissingFlows) {
      if (roots.length !== 0) {
        const root = roots.pop();
        visitRoots.push(root);
        const result = this.BuildRootHierarchy(root, events, rootsCandidate, ServerNameToNode);
        output = output.concat(result);
      } else {
        // when your log is events that not order by Hierarchy we need to do best effort to extract them
        const missingEvent = rootsCandidate.
          filter(event => !event.tracer.metadata.visit && visitRoots.findIndex(x => x === event) === -1)
          .sort((a, b) => a.tracer.timestamp - b.tracer.timestamp);
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
  private BuildRootHierarchy(root: EventModel, events: Dictionary<EventModel>
    , requestToOtherSystems: EventModel[], serverToNodes: ServerNameToEvents) {
    const output: EventModel[] = [];
    const orderedFlows: EventModel[] = [];
    orderedFlows.push(root);
    while (orderedFlows.length > 0) {
      const flow: EventModel = orderedFlows.pop();
      if (flow.tracer.metadata.visit) {
        continue;
      }
      output.push(flow);
      flow.tracer.metadata.visit = true;
      serverToNodes.AddNode(flow);
      // check if this flow has a closing event
      if (flow.tracer.direction === Direction.LogicalTransactionStart) {
        const closeEventId: string = getRequestOppositeDestination(flow);
        const closeEvent = events[closeEventId];
        if (closeEvent) {
          orderedFlows.push(closeEvent);
        }
        // get all child flow
        const uniqueFlow = flow.tracer.spanId;
        if (uniqueFlow) {
          const childFlows = requestToOtherSystems.filter(event => event.tracer.parentSpanId === flow.tracer.spanId);
          if (childFlows) {
            // order is opposite of stack
            childFlows.sort((a, b) => b.tracer.timestamp - a.tracer.timestamp).forEach((child: EventModel) => {
              orderedFlows.push(child);
            });
          }
        }
      }
    }

    // missing all event the not seen
    return output;
  }

}

class ServerNameToEvents {
  Lookup: Dictionary<Server[]> = {};
  public AddNode(event: EventModel) {
    //  if (!event.tracer.from) { event.tracer.from = {} as Server }
    // if (!event.tracer.from) { event.tracer.to = {} as  Server}

    this.insertToLookup(event, event.tracer.spanId, false);
    this.insertToLookup(event, event.tracer.parentSpanId, true);


  }
  insertToLookup(event: EventModel, span: string, isParent: boolean) {
    if (!span) {
      return;
    }

    const A = this.Lookup[span + 'F'] || [] as Server[];
    const B = this.Lookup[span + 'T'] || [] as Server[];

    this.Lookup[span + 'F'] = A;
    this.Lookup[span + 'T'] = B;

    if (!isParent) {
      //  Get dic of opposite if has no parent search other direction ...
      if (event.tracer.direction === Direction.ActionStart || event.tracer.direction === Direction.LogicalTransactionStart) {
        A.push(event.tracer.from);
        B.push(event.tracer.to);
      } else {
        A.push(event.tracer.to);
        B.push(event.tracer.from);
      }
    } else {
      if (event.tracer.direction === Direction.ActionStart || event.tracer.direction === Direction.LogicalTransactionStart) {
        B.push(event.tracer.from);
      } else {
        B.push(event.tracer.to);
      }

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

      if (!nickName || nickName === 'unknown' || nickName === null) { return; }


      this.Lookup[server].forEach(event => {
        event.nickName = nickName;

        // set all nicknames
        if (event && event.name && event.name !== null && event.name !== 'unknown') {
          nameToNickNames[event.name] = nickName;
        }
      });
    });
  }

}

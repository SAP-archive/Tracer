import { Component, OnInit, ViewChild } from '@angular/core';
import { EventModel } from '../model/event-model';
import { FileEvent } from '../menu/menu.component';
import { OrderManagerService } from '../order-manager.service';
import { historyRecord } from '../history/history.component';
import { SearchService } from '../search.service';
import { appSettings } from '../app-settings/app-settings.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public CallID: string;
  public selectedCallID: string;
  public error: string;
  public note: string;
  public loading: boolean;
  public searchType = '1';
  public HistoryOpenDefaultPosition: boolean;
  public orderEvents: EventModel[] = []; // Use to create a graph at the moment only sequence diagram is supported
  public events: EventModel[] = []; // Use to display formatted event
  public rawEvents: withMetaData<any[]>; // Use for save state
  public formattedRawEvent: any[]; // Use to display raw data
  public SelectedTabIndex: number;
  public ShowAggregateSearch: boolean;

  @ViewChild('HistoryWindow', { static: true }) HistoryWindow: MatDrawer;
  @ViewChild('HistoryExpender', { static: true }) HistoryExpender: MatDrawer;

  constructor(
    private searchService: SearchService,
    private orderManagerService: OrderManagerService,
    private settings: appSettings
  ) { }

  ngOnInit(): void {
    this.SetControlInDefaultState();
    const callId = this.settings.GetCallID();
    if (callId) {
      {
        this.selectedCallID = callId;
        this.loadFromHistory(callId);
      }
    }
  }

  private SetControlInDefaultState() {
    if (this.settings.GetHistoryOpenDefaultPosition()) {
      this.HistoryWindow.open();
    } else {
      this.HistoryExpender.open();
    }
    this.SelectedTabIndex = this.settings.GetSelectedTabIndex();
    this.ShowAggregateSearch = environment.ShowAggregateSearch;
  }
  private loadFromHistory(callID: string) {
    const index = this.settings.GetHistoryRecords().findIndex(x => x.callID === callID);
    if (index >= 0) { //  exists in history
      this.note = 'Note: history record, press search to reload the data';
      this.CallID = callID;
      this.selectedCallID = callID;
      this.init(c => Promise.resolve(this.settings.GetHistoryRecords()[index].result));
    } else {
      if (environment.searchServiceUrl === 'http://YourSearchService.com/v1/Search') {
        this.error = 'Configuration required.'
          + '\n To enable search, please configure connection to the source of logs / events.'
          + '\n For more details: https://github.com/sap/Tracer#loggingtracing-source.';
        this.loading = false;
        return;
      }
      this.init(c => this.searchService.GetFlow(c, this.searchType === '1'));
    }
  }

  private async init(getFlow: (callID: string) => Promise<EventModel[]>) {

    this.loading = true;
    const currentOperation = this.CallID;
    const currentSearchType = this.searchType;
    try {
      const rawEvent = await getFlow(currentOperation);
      if (rawEvent == null) {
        if (currentOperation === this.CallID && currentSearchType === this.searchType) {
          // Optimistic locking
          this.error = 'No result found';
          this.loading = false;
          return;
        }
      }

      // Optimistic locking
      if (currentOperation === this.CallID && currentSearchType === this.searchType) {

        const remoteCall = this.orderManagerService.CreateMetaDataAndLookUp(rawEvent);
        const orderByHierarchy = this.orderManagerService.BuildHierarchy(remoteCall);
        let maxDate: Date;
        let minDate: Date;
        this.CallID = currentOperation;
        if (rawEvent && rawEvent.length > 0) {
          const times = rawEvent.map(x => x.metadata.startedAtMs);
          maxDate = new Date(Math.max.apply(Math, times));
          minDate = new Date(Math.min.apply(Math, times));
        }

        this.rawEvents = { CallID: this.CallID, value: rawEvent, startTime: minDate, endTime: maxDate };
        this.events = rawEvent;
        this.formattedRawEvent = rawEvent;
        this.orderEvents = orderByHierarchy;

      }
    } catch (error) {
      if (currentOperation === this.CallID && currentSearchType === this.searchType) {
        // Optimistic locking
        this.handleError(error);
      }
    }
    this.loading = false;
  }

  private handleError(error: Error) {
    this.error = `An error occurred: ${error.message} ${error.stack}`;
  }

  // Should disable the search for the same call Id and search type when it running
  public Search() {
    this.ClearState();

    this.loading = true;
    if (!this.selectedCallID) {
      this.error = 'CallID not define';
      this.loading = false;
      return;
    }

    if (environment.searchServiceUrl === 'http://YourSearchService.com/v1/Search') {
      this.error = 'Configuration required.'
        + '\n To enable search, please configure connection to the source of logs / events.'
        + '\n For more details: https://github.com/sap/Tracer#loggingtracing-source.';
      this.loading = false;
      return;
    }

    this.selectedCallID = this.selectedCallID.trim();
    this.CallID = this.selectedCallID;
    this.settings.SetCallID(this.CallID);

    this.CallID = this.selectedCallID;
    this.init(c => this.searchService.GetFlow(c, this.searchType === '1'));

  }

  public ClearState() {
    this.rawEvents = null;
    this.orderEvents = [];
    this.events = [];
    this.error = '';
    this.note = '';
    this.formattedRawEvent = [];
    this.events = [];
  }

  loadFormHistory(event: historyRecord) {
    this.settings.SetCallID(event.callID);

    this.selectedCallID = event.callID;

    this.ClearState();
    new Promise(res => setTimeout(res, 1)).then(x => {
      // it in promise due to a bug in memrid
      this.CallID = event.callID;

      this.init(c => Promise.resolve(event.result));
    });
  }

  openFileTrigger(fileEvent: FileEvent) {
    if (!fileEvent.content || !fileEvent.name) {
      this.error = 'file content is undefined';
      return;
    }

    this.ClearState();

    try {
      const rawEvent: EventModel[] = JSON.parse(fileEvent.content);
      if (rawEvent && rawEvent.length > 0 && rawEvent[0].callId) {
        this.CallID = rawEvent[0].callId;
        this.settings.SetCallID(rawEvent[0].callId);

        this.selectedCallID = rawEvent[0].callId;

        new Promise(res => setTimeout(res, 1)).then(x => {
          // it in promise due to a bug in memrid
          this.init(c => Promise.resolve(rawEvent));
        });
      }
    } catch (error) {
      this.error = error;
    }
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.settings.SetSelectedTabIndex(tabChangeEvent.index);

  }

  public ChangeHistoryOpenState() {
    this.HistoryExpender.toggle();
    this.HistoryWindow.toggle();
    this.settings.SetHistoryOpenDefaultPosition(!this.settings.GetHistoryOpenDefaultPosition());
    this.settings.save();
  }
}

// tslint:disable-next-line: class-name
export class withMetaData<T> {
  value: T;
  CallID: string;
  startTime: Date;
  endTime: Date;
}


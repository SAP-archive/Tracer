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
  public traceId: string;
  public selectedTraceId: string;
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
    const traceId = this.settings.GetTraceId();
    if (traceId) {
      {
        this.selectedTraceId = traceId;
        this.loadFromHistory(traceId);
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
    this.ShowAggregateSearch = environment['ShowAggregateSearch'];
  }
  private loadFromHistory(traceId: string) {
    const index = this.settings.GetHistoryRecords().findIndex(x => x.traceId === traceId);
    this.traceId = traceId;
    this.selectedTraceId = traceId;

    if (index >= 0) { //  exists in history
      this.note = 'Note: history record, press search to reload the data';

      this.init(c => Promise.resolve(this.settings.GetHistoryRecords()[index].result));
    } else {

      if (environment.tracingProvider.url.startsWith('http://YourSearchService.com/v1/Search')) {
        this.error = 'Configuration required.'
          + '\n To enable search, please configure connection to the source of logs / events.'
          + '\n For more details: https://github.com/sap/Tracer#tracing-provider.';
        this.loading = false;
        return;
      }
      this.init(c => this.searchService.GetFlow(c));
    }
  }

  private async init(getFlow: (traceId: string) => Promise<EventModel[]>) {

    this.loading = true;
    const currentOperation = this.traceId;
    const currentSearchType = this.searchType;
    try {
      const rawEvent = await getFlow(currentOperation);
      if (rawEvent == null) {
        if (currentOperation === this.traceId && currentSearchType === this.searchType) {
          // Optimistic locking
          this.error = 'No result found';
          this.loading = false;
          return;
        }
      }

      // Optimistic locking
      if (currentOperation === this.traceId && currentSearchType === this.searchType) {

        const remoteCall = this.orderManagerService.CreateMetaDataAndLookUp(rawEvent);
        const orderByHierarchy = this.orderManagerService.BuildHierarchy(remoteCall);
        let maxDate: Date;
        let minDate: Date;
        this.traceId = currentOperation;
        if (rawEvent && rawEvent.length > 0) {
          const times = rawEvent.map(x => x.tracer.timestamp > 0 ? x.tracer.timestamp / 1000 : 1);
          maxDate = new Date(Math.max.apply(Math, times));
          minDate = new Date(Math.min.apply(Math, times));
        }

        this.rawEvents = { traceId: this.traceId, value: rawEvent, startTime: minDate, endTime: maxDate };
        this.events = rawEvent;
        this.formattedRawEvent = rawEvent;
        this.orderEvents = orderByHierarchy;

      }
    } catch (error) {
      if (currentOperation === this.traceId && currentSearchType === this.searchType) {
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
    if (!this.selectedTraceId) {
      this.error = 'TraceId not define';
      this.loading = false;
      return;
    }

    if (environment.tracingProvider.url.startsWith('http://YourSearchService.com/v1/Search')) {
      this.error = 'Configuration required.'
        + '\n To enable search, please configure connection to the source of logs / events.'
        + '\n For more details: https://github.com/sap/Tracer#tracing-provider.';
      this.loading = false;
      return;
    }

    this.selectedTraceId = this.selectedTraceId.trim();
    this.traceId = this.selectedTraceId;
    this.settings.SetTraceId(this.traceId);

    this.traceId = this.selectedTraceId;
    this.init(c => this.searchService.GetFlow(c));

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
    this.settings.SetTraceId(event.traceId);

    this.selectedTraceId = event.traceId;

    this.ClearState();
    new Promise(res => setTimeout(res, 1)).then(x => {
      // it in promise due to a bug in memrid
      this.traceId = event.traceId;

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
      if (rawEvent && rawEvent.length > 0 && rawEvent[0].tracer.traceId) {
        this.traceId = rawEvent[0].tracer.traceId;
        this.settings.SetTraceId(rawEvent[0].tracer.traceId);

        this.selectedTraceId = rawEvent[0].tracer.traceId;

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

  public showAggregateSearchChange() {
    this.settings.SetSearchType(this.searchType);
  }
}

// tslint:disable-next-line: class-name
export class withMetaData<T> {
  value: T;
  traceId: string;
  startTime: Date;
  endTime: Date;
}


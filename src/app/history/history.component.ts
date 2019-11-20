import { Component, Input, EventEmitter, Output } from '@angular/core';
import { withMetaData } from '../main/main.component';
import { DatePipe } from '@angular/common';
import { appSettings } from '../app-settings/app-settings.service';
import { EventModel } from '../model/event-model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  Items: historyRecord[] = [];
  selectedItem: number;
  _rawEvents: withMetaData<any[]>;
  constructor(private datepipe: DatePipe, private setting: appSettings) {
    this.Items = setting.GetHistoryRecords();
  }
  @Output()
  loadFormHistory: EventEmitter<historyRecord> = new EventEmitter<historyRecord>();
  @Input()
  set rawEvents(rawEvents: withMetaData<any[]>) {
    this.selectedItem = null;
    this._rawEvents = rawEvents;
    if (rawEvents && rawEvents.value && rawEvents.value.length > 0) {
      if (!this.Items.find(x => x.callID === rawEvents.CallID && x.result.length === rawEvents.value.length)) {
        const item = { callID: rawEvents.CallID, result: rawEvents.value } as historyRecord;
        // const request = data.find(x => x['@type'] === 'request');
        //  if (request) {
        //item.timeSpan = this.datepipe.transform(new Date(request['@timestamp']), 'yyyy-MM-dd HH:MM');
        //   item.endPoint = request.endpoint;
        //  item.errorCode = request.errCode;
        //   item.dc = request['@datacenter'];
        //   item.env = request.runtime.env;

        //    }
        this.Items.unshift(item);

        if (this.Items.length > 300) {
          this.Items.splice(300, 1);
        }

        this.setting.SetHistoryRecords(this.Items);

      } else {
        this.selectedItem = this.Items.findIndex(x => x.callID === rawEvents.CallID);
      }

    }
  }

  load(event: historyRecord) {
    this.loadFormHistory.next(event);
  }

  delete(event: historyRecord) {
    const index = this.Items.indexOf(event);
    if (index >= 0) {
      this.Items.splice(index, 1);

      this.setting.SetHistoryRecords(this.Items);
    }
  }
  edit(event: historyRecord) {
    const name = prompt(`Please enter name for callID ${event.callID}`);

    if (name && name !== '') {
      event.name = name;
      this.setting.SetHistoryRecords(this.Items);
    }
  }
}

// tslint:disable-next-line: class-name
export class historyRecord {
  errorCode: string;
  endPoint: string;
  name: string;
  callID: string;
  result: EventModel[];
  createDate: Date;
  dc: string;
  env: string;
  timeSpan: string;
}


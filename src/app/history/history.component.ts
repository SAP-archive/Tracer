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
        const root = item.result.find(x => !x.parentSpanId);
        if (root) {
          item.startedAt = this.datepipe.transform(new Date(root.startedAt), 'yyyy-MM-dd HH:MM');
          item.action = root.action;
          item.error = root.error;

        }
        this.Items.unshift(item);

        if (this.Items.length > 300) {
          this.Items.splice(300, 1);
        }
        try {
          this.setting.SetHistoryRecords(this.Items);
        } catch (ex) {

          try {
            // try to reduce the item in history and save again
            if (this.Items.length > 100) {
              this.Items.splice(100, this.Items.length - 100);
              this.setting.SetHistoryRecords(this.Items);
            }
          } catch (error) {
            console.warn('fail to save  history', error);
          }

        }


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

  text_truncate = function (str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };


}

// tslint:disable-next-line: class-name
export class historyRecord {
  error: string;
  action: string;
  name: string;
  callID: string;
  result: EventModel[];
  createDate: Date;
  startedAt: string;
}


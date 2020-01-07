import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { withMetaData as withMetaData } from '../main/main.component';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { appSettings } from '../app-settings/app-settings.service';
import { EventModel } from '../model/event-model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  _rawEvents: withMetaData<EventModel[]>;
  linksRaw: Link[] = [];
  links: Link[];
  @Input()
  set rawEvents(rawEvents: withMetaData<EventModel[]>) {
    this._rawEvents = rawEvents;
    this.EnableSave = rawEvents && rawEvents.value && rawEvents.value.length > 0;
    this.updateLinkList();
  }
  isExpanded = false;
  @Output()
  FileOpen: EventEmitter<FileEvent> = new EventEmitter<FileEvent>();
  EnableSave = false;

  constructor(private dateFormat: DatePipe, private setting: appSettings) { }

  ngOnInit() {
    this.linksRaw = environment.links.map(x => x as Link);
  }
  saveFile() {
    if (this.EnableSave) {
      const deepClone: EventModel[] = JSON.parse(JSON.stringify(this._rawEvents.value));
      // Remove metadata
      deepClone.forEach(element => {
        delete element.tracer['metadata'];
        delete element.tracer.to.nickName;
        delete element.tracer.from.nickName;
      });

      const myObjStr: string = JSON.stringify(deepClone, null, 2);
      const blob = new Blob([myObjStr], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, this._rawEvents.traceId + '.json');
    }
  }

  openFile(event: any) {
    const input = event.target;
    if (event && event.target && event.target.files && event.target.files[0] && event.target.files[0].name) {
      const reader = new FileReader();
      // tslint:disable-next-line: no-use-before-declare
      const result = new FileEvent();
      const name = event.target.files[0].name;
      result.name = name;
      reader.onloadend = () => {
        // this 'text' is the content of the file
        const text = reader.result;
        result.content = text.toString();

        this.FileOpen.emit(result);
      };
      reader.readAsText(input.files[0]);
      input.value = '';
    }
  }

  updateLinkList() {
    if (this.linksRaw && this.linksRaw.length > 0 && this._rawEvents && this._rawEvents.traceId
      && this._rawEvents.startTime && this._rawEvents.startTime.getTime() .toString() !== 'NaN'
      && this._rawEvents.endTime && this._rawEvents.endTime.getTime().toString() !== 'NaN') {
      this.links = this.linksRaw.map(x => ({
        name: x.name, link: x.link
          .replace('{traceId}', this._rawEvents.traceId.toString())
          .replace('{startDate}', this.dateFormat.transform(this.addSecund(this._rawEvents.startTime || new Date(), -10), 'yyyy-MM-dd\'T\'HH:mm:ss'))
          .replace('{endDate}', this.dateFormat.transform(this.addSecund(this._rawEvents.endTime || new Date(), 10), 'yyyy-MM-dd\'T\'HH:mm:ss'))
      }) as Link);
    } else {
      this.links = [];
    }
  }


  addSecund(date: Date, secund: number) {
    return new Date(date.getTime() + (secund * 1000));

  }



  SaveLayout() {
    this.setting.save();
  }
  ResetLayout() {
    this.setting.clear();
  }
}
export class FileEvent {
  content: string;
  name: string;
}

export class Link {
  link: string;
  name: string;
}

export class Config {
  links: Link[];
}

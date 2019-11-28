import { Component, OnInit, Input } from '@angular/core';
import * as mermaid from 'mermaid';
import { EventModel, Direction } from '../model/event-model';
import { MatDialog } from '@angular/material/dialog';
import { SequenceDiagramDialogComponent } from '../sequence-diagram-dialog/sequence-diagram-dialog.component';
import { ScrollingVisibility } from '@angular/cdk/overlay';

interface Dictionary<T> {
  [Key: string]: T;
}
@Component({
  selector: 'app-sequence-diagram',
  templateUrl: './sequence-diagram.component.html',
  styleUrls: ['./sequence-diagram.component.css']
})
export class SequenceDiagramComponent implements OnInit {

  public _mermaidMarkdown: string[] = [];
  public ShouldShow: boolean;
  public MermaidData: string;
  _orderedEvents: EventModel[];
  @Input()
  set orderEvents(orderedEvents: EventModel[]) {
    this._mermaidMarkdown = [];
    this._orderedEvents = [];
    this.ShouldShow = false;

    if (orderedEvents && orderedEvents.length > 0) {
      this._orderedEvents = orderedEvents;
      this._mermaidMarkdown = this.convertEventsToMermaid(orderedEvents);
      this.init();
    }
  }

  convertEventsToMermaid(orderedEvents: EventModel[]): any {
    const output: string[] = ['sequenceDiagram'];
    const names: Dictionary<string> = {};
    const escape = value =>
      value ?
        value
          .replace('-', '_')
          .replace('+', '')
          .replace('>', '')
          .replace('<', '')
          .replace('+', '')
          .replace(';', '')
          .replace('\n', ' ') : 'noValue';
    const saveSameCasing = (value: string) => {


      let item = names[value.toLowerCase()];
      if (item) {
        return item;
      } else {
        item = value;
        names[value.toLowerCase()] = item;
        return item;
      }
    };
    const sorter = value => {
      if (value.length > 50) {
        value = value.substring(0, 50) + '...';
      }
      return value;
    };


    orderedEvents.forEach(event => {
      const t = event.durationMs > 1000 ? `${Math.round(event.durationMs / 1000 * 100) / 100} sec` : Math.round(event.durationMs) + ' ms';
      const time: string = !event.metaData.isFake && event.durationMs !== 0 ? ` ⌛ ${t}` : ``;

      let action = event.action;


      const from = saveSameCasing(escape(event.from.name));
      const to = saveSameCasing(escape(event.to.name));
      action = escape(action);

      let lineType = '';
      if (event.direction === Direction.RequestOneWay) {
        lineType = '->>';
      } else if (event.direction === Direction.ResponseOneWay) {
        lineType = '-->>';
      } else if (event.direction === Direction.RequestTwoWay && !event.metaData.isFake) {
        lineType = '->>+';
      } else if (event.direction === Direction.RequestTwoWay && event.metaData.isFake) {
        lineType = '-X+';
      } else if (event.direction === Direction.ResponseTwoWay && !event.metaData.isFake) {
        lineType = '-->>-';
      } else if (event.direction === Direction.ResponseTwoWay && event.metaData.isFake) {
        lineType = '--X-';
      }
      output.push(`${from}${lineType}${to}:${sorter(action)} ${time}`);

      if (event.durationMs > 500) {
        output.push(`Note over ${from},${to}: Request took ${time}`);
      }
    });

    return output;
  }
  public async init() {
    this.ShouldShow = true;
    this.MermaidData = this._mermaidMarkdown.join('\n');

    await new Promise(res => setTimeout(res, 1));

    mermaid.initialize({
      theme: 'dark',
      sequence: { actorMargin: 50, useMaxWidth: false },
      startOnLoad: true
    });
    mermaid.init();
    const actorTexts = document.querySelectorAll('.actor');
    for (let i = 0; i < actorTexts.length; i++) {

      const element = actorTexts[i];
      if (element.nodeName === 'text') {
        const text1 = element.children[0];
        text1.textContent = element.children[0].textContent.replace('_0_', ' ');

      }
    }

    const texts = document.querySelectorAll('.messageText');

    for (let i = 0; i < texts.length; i++) {
      const item = this._orderedEvents[i];
      const text = texts[i];

      (text as any).onclick = () => {
        this.dialog.open(SequenceDiagramDialogComponent, { data: item });
      };
      const line = text.parentNode.children[1] as any;
      (line).onclick = () => {
        this.dialog.open(SequenceDiagramDialogComponent, { data: item });
      };
      if ((item.error)) {
        line.style.strokeWidth = 2;
        line.style.stroke = 'red';

      }
    }

  }

  constructor(private dialog: MatDialog) { }

  ngOnInit() {

    mermaid.initialize({
      theme: 'dark',
      sequence: { actorMargin: 50, useMaxWidth: false },
      startOnLoad: false
    });

  }
}

export class Result {
  public mermaidMarkdown: string[];
  public events: EventModel[];
  public ordererFlow: EventModel[];
}

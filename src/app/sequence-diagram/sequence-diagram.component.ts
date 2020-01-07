import { Component, OnInit, Input } from '@angular/core';
import * as mermaid from 'mermaid';
import { EventModel, Direction } from '../model/event-model';
import { MatDialog } from '@angular/material/dialog';
import { SequenceDiagramDialogComponent } from '../sequence-diagram-dialog/sequence-diagram-dialog.component';
import { ScrollingVisibility, ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';

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
      const t = event.tracer.durationMs > 1000 ? `${Math.round(event.tracer.durationMs / 1000 * 100) / 100} sec` : Math.round(event.tracer.durationMs) + ' ms';
      const time: string = !event.tracer.metadata.isFake && event.tracer.durationMs && event.tracer.durationMs >= 1 ? ` ⌛ ${t}` : ``;

      let action = event.tracer.action;


      const from = saveSameCasing(escape(event.tracer.from.nickName || event.tracer.from.name));
      const to = saveSameCasing(escape(event.tracer.to.nickName || event.tracer.to.name));
      action = escape(action);

      let lineType = '';
      if (event.tracer.direction === Direction.ActionStart) {
        lineType = '->>';
      } else if (event.tracer.direction === Direction.ActionEnd) {
        lineType = '-->>';
      } else if (event.tracer.direction === Direction.LogicalTransactionStart && !event.tracer.metadata.isFake) {
        lineType = '->>+';
      } else if (event.tracer.direction === Direction.LogicalTransactionStart && event.tracer.metadata.isFake) {
        lineType = '-X+';
      } else if (event.tracer.direction === Direction.LogicalTransactionEnd && !event.tracer.metadata.isFake) {
        lineType = '-->>-';
      } else if (event.tracer.direction === Direction.LogicalTransactionEnd && event.tracer.metadata.isFake) {
        lineType = '--X-';
      }
      output.push(`${from}${lineType}${to}:${sorter(action)} ${time}`);

      if (event.tracer.durationMs > 500) {
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

      this.FixedHeader(0);
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
      if ((item.tracer.error)) {
        line.style.strokeWidth = 2;
        line.style.stroke = 'red';

      }
    }
  }

  public FixedHeader(scrollTop) {
    const hideScroll = document.getElementById('hideScroll');
    const actors = Array.from(document.getElementsByClassName('actor'));
    const scrollTopRect: number = scrollTop + 0;
    const scrollTopText: number = scrollTop + 32;
    if (!hideScroll && actors && actors.length > 0) {
      //<rect x="0" y="1995.96533203125" fill="#303030" width="15022" height="65" rx="3" ry="0"></rect>
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const firstBottomActor = actors.length / 4 * 2;
      actors[firstBottomActor].parentElement.insertBefore(rect, actors[firstBottomActor]);
      const height = (Number.parseInt(actors[0].getAttribute('height')) + 30).toString();
      const svgSize = actors[firstBottomActor].parentElement.parentElement.getAttribute('width');

      rect.setAttribute('x', '0');
      rect.setAttribute('y', scrollTopRect.toString());
      rect.setAttribute('fill', '#303030');
      rect.setAttribute('width', svgSize);
      rect.setAttribute('height', height);
      rect.setAttribute('id', 'hideScroll');
    }
    if (hideScroll) {
      hideScroll.setAttribute('y', (scrollTopRect - 20).toString());
    }

    actors.forEach(x => {
      if (x.nodeName === 'rect') {
        x.setAttribute('y', scrollTopRect.toString());
      } else {
        x.setAttribute('y', scrollTopText.toString());
      }
    });
  }

  constructor(private dialog: MatDialog, public scroll: ScrollDispatcher) { }

  ngOnInit() {

    mermaid.initialize({
      theme: 'dark',
      sequence: { actorMargin: 50, useMaxWidth: false },
      startOnLoad: false
    });
    const tabGroup = document.getElementById('tabGroup');


    this.scroll
      .scrolled(4)
      .subscribe((data: CdkScrollable) => {
        const start = tabGroup.offsetTop + 50;
        const scrollTop = data.getElementRef().nativeElement.scrollTop;
        if (start > scrollTop) {
          this.FixedHeader(0);
        } else {
          this.FixedHeader(scrollTop - start);
        }
      });
  }
}

export class Result {
  public mermaidMarkdown: string[];
  public events: EventModel[];
  public ordererFlow: EventModel[];
}

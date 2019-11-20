import { Component,  Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-expanded-dynamic-table',
  templateUrl: './expanded-dynamic-table.component.html',
  styleUrls: ['./expanded-dynamic-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})


export class ExpandedDynamicTableComponent {
  @Input()
  public set dataSource(dataSource: string[][]) {
    this._dataSource.data = dataSource || [];
  }
  @Input()
  public set columnsToDisplay(columnsToDisplay: string[]) {

    this._columnsToDisplay = columnsToDisplay || [];
  }
  @Input()
  columns;
  _dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>();
  _columnsToDisplay = [];
  expandedElement: any | null;
}


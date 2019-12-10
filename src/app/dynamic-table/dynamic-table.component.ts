import { Component,  Input } from '@angular/core';
import { Tag } from '../model/tag';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent {
  private _dataSource;
  public tags: Tag[];
  @Input()
  set dataSource(dataSource: any[]) {
    this._dataSource = dataSource;
    // Filter

  }
  @Input()
  set columns(columns: any[]) {
    // Filter
    const tags: Tag[] = [];
    for (let i = 0; i < columns.length; i++) {
      const value = this._dataSource[columns[i].header];
      if (value) {
        tags.push({ key: columns[i].header, value: value } as Tag);
      }
    }
    this.tags = tags;

  }

  displayedColumns = ['key', 'value'];
  constructor() { }



}

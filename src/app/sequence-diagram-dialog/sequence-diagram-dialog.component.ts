import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { EventModel } from '../model/event-model';
import { Tag } from '../model/tag';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
@Component({
  selector: 'app-sequence-diagram-dialog',
  templateUrl: './sequence-diagram-dialog.component.html',
  styleUrls: ['./sequence-diagram-dialog.component.css']
})
export class SequenceDiagramDialogComponent implements OnInit {
  displayedColumnsTags: string[] = ['key', 'value'];
  requestTags: MatTableDataSource<Tag>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  Notice: string;

  constructor(@Inject(MAT_DIALOG_DATA) eventModel: EventModel) {
    this.Notice = '';
    if (eventModel && eventModel.metadata && eventModel.metadata.isFake) {
      this.Notice = 'Note: This event is auto generate for the graph';
    }
    const flatObject = this.flattenObject(eventModel);
    const tags: Tag[] = Object.keys(flatObject).map(key => {
      return { key: key, value: flatObject[key] };
    }).filter(x => x.value);
    this.requestTags = new MatTableDataSource(tags);


  }
  ngOnInit() {
    this.requestTags.sort = this.sort;
    this.sort.sort(({ id: 'key', start: 'asc' }) as MatSortable);
  }
  applyFilter(filterValue: string) {
    this.requestTags.filter = filterValue.trim().toLowerCase();
  }

  // tslint:disable-next-line: member-ordering

  flattenObject(ob) {
    const toReturn = {};

    for (const i in ob) {
      if (!ob.hasOwnProperty(i)) { continue; }

      // tslint:disable-next-line: triple-equals
      if ((typeof ob[i]) == 'object' && ob[i] !== null) {
        const flatObject = this.flattenObject(ob[i]);
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) { continue; }

          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  }


}

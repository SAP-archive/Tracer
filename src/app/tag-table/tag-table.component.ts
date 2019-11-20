import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel, SelectionChange } from '@angular/cdk/collections';
import { environment } from 'src/environments/environment';
import { appSettings } from '../app-settings/app-settings.service';

@Component({
  selector: 'app-tag-table',
  templateUrl: './tag-table.component.html',
  styleUrls: ['./tag-table.component.css']
})
export class TagTableComponent {

  manualSelection: string[] = [];
  _dataSource: string[][] = [];
  @Input()
  set defaultField(defaultFieldToDisplay: string[]) {
    this.manualSelection = defaultFieldToDisplay ? defaultFieldToDisplay : [];
  }

  @Input()
  set dataSource(events: any[]) {

    if (events && events.length > 0) {
      this.updateTable(events);
    } else {
      this._dataSource = [];
    }
  }

  displayedColumnsSave: string[];
  displayedColumns: string[] = [];
  displayedColumns_fields: string[] = ['select', 'name'];
  dataSource_fields: MatTableDataSource<felid> = new MatTableDataSource<felid>([]);
  selection = new SelectionModel<felid>(true, []);
  columns: object[] = [];

  constructor(private settings: appSettings) {
    // this.selection.changed.subscribe(this.OnFieldChange);
    this.displayedColumnsSave = settings.GetSelectedFelids();
    this.selection.changed.subscribe(changeEvent => this.OnFieldChange(changeEvent));

  }

  OnFieldChange(changeEvent: SelectionChange<felid>) {
    let temp = this.displayedColumns;
    changeEvent.added.forEach(add => temp.push(add.name));
    changeEvent.removed.forEach(remove => temp = temp.filter(item => item !== remove.name));
    this.settings.SetSelectedFelids(temp);
    this.displayedColumnsSave = temp;
    this.displayedColumns = temp;
  }

  applyFilter(filterValue: string) {
    this.dataSource_fields.filter = filterValue.trim().toLowerCase();
  }

  updateTable(rawEvnets: any[]) {
    const flattenData = rawEvnets.map(e => this.flattenObject(e));
    const allFields = this.GetAllFields(flattenData);
    this.GenarateColumns(allFields);
    const values = this.GenarateValues(allFields, flattenData);

    this._dataSource = values;
    // tslint:disable-next-line: no-use-before-declare
    const fields = allFields.map(x => new felid(x));
    this.dataSource_fields.data = fields;


    this.displayedColumns = [];

    this.displayedColumnsSave.forEach(old => {
      const selectFelid = this.dataSource_fields.data.findIndex(x => x.name === old);
      if (selectFelid >= 0) {
        this.selection.select(this.dataSource_fields.data[selectFelid]);
      }
    });
  }

  public GetAllFields(flattenData: any[]): string[] {
    const tempFieldsContainer = [];
    flattenData.forEach(flatData => {
      Object.keys(flatData).forEach(field => tempFieldsContainer[field] = 1);
    });
    const felids = Object.keys(tempFieldsContainer);

    return felids.sort();

  }

  public GenarateValues(fields: string[], flatten: any[]) {
    const tableData: string[][] = [];
    flatten.forEach(f => {
      const row: string[] = [];
      fields.forEach(fe => {
        const value = f[fe];
        if (value) {
          row.push(value.toString());
        } else { row.push(''); }
      });
      tableData.push(row);
    });
    return tableData;
  }

  public GenarateColumns(fields: string[]) {
    const columns: object[] = [];
    fields.forEach(element => {
      let columnObj: object;
      columnObj = new function () {
        this.columnDef = element.toString();
        this.header = element.toString();
        this.cell = [];

      };
      columns.push(columnObj);
    });
    this.columns = columns;
  }

  public flattenObject(ob) {
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

// tslint:disable-next-line: class-name
export class felid {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
}

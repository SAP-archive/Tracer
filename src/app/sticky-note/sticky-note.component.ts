import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { EventModel } from '../model/event-model';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatTooltip } from '@angular/material/tooltip';
import { appSettings } from '../app-settings/app-settings.service';

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent {
  private flattenEvents: any[];
  private defaultAutoComplete: string[];
  public tags: StickyNote[];
  private notFilteredAutoComplete: string[];
  public autoComplete: string[];
  constructor(
    private settings: appSettings,
  ) {
    this.defaultAutoComplete = settings.GetStickyTags();
    this.tags = this.defaultAutoComplete.map(x => ({ key: x } as StickyNote));
  }

  @Input()
  set events(events: EventModel[]) {
    // Set default
    this.autoComplete = this.defaultAutoComplete;
    this.flattenEvents = [];
    this.cleanTagValues();

    if (events && events.length > 0) {
      this.flattenEvents = events.map(x => this.flattenObject(x));
      this.autoCompleteExtractTags();
      this.notFilteredAutoComplete = this.autoComplete;

      this.tags.forEach(tag => {
        this.addTag(tag);
      });
    }
  }

  @ViewChild('input', { static: false }) stickyInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private cleanTagValues() {
    this.tags.forEach(x => {
      x.rowValue = null;
      x.value = null;
      x.sortValue = null;
    });
  }

  private autoCompleteExtractTags() {
    const AutoCompleteTags = {};
    this.flattenEvents.forEach(event => {
      const keys = Object.keys(event);
      keys.forEach(field => {
        if (event[field]) { AutoCompleteTags[field] = 1; }
      }
      );
    });
    this.autoComplete = Object.keys(AutoCompleteTags);
  }

  // TODO: all tag should use regex search or some settings, indention when regex not valid
  public GetTagToSearch(tag: StickyNote) {
    return this.notFilteredAutoComplete.filter(x => {
      try {

          const regexp = new RegExp(tag.key);
          return regexp.test(x);

      } catch (error) {
      }

      return x === tag.key;
    });
  }

  public addTag(tag: StickyNote) {
    const tags = this.GetTagToSearch(tag);

    tags.forEach(tagCandidate => {
      this.flattenEvents.forEach(event => {
        const field = event[tagCandidate];
        if (field) {
          if (tag.value) {
            // Compare to hashTable inside hashTable
            tag.rowValue.push(field);
            tag.rowValue = Array.from(new Set(tag.rowValue.map((item: any) => item)));
            tag.value = tag.rowValue.join(',');
            tag.sortValue = this.text_truncate(tag.value, 70, '...');
          } else {
            tag.value = field;
            tag.sortValue = this.text_truncate(tag.value, 70, '...');
            tag.rowValue = [field];
          }
        }
      });
    });
  }

  public selectAutoCompleteValue(event: MatAutocompleteSelectedEvent): void {
    this.stickyInput.nativeElement.value = event.option.value;
  }

  public addChip(event: MatChipInputEvent): void {

    if (this.matAutocomplete.isOpen === false) {
      const input = event.input;
      const value = event.value;
      this.innerAdd(value);

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  public OnChangeKey(search: string) {
    if (search) {
      this.autoComplete = this.notFilteredAutoComplete.filter(x => x.includes(search));
    } else {
      this.autoComplete = this.notFilteredAutoComplete;
    }
  }

  private innerAdd(value: string) {
    // Add
    const addItem = value.trim();

    if (addItem) {
      const item = { key: addItem } as StickyNote;
      this.addTag(item);
      this.tags.push(item);
      this.settings.SetStickyTags(this.tags.map(x => x.key));
    }
  }

  public remove(tag: StickyNote): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.settings.SetStickyTags( this.tags.map(x => x.key));
    }
  }

  private flattenObject(ob) {
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

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
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

  // tslint:disable-next-line: member-ordering
  @ViewChild('tp', { static: false }) _matTooltip: MatTooltip;
}

class StickyNote {
  key: string;
  value: string;
  sortValue: string;
  rowValue: string[];
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { historyRecord } from '../history/history.component';
import { HistoryExample } from './history-example';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class appSettings {

  private HistoryRecords: historyRecord[];
  private DefaultSettings: Settings;
  private UrlSettings: Settings;

  constructor(private location: Location) {

    const settings = localStorage.getItem('settings');
    const localSetting = window.location.hash.slice(2);

    try {
      this.DefaultSettings = JSON.parse(settings);
    } catch { }
    finally {
      if (!this.DefaultSettings) {
        this.DefaultSettings = {} as Settings;
      }
    }

    try {
      const decodeSettings = decodeURI(localSetting);
      this.UrlSettings = JSON.parse(decodeSettings);
    } catch { }
    finally {
      if (!this.UrlSettings) {
        this.UrlSettings = {} as Settings;
      }
    }

  }

  public save() {
    localStorage.setItem('settings', JSON.stringify(this.DefaultSettings));
  }

  public saveLocal() {
    this.location.replaceState('/' + JSON.stringify(this.UrlSettings));
  }

  public clear() {
    localStorage.removeItem('settings');
    this.location.replaceState('');

    window.location.reload();

    //  Reload the page
  }

  public GetHistoryRecords(): historyRecord[] {
    if (!this.HistoryRecords) {

      const history = localStorage.getItem('historyRecords');
      try {
        this.HistoryRecords = JSON.parse(history);
      } catch (error) {

      }
      if (!this.HistoryRecords) {
        this.HistoryRecords = JSON.parse(JSON.stringify(new HistoryExample().historyRecord));
      }
    }
    return this.HistoryRecords;
  }

  public SetHistoryRecords(historyRecords: historyRecord[]) {
    this.HistoryRecords = historyRecords;
    localStorage.setItem('historyRecords', JSON.stringify(this.HistoryRecords));
  }

  public GetStickyTags() {
    return this.UrlSettings.StickyTags || this.DefaultSettings.StickyTags || environment.defaultStickyTags;
  }

  public SetStickyTags(stickyTags: string[]) {
    this.UrlSettings.StickyTags = stickyTags;
    this.DefaultSettings.StickyTags = stickyTags;
    this.saveLocal();
  }

  public GetHistoryOpenDefaultPosition() {
    return this.UrlSettings.HistoryOpenDefaultPosition || this.DefaultSettings.HistoryOpenDefaultPosition || true;
  }

  public SetHistoryOpenDefaultPosition(historyOpenDefaultPosition: boolean) {
    this.UrlSettings.HistoryOpenDefaultPosition = historyOpenDefaultPosition;
    this.DefaultSettings.HistoryOpenDefaultPosition = historyOpenDefaultPosition;
    this.saveLocal();
  }

  public GetSelectedTabIndex() {
    return this.UrlSettings.SelectedTabIndex || this.DefaultSettings.SelectedTabIndex || 0;
  }

  public SetSelectedTabIndex(selectedTabIndex: number) {
    this.UrlSettings.SelectedTabIndex = selectedTabIndex;
    this.DefaultSettings.SelectedTabIndex = selectedTabIndex;
    this.saveLocal();
  }

  public GetSelectedFelids() {
    return this.UrlSettings.SelectedFelids || this.DefaultSettings.SelectedFelids || ['callId', 'action', 'from.name', 'to.name'];
  }

  public SetSelectedFelids(selectedFelids: string[]) {
    this.UrlSettings.SelectedFelids = selectedFelids;
    this.DefaultSettings.SelectedFelids = selectedFelids;
    this.saveLocal();
  }

  public GetCallID(): string {
    return this.UrlSettings.CallID;
  }

  public SetCallID(callID: string) {
    this.UrlSettings.CallID = callID;
    this.saveLocal();

  }

}
export class Settings {
  StickyTags: string[];
  // HistoryRecords: historyRecord[];
  HistoryOpenDefaultPosition: boolean;
  SelectedFelids: string[];
  SelectedTabIndex: number;
  CallID: string;
}

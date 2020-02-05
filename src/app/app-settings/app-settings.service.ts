import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { historyRecord } from '../history/history.component';
import { HistoryExample } from './history-example';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class appSettings {


  private HistoryRecords: historyRecord[];
  private DefaultSettings: Settings;
  private UrlSettings: Settings;

  constructor(private location: Location, private route: ActivatedRoute) {

    const settings = localStorage.getItem('settings');

    try {
      this.DefaultSettings = JSON.parse(settings);
    } catch { }
    finally {
      if (!this.DefaultSettings) {
        this.DefaultSettings = {} as Settings;
      }
    }

    try {

      this.UrlSettings = {} as Settings;

      this.route.queryParams.subscribe(params => {

        this.UrlSettings.traceId = params['traceId'];
        this.UrlSettings.SelectedTabIndex = params['SelectedTab'];

        const openHistory = params['OpenHistory'];

        if (openHistory === 'true') {
          this.UrlSettings.HistoryOpenDefaultPosition = true;
        }
        if (openHistory === 'false') {
          this.UrlSettings.HistoryOpenDefaultPosition = false;
        }

        const stickyTags: string = params['StickyTags'];
        if (stickyTags) {
          this.UrlSettings.StickyTags = stickyTags.split(',');
        }
        const SelectedFelids: string = params['SelectedFelids'];
        if (SelectedFelids) {
          this.UrlSettings.SelectedFelids = SelectedFelids.split(',');
        }


      });

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

    let query: string;
    query = this.UrlSettings.traceId ? `?traceId=${this.UrlSettings.traceId}` : ``;
    query += this.UrlSettings.HistoryOpenDefaultPosition !== undefined ? `&OpenHistory=${this.UrlSettings.HistoryOpenDefaultPosition}` : ``;
    query += this.UrlSettings.SelectedTabIndex ? `&SelectedTab=${this.UrlSettings.SelectedTabIndex}` : ``;
    query += this.UrlSettings.StickyTags ? `&StickyTags=${this.UrlSettings.StickyTags.join(`,`)}` : ``;
    query += this.UrlSettings.SelectedFelids ? `&SelectedFelids=${this.UrlSettings.SelectedFelids.join(`,`)}` : ``;

    this.location.replaceState('/' + query);
  }

  public clear() {
    localStorage.removeItem('settings');
    this.location.replaceState('');

    window.location.reload();

    //  Reload the page
  }

  public GetHistoryRecords(): historyRecord[] {
    if (!this.HistoryRecords) {

      const history = localStorage.getItem('historyRecords1');
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
    localStorage.setItem('historyRecords1', JSON.stringify(this.HistoryRecords));
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
    if (this.UrlSettings.HistoryOpenDefaultPosition !== undefined) {
      return this.UrlSettings.HistoryOpenDefaultPosition;
    }
    if (this.DefaultSettings.HistoryOpenDefaultPosition !== undefined) {
      return this.DefaultSettings.HistoryOpenDefaultPosition;
    }
    return true;
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
    return this.UrlSettings.SelectedFelids || this.DefaultSettings.SelectedFelids ||
     ['tracer.traceId', 'tracer.action', 'tracer.from.name', 'tracer.to.name'];
  }

  public SetSelectedFelids(selectedFelids: string[]) {
    this.UrlSettings.SelectedFelids = selectedFelids;
    this.DefaultSettings.SelectedFelids = selectedFelids;
    this.saveLocal();
  }

  public GetTraceId(): string {
    return this.UrlSettings.traceId;
  }

  public SetTraceId(traceId: string) {
    this.UrlSettings.traceId = traceId;
    this.saveLocal();

  }

  // tslint:disable-next-line: member-ordering
  searchType: string = `1`;
  SetSearchType(searchType: string) {
    this.searchType = searchType;
  }

  getSearchType() {
    return this.searchType;  }


}
export class Settings {
  StickyTags: string[];
  HistoryOpenDefaultPosition: boolean;
  SelectedFelids: string[];
  SelectedTabIndex: number;
  traceId: string;
}

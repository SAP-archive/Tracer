import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedDynamicTableComponent } from './expanded-dynamic-table.component';

describe('ExpandedDynamicTableComponent', () => {
  let component: ExpandedDynamicTableComponent;
  let fixture: ComponentFixture<ExpandedDynamicTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedDynamicTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedDynamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

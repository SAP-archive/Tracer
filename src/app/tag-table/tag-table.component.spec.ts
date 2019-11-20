import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagTableComponent } from './tag-table.component';

describe('TagTableComponent', () => {
  let component: TagTableComponent;
  let fixture: ComponentFixture<TagTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

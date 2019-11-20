import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyNoteComponent } from './sticky-note.component';

describe('StickyNoteComponent', () => {
  let component: StickyNoteComponent;
  let fixture: ComponentFixture<StickyNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickyNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceDiagramDialogComponent } from './sequence-diagram-dialog.component';

describe('SequenceDiagramDialogComponent', () => {
  let component: SequenceDiagramDialogComponent;
  let fixture: ComponentFixture<SequenceDiagramDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceDiagramDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceDiagramDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

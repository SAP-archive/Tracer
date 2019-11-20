import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceDiagramComponent } from './sequence-diagram.component';

describe('SequenceDiagramComponent', () => {
  let component: SequenceDiagramComponent;
  let fixture: ComponentFixture<SequenceDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

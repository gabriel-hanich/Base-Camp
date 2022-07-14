import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteWidgetComponent } from './note-widget.component';

describe('NoteWidgetComponent', () => {
  let component: NoteWidgetComponent;
  let fixture: ComponentFixture<NoteWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

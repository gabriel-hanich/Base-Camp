import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesInputComponent } from './notes-input.component';

describe('NotesInputComponent', () => {
  let component: NotesInputComponent;
  let fixture: ComponentFixture<NotesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

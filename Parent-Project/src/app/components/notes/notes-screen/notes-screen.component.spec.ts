import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesScreenComponent } from './notes-screen.component';

describe('NotesScreenComponent', () => {
  let component: NotesScreenComponent;
  let fixture: ComponentFixture<NotesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

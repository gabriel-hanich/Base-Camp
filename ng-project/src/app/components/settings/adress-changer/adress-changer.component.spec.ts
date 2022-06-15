import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressChangerComponent } from './adress-changer.component';

describe('AdressChangerComponent', () => {
  let component: AdressChangerComponent;
  let fixture: ComponentFixture<AdressChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressChangerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

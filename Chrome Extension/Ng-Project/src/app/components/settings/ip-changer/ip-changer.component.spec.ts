import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpChangerComponent } from './ip-changer.component';

describe('IpChangerComponent', () => {
  let component: IpChangerComponent;
  let fixture: ComponentFixture<IpChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpChangerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

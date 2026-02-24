import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafariBooking } from './safari-booking';

describe('SafariBooking', () => {
  let component: SafariBooking;
  let fixture: ComponentFixture<SafariBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafariBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafariBooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

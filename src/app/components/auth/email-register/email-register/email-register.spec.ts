import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRegister } from './email-register';

describe('EmailRegister', () => {
  let component: EmailRegister;
  let fixture: ComponentFixture<EmailRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

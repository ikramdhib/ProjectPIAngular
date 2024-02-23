import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingMailComponent } from './sending-mail.component';

describe('SendingMailComponent', () => {
  let component: SendingMailComponent;
  let fixture: ComponentFixture<SendingMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendingMailComponent]
    });
    fixture = TestBed.createComponent(SendingMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

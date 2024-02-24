import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProfileComponent } from './service-profile.component';

describe('ServiceProfileComponent', () => {
  let component: ServiceProfileComponent;
  let fixture: ComponentFixture<ServiceProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProfileComponent]
    });
    fixture = TestBed.createComponent(ServiceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

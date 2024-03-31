import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDemandeComponent } from './update-demande.component';

describe('UpdateDemandeComponent', () => {
  let component: UpdateDemandeComponent;
  let fixture: ComponentFixture<UpdateDemandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDemandeComponent]
    });
    fixture = TestBed.createComponent(UpdateDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

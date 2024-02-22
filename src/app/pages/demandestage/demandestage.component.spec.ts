import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandestageComponent } from './demandestage.component';

describe('DemandestageComponent', () => {
  let component: DemandestageComponent;
  let fixture: ComponentFixture<DemandestageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandestageComponent]
    });
    fixture = TestBed.createComponent(DemandestageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

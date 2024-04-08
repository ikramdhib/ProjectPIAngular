import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationStageComponent } from './attestation-stage.component';

describe('AttestationStageComponent', () => {
  let component: AttestationStageComponent;
  let fixture: ComponentFixture<AttestationStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttestationStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttestationStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

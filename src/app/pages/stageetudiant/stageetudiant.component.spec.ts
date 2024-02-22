import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageetudiantComponent } from './stageetudiant.component';

describe('StageetudiantComponent', () => {
  let component: StageetudiantComponent;
  let fixture: ComponentFixture<StageetudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StageetudiantComponent]
    });
    fixture = TestBed.createComponent(StageetudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

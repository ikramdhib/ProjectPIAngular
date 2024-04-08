import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessusstageetudiantComponent } from './processusstageetudiant.component';

describe('ProcessusstageetudiantComponent', () => {
  let component: ProcessusstageetudiantComponent;
  let fixture: ComponentFixture<ProcessusstageetudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessusstageetudiantComponent]
    });
    fixture = TestBed.createComponent(ProcessusstageetudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
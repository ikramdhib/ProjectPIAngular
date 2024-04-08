import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtudiantServiceStageComponent } from './list-etudiant-service-stage.component';

describe('ListEtudiantServiceStageComponent', () => {
  let component: ListEtudiantServiceStageComponent;
  let fixture: ComponentFixture<ListEtudiantServiceStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEtudiantServiceStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEtudiantServiceStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

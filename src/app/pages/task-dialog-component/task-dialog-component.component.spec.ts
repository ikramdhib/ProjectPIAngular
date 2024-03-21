import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogComponentComponent } from './task-dialog-component.component';

describe('TaskDialogComponentComponent', () => {
  let component: TaskDialogComponentComponent;
  let fixture: ComponentFixture<TaskDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDialogComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

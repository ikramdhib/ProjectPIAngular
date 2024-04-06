import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskreasonComponent } from './taskreason.component';

describe('TaskreasonComponent', () => {
  let component: TaskreasonComponent;
  let fixture: ComponentFixture<TaskreasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskreasonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

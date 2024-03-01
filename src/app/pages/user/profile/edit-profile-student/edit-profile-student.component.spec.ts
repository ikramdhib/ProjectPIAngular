import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileStudentComponent } from './edit-profile-student.component';

describe('EditProfileStudentComponent', () => {
  let component: EditProfileStudentComponent;
  let fixture: ComponentFixture<EditProfileStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileStudentComponent]
    });
    fixture = TestBed.createComponent(EditProfileStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

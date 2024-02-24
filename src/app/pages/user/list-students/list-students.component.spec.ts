import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentsComponent } from './list-students.component';

describe('ListStudentsComponent', () => {
  let component: ListStudentsComponent;
  let fixture: ComponentFixture<ListStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListStudentsComponent]
    });
    fixture = TestBed.createComponent(ListStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

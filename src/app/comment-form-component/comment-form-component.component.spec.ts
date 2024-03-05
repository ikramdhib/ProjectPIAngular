import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFormComponentComponent } from './comment-form-component.component';

describe('CommentFormComponentComponent', () => {
  let component: CommentFormComponentComponent;
  let fixture: ComponentFixture<CommentFormComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentFormComponentComponent]
    });
    fixture = TestBed.createComponent(CommentFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

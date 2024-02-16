import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageListtComponent } from './stage-listt.component';

describe('StageListtComponent', () => {
  let component: StageListtComponent;
  let fixture: ComponentFixture<StageListtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StageListtComponent]
    });
    fixture = TestBed.createComponent(StageListtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

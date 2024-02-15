import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageListComponent } from './stage-list.component';

describe('StageListComponent', () => {
  let component: StageListComponent;
  let fixture: ComponentFixture<StageListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StageListComponent]
    });
    fixture = TestBed.createComponent(StageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupervisorComponent } from './list-supervisor.component';

describe('ListSupervisorComponent', () => {
  let component: ListSupervisorComponent;
  let fixture: ComponentFixture<ListSupervisorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSupervisorComponent]
    });
    fixture = TestBed.createComponent(ListSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

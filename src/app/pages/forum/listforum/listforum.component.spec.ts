import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListforumComponent } from './listforum.component';

describe('ListforumComponent', () => {
  let component: ListforumComponent;
  let fixture: ComponentFixture<ListforumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListforumComponent]
    });
    fixture = TestBed.createComponent(ListforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

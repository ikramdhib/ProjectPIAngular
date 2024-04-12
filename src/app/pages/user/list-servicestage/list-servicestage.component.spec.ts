import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServicestageComponent } from './list-servicestage.component';

describe('ListServicestageComponent', () => {
  let component: ListServicestageComponent;
  let fixture: ComponentFixture<ListServicestageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListServicestageComponent]
    });
    fixture = TestBed.createComponent(ListServicestageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

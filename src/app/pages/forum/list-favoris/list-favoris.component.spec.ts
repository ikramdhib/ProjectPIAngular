import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFavorisComponent } from './list-favoris.component';

describe('ListFavorisComponent', () => {
  let component: ListFavorisComponent;
  let fixture: ComponentFixture<ListFavorisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFavorisComponent]
    });
    fixture = TestBed.createComponent(ListFavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

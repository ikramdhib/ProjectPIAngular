import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeoffreencadrantComponent } from './listeoffreencadrant.component';

describe('ListeoffreencadrantComponent', () => {
  let component: ListeoffreencadrantComponent;
  let fixture: ComponentFixture<ListeoffreencadrantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeoffreencadrantComponent]
    });
    fixture = TestBed.createComponent(ListeoffreencadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

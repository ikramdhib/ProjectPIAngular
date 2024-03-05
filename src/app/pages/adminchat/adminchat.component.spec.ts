import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminchatComponent } from './adminchat.component';

describe('AdminchatComponent', () => {
  let component: AdminchatComponent;
  let fixture: ComponentFixture<AdminchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminchatComponent]
    });
    fixture = TestBed.createComponent(AdminchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

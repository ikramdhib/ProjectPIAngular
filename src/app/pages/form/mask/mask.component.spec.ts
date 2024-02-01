import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaskComponent } from './mask.component';

describe('MaskComponent', () => {
  let component: MaskComponent;
  let fixture: ComponentFixture<MaskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

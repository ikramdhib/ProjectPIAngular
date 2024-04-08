import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerernoteComponent } from './gerernote.component';

describe('GerernoteComponent', () => {
  let component: GerernoteComponent;
  let fixture: ComponentFixture<GerernoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerernoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerernoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

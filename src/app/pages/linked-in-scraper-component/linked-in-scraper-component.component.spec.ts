import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedInScraperComponentComponent } from './linked-in-scraper-component.component';

describe('LinkedInScraperComponentComponent', () => {
  let component: LinkedInScraperComponentComponent;
  let fixture: ComponentFixture<LinkedInScraperComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkedInScraperComponentComponent]
    });
    fixture = TestBed.createComponent(LinkedInScraperComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

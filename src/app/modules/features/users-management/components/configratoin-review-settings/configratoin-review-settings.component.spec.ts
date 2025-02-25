import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigratoinReviewSettingsComponent } from './configratoin-review-settings.component';

describe('ConfigratoinReviewSettingsComponent', () => {
  let component: ConfigratoinReviewSettingsComponent;
  let fixture: ComponentFixture<ConfigratoinReviewSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigratoinReviewSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigratoinReviewSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

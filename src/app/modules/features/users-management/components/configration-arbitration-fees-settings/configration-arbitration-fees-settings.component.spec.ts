import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigrationArbitrationFeesSettingsComponent } from './configration-arbitration-fees-settings.component';

describe('ConfigrationArbitrationFeesSettingsComponent', () => {
  let component: ConfigrationArbitrationFeesSettingsComponent;
  let fixture: ComponentFixture<ConfigrationArbitrationFeesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigrationArbitrationFeesSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigrationArbitrationFeesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

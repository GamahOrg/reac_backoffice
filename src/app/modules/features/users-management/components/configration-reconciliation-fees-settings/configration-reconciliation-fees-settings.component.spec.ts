import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigrationReconciliationFeesSettingsComponent } from './configration-reconciliation-fees-settings.component';

describe('ConfigrationReconciliationFeesSettingsComponent', () => {
  let component: ConfigrationReconciliationFeesSettingsComponent;
  let fixture: ComponentFixture<ConfigrationReconciliationFeesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigrationReconciliationFeesSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigrationReconciliationFeesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

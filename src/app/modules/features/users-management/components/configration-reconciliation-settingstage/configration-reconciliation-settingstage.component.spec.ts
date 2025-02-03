import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigrationReconciliationSettingstageComponent } from './configration-reconciliation-settingstage.component';

describe('ConfigrationReconciliationSettingstageComponent', () => {
  let component: ConfigrationReconciliationSettingstageComponent;
  let fixture: ComponentFixture<ConfigrationReconciliationSettingstageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigrationReconciliationSettingstageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigrationReconciliationSettingstageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

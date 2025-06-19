import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderDashbourdComponent } from './service-provider-dashbourd.component';

describe('ServiceProviderDashbourdComponent', () => {
  let component: ServiceProviderDashbourdComponent;
  let fixture: ComponentFixture<ServiceProviderDashbourdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderDashbourdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceProviderDashbourdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigrationAdminstrativeFeesComponent } from './configration-adminstrative-fees.component';

describe('ConfigrationAdminstrativeFeesComponent', () => {
  let component: ConfigrationAdminstrativeFeesComponent;
  let fixture: ComponentFixture<ConfigrationAdminstrativeFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigrationAdminstrativeFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigrationAdminstrativeFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

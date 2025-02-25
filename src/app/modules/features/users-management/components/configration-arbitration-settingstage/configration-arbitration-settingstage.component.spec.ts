import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigrationArbitrationSettingstageComponent } from './configration-arbitration-settingstage.component';

describe('ConfigrationArbitrationSettingstageComponent', () => {
  let component: ConfigrationArbitrationSettingstageComponent;
  let fixture: ComponentFixture<ConfigrationArbitrationSettingstageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigrationArbitrationSettingstageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigrationArbitrationSettingstageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

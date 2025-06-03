import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitrationDashbourdComponent } from './arbitration-dashbourd.component';

describe('ArbitrationDashbourdComponent', () => {
  let component: ArbitrationDashbourdComponent;
  let fixture: ComponentFixture<ArbitrationDashbourdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbitrationDashbourdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbitrationDashbourdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

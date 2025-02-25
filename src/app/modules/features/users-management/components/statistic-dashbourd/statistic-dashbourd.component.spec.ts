import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticDashbourdComponent } from './statistic-dashbourd.component';

describe('StatisticDashbourdComponent', () => {
  let component: StatisticDashbourdComponent;
  let fixture: ComponentFixture<StatisticDashbourdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticDashbourdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticDashbourdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

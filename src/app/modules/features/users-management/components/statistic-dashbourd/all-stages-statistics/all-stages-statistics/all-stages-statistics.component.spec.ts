import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStagesStatisticsComponent } from './all-stages-statistics.component';

describe('AllStagesStatisticsComponent', () => {
  let component: AllStagesStatisticsComponent;
  let fixture: ComponentFixture<AllStagesStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllStagesStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllStagesStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

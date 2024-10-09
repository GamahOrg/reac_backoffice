import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsArbitrationComponent } from './statistics-arbitration.component';

describe('StatisticsArbitrationComponent', () => {
  let component: StatisticsArbitrationComponent;
  let fixture: ComponentFixture<StatisticsArbitrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsArbitrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsArbitrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

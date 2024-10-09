import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsReformerComponent } from './statistics-reformer.component';

describe('StatisticsReformerComponent', () => {
  let component: StatisticsReformerComponent;
  let fixture: ComponentFixture<StatisticsReformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsReformerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsReformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

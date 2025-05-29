import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReformersReportComponent } from './reformers-report.component';

describe('ReformersReportComponent', () => {
  let component: ReformersReportComponent;
  let fixture: ComponentFixture<ReformersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReformersReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReformersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

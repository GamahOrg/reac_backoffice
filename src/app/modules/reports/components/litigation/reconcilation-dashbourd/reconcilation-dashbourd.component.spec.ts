import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconcilationDashbourdComponent } from './reconcilation-dashbourd.component';

describe('ReconcilationDashbourdComponent', () => {
  let component: ReconcilationDashbourdComponent;
  let fixture: ComponentFixture<ReconcilationDashbourdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReconcilationDashbourdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReconcilationDashbourdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

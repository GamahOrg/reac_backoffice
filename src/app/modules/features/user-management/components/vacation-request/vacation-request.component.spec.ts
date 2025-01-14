import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationRequestComponent } from './vacation-request.component';

describe('VacationRequestComponent', () => {
  let component: VacationRequestComponent;
  let fixture: ComponentFixture<VacationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacationRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

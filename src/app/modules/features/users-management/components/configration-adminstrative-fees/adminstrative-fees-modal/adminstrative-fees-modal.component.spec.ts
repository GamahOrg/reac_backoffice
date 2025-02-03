import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstrativeFeesModalComponent } from './adminstrative-fees-modal.component';

describe('AdminstrativeFeesModalComponent', () => {
  let component: AdminstrativeFeesModalComponent;
  let fixture: ComponentFixture<AdminstrativeFeesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminstrativeFeesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminstrativeFeesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationRequestsReplyComponent } from './vacation-requests-reply.component';

describe('VacationRequestsReplyComponent', () => {
  let component: VacationRequestsReplyComponent;
  let fixture: ComponentFixture<VacationRequestsReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacationRequestsReplyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacationRequestsReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

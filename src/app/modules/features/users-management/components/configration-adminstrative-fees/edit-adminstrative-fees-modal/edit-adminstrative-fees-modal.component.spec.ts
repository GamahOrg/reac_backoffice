import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminstrativeFeesModalComponent } from './edit-adminstrative-fees-modal.component';

describe('EditAdminstrativeFeesModalComponent', () => {
  let component: EditAdminstrativeFeesModalComponent;
  let fixture: ComponentFixture<EditAdminstrativeFeesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdminstrativeFeesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAdminstrativeFeesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

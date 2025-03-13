import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesStatusDashbourdComponent } from './types-status-dashbourd.component';

describe('TypesStatusDashbourdComponent', () => {
  let component: TypesStatusDashbourdComponent;
  let fixture: ComponentFixture<TypesStatusDashbourdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesStatusDashbourdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypesStatusDashbourdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

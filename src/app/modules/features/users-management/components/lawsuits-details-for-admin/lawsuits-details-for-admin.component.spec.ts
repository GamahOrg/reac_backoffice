import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitsDetailsForAdminComponent } from './lawsuits-details-for-admin.component';

describe('LawsuitsDetailsForAdminComponent', () => {
  let component: LawsuitsDetailsForAdminComponent;
  let fixture: ComponentFixture<LawsuitsDetailsForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawsuitsDetailsForAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsuitsDetailsForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

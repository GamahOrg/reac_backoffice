import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitsListForAdminComponent } from './lawsuits-list-for-admin.component';

describe('LawsuitsListForAdminComponent', () => {
  let component: LawsuitsListForAdminComponent;
  let fixture: ComponentFixture<LawsuitsListForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawsuitsListForAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsuitsListForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

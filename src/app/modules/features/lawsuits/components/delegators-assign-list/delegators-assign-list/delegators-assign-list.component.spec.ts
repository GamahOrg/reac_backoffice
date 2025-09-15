import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatorsAssignListComponent } from './delegators-assign-list.component';

describe('DelegatorsAssignListComponent', () => {
  let component: DelegatorsAssignListComponent;
  let fixture: ComponentFixture<DelegatorsAssignListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegatorsAssignListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelegatorsAssignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

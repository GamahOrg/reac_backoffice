import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatorsStopModifyListComponent } from './delegators-stop-modify-list.component';

describe('DelegatorsStopModifyListComponent', () => {
  let component: DelegatorsStopModifyListComponent;
  let fixture: ComponentFixture<DelegatorsStopModifyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegatorsStopModifyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelegatorsStopModifyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

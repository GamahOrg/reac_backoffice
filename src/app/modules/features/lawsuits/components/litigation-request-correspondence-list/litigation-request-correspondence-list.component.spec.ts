import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitigationRequestCorrespondenceListComponent } from './litigation-request-correspondence-list.component';

describe('LitigationRequestCorrespondenceListComponent', () => {
  let component: LitigationRequestCorrespondenceListComponent;
  let fixture: ComponentFixture<LitigationRequestCorrespondenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LitigationRequestCorrespondenceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LitigationRequestCorrespondenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

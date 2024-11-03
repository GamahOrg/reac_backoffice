import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitrationRequestCorrespondencesDetailsComponent } from './arbitration-request-correspondences-details.component';

describe('ArbitrationRequestCorrespondencesDetailsComponent', () => {
  let component: ArbitrationRequestCorrespondencesDetailsComponent;
  let fixture: ComponentFixture<ArbitrationRequestCorrespondencesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbitrationRequestCorrespondencesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbitrationRequestCorrespondencesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitrationRequestCorrespondencesListComponent } from './arbitration-request-correspondences-list.component';

describe('ArbitrationRequestCorrespondencesListComponent', () => {
  let component: ArbitrationRequestCorrespondencesListComponent;
  let fixture: ComponentFixture<ArbitrationRequestCorrespondencesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbitrationRequestCorrespondencesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbitrationRequestCorrespondencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

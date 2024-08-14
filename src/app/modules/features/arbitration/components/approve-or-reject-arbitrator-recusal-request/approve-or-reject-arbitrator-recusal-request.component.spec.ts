import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArbitratorRecusalRequestComponent } from './add-arbitrator-recusal-request.component';

describe('AddArbitratorRecusalRequestComponent', () => {
  let component: AddArbitratorRecusalRequestComponent;
  let fixture: ComponentFixture<AddArbitratorRecusalRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddArbitratorRecusalRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddArbitratorRecusalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitratorRecusalRequestsComponent } from './arbitrator-recusal-requests.component';

describe('ArbitratorRecusalRequestsComponent', () => {
  let component: ArbitratorRecusalRequestsComponent;
  let fixture: ComponentFixture<ArbitratorRecusalRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbitratorRecusalRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbitratorRecusalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

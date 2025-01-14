import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitratorCountDetailsComponent } from './arbitrator-count-details.component';

describe('ArbitratorCountDetailsComponent', () => {
  let component: ArbitratorCountDetailsComponent;
  let fixture: ComponentFixture<ArbitratorCountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArbitratorCountDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbitratorCountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

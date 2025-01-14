import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitratorListComponent } from './arbitrator-list.component';

describe('ArbitratorListComponent', () => {
  let component: ArbitratorListComponent;
  let fixture: ComponentFixture<ArbitratorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArbitratorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbitratorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

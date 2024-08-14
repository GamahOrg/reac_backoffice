import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitratorCountListComponent } from './arbitrator-count-list.component';

describe('ArbitratorCountListComponent', () => {
  let component: ArbitratorCountListComponent;
  let fixture: ComponentFixture<ArbitratorCountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArbitratorCountListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbitratorCountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitrationRequestComponent } from './arbitration-request.component';

describe('ArbitrationRequestComponent', () => {
  let component: ArbitrationRequestComponent;
  let fixture: ComponentFixture<ArbitrationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbitrationRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbitrationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

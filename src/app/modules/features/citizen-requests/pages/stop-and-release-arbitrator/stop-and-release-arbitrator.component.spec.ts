import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopAndReleaseArbitratorComponent } from './stop-and-release-arbitrator.component';

describe('StopAndReleaseArbitratorComponent', () => {
  let component: StopAndReleaseArbitratorComponent;
  let fixture: ComponentFixture<StopAndReleaseArbitratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopAndReleaseArbitratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopAndReleaseArbitratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

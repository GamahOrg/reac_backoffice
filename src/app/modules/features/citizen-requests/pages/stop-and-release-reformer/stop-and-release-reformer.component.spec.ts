import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopAndReleaseReformerComponent } from './stop-and-release-reformer.component';

describe('StopAndReleaseReformerComponent', () => {
  let component: StopAndReleaseReformerComponent;
  let fixture: ComponentFixture<StopAndReleaseReformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopAndReleaseReformerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopAndReleaseReformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextAndPreviusButtonsComponent } from './next-and-previus-buttons.component';

describe('NextAndPreviusButtonsComponent', () => {
  let component: NextAndPreviusButtonsComponent;
  let fixture: ComponentFixture<NextAndPreviusButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextAndPreviusButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextAndPreviusButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

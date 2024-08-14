import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReformerAssigningRequestForAllComponent } from './reformer-assigning-request-for-all.component';

describe('ReformerAssigningRequestForAllComponent', () => {
  let component: ReformerAssigningRequestForAllComponent;
  let fixture: ComponentFixture<ReformerAssigningRequestForAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReformerAssigningRequestForAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReformerAssigningRequestForAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
